let countryData = [];
let sketch3 = function(p) {
    p.preload = function() {
        p.loadTable("dataset/world_population.csv", "csv", "header", function(table) {
            processCountryData(table);
        });
    };

    p.setup = function() {
        let cnv3 = p.createCanvas(1000, 600); // Increased canvas width for a wider chart
        cnv3.parent('canvas3');
    };

    p.draw = function() {
        p.background(50);
        drawTitle(p);
        drawBarChart(p);
    };

    function processCountryData(table) {
        countryData = [];
        for (let row of table.rows) {
            let country = row.get("Country/Territory");
            let population = parseInt(row.get("2022 Population"));
            countryData.push({ country, population });
        }

        // Sort country data by population from highest to lowest
        countryData.sort((a, b) => b.population - a.population);

        // Get only the top 5 countries
        countryData = countryData.slice(0, 10);
    }

    function drawTitle(p) {
        p.fill(255);
        p.textAlign(p.CENTER, p.CENTER);
        p.textSize(24);
        p.text("Top 10 Countries by Population (2022)", p.width / 2, 40);
    }

    function drawBarChart(p) {
        let barWidth = p.width * 0.9 / countryData.length; // Adjusted to make bars wider
        let maxPopulation = countryData[0].population;

        p.push();
        p.translate(p.width * 0.05, 0); // Adjust the left margin for better spacing

        // Draw bars for each country
        for (let i = 0; i < countryData.length; i++) {
            let country = countryData[i].country;
            let population = countryData[i].population;

            // Use linear scale for population for bar height
            let barHeight = p.map(population, 0, maxPopulation, 0, p.height * 0.8);

            // Set color based on population size
            let colorValue = p.map(population, 0, maxPopulation, 100, 255);
            p.fill(colorValue, 150, 255 - colorValue);
            p.rect(i * barWidth, p.height - barHeight, barWidth - 4, barHeight); // Add spacing between bars
            
            // Display country name
            p.fill(255);
            p.textSize(16);
            p.textAlign(p.CENTER, p.BOTTOM);
            p.text(country, i * barWidth + barWidth / 2, p.height - barHeight - 5);
        }

        p.pop();
    }
};

new p5(sketch3);
