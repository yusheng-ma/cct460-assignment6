let table; 
let img;
let continentPop = {};
let continentPositions = {
  'Asia': [1125, 300],
  'Europe': [850, 225],
  'Africa': [900, 450],
  'North America': [375, 300],
  'South America': [450, 600],
  'Oceania': [1300, 600]
};

let sketch1 = function(p) {
    p.preload = function() {
        table = p.loadTable('./dataset/world_population.csv', 'csv', 'header');
        img = p.loadImage('./img/world_continent.png'); // Load map
    };

    p.setup = function() {
        let cnv1 = p.createCanvas(1500, 750);
        cnv1.parent('canvas1'); // Attach to div
        p.textSize(12);
        groupByContinent();
    };

    p.draw = function() {
        p.background(240);
        p.image(img, 0, 0, p.width, p.height); // Draw map
        drawVisualization();
    };

    function groupByContinent() {
        continentPop = {};
        for (let r = 0; r < table.getRowCount(); r++) {
            let continent = table.getString(r, 'Continent');
            let population = parseInt(table.getString(r, '2022 Population'));

            if (!continentPop[continent]) {
                continentPop[continent] = 0;
            }
            continentPop[continent] += population;
        }
    }

    function humanReadablePop(population) {
        if (population >= 1_000_000) {
            return (population / 1_000_000).toFixed(1) + 'M'; // Million
        } else if (population >= 1_000) {
            return (population / 1_000).toFixed(1) + 'K'; // Thousand
        } else {
            return population.toLocaleString(); // Smaller populations
        }
    }

    function drawVisualization() {
        p.textAlign(p.CENTER, p.CENTER);
        let maxPop = Math.max(...Object.values(continentPop));

        for (let continent in continentPop) {
            let pop = continentPop[continent];
            let radius = p.map(pop, 0, maxPop, 10, 80);
            let [x, y] = continentPositions[continent] || [p.width / 2, p.height / 2];

            p.fill(255, 150, 0, 180);
            p.noStroke();
            p.ellipse(x, y, radius * 2, radius * 2);

            p.fill(0);
            p.textSize(14);
            let formattedPop = humanReadablePop(pop);

            p.text(continent, x, y - radius - 10);
            p.text(formattedPop, x, y);
        }
    }
};

// Create the first sketch
new p5(sketch1);
