let populationData = {};
let totalPopulation = 0;
let angles = [];
let continents = [];

let sketch2 = function(p) {
    p.preload = function() {
        p.loadTable("dataset/world_population.csv", "csv", "header", function(table) {
            processPopulationData(table);
        });
    };
    
    p.setup = function() {
        let cnv2 = p.createCanvas(800, 600);
        cnv2.parent('canvas2');
    };
    
    p.draw = function() {
        p.background(50);
        drawTitle(p);
        drawPieChart(p);
    };

    function processPopulationData(table) {
        for (let row of table.rows) {
            let continent = row.get("Continent");
            let population = parseInt(row.get("2022 Population"));
            if (!populationData[continent]) {
                populationData[continent] = 0;
            }
            populationData[continent] += population;
        }
        totalPopulation = Object.values(populationData).reduce((a, b) => a + b, 0);
        continents = Object.keys(populationData);
        let startAngle = 0;
        for (let continent of continents) {
            let angle = (populationData[continent] / totalPopulation) * p.TWO_PI;
            angles.push({ start: startAngle, stop: startAngle + angle, continent, percent: (populationData[continent] / totalPopulation * 100).toFixed(1) + "%" });
            startAngle += angle;
        }
    }
    
    function drawTitle(p) {
        p.fill(255);
        p.textAlign(p.CENTER, p.CENTER);
        p.textSize(24);
        p.text("2022 Population Distribution by Continent", p.width / 2, 40);
    }
    
    function drawPieChart(p) {
        p.push();
        p.translate(p.width / 2, p.height / 2);
        let radius = 200;
        let colors = ["#ff9999", "#66b3ff", "#99ff99", "#ffcc99", "#c2c2f0", "#ffb3e6"];
        
        for (let i = 0; i < angles.length; i++) {
            p.fill(colors[i % colors.length]);
            p.arc(0, 0, radius * 2, radius * 2, angles[i].start, angles[i].stop, p.PIE);
            
            let midAngle = (angles[i].start + angles[i].stop) / 2;
            let labelX = radius * 0.6 * p.cos(midAngle); // Inside for percentage
            let labelY = radius * 0.6 * p.sin(midAngle); // Inside for percentage
            
            // Set continent name radius based on continent
            let continentRadius = 1.0;
            if (angles[i].continent === "Asia" || angles[i].continent === "Africa") {
                continentRadius = 1.1;  // Asia and Africa
            } else if (angles[i].continent === "Europe" || angles[i].continent === "Oceania") {
                continentRadius = 1.15; // Europe and Oceania
            } else if (angles[i].continent === "North America") {
                continentRadius = 1.3; // North America and South America
            } else if (angles[i].continent === "South America") {
                continentRadius = 1.35; 
            }
            
            let continentX = radius * continentRadius * p.cos(midAngle); // Outside for continent name
            let continentY = radius * continentRadius * p.sin(midAngle); // Outside for continent name
            
            // Draw percentage inside the pie chart
            p.fill(255);
            p.textSize(22);
            p.textAlign(p.CENTER, p.CENTER);
            p.text(angles[i].percent, labelX, labelY);
            
            // Draw continent name outside the pie chart with custom radius
            p.textSize(22);
            p.text(angles[i].continent, continentX, continentY);
        }
        p.pop();
    }
};

new p5(sketch2);
