let table, coords;
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

let countryCoords = {}; // Dictionary to store country lat/lon

let sketch1 = function(p) {
    p.preload = function() {
        table = p.loadTable('./dataset/world_population.csv', 'csv', 'header');
        img = p.loadImage('./img/world_continent.png'); // Load map
        coords = p.loadTable('./dataset/country_coord.csv', 'csv', 'header'); // Load country coordinates
    };

    p.setup = function() {
        let cnv1 = p.createCanvas(1500, 750);
        cnv1.parent('canvas1'); // Attach to div
        p.textSize(12);
        groupByContinent();
        storeCountryCoords();
    };

    p.draw = function() {
        p.background(240);
        p.image(img, 0, 0, p.width, p.height); // Draw map
        drawVisualization();
        drawCountryBubbles();
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

    function storeCountryCoords() {
        // Store country coordinates based on CCA3 code
        for (let r = 0; r < coords.getRowCount(); r++) {
            let alpha3 = coords.getString(r, 'Alpha-3 code');
            let lat = parseFloat(coords.getString(r, 'Latitude (average)'));
            let lon = parseFloat(coords.getString(r, 'Longitude (average)'));
            countryCoords[alpha3] = { lat, lon };
        }
    }

    function drawCountryBubbles() {
        p.fill(255, 0, 0, 150);
        p.noStroke();

        // Iterate over all rows in the population table
        for (let r = 0; r < table.getRowCount(); r++) {
            let country = table.getString(r, 'Country/Territory');
            let cca3 = table.getString(r, 'CCA3');
            let population = parseInt(table.getString(r, '2022 Population'));

            if (countryCoords[cca3]) {
                let { lat, lon } = countryCoords[cca3];

                // Map latitude and longitude to canvas coordinates
                let x = p.map(lon, -180, 180, 0, p.width); // Longitude to X axis
                let y = p.map(lat, -90, 90, p.height, 0);   // Latitude to Y axis

                // Bubble size based on population
                let radius = p.map(population, 0, 1000000000, 3, 50); // Adjust the max population

                // Draw the bubble
                p.ellipse(x, y, radius * 2, radius * 2);
            }
        }
    }
};

// Create the first sketch
new p5(sketch1);
