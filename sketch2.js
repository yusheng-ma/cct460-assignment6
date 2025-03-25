let PopulationData = [];
let sketch2 = function(p) {
    let t = 0; // Time variable to control the animation
    let currentYear = 2020; // Initial year (2020)

    p.preload = function() {
        p.loadTable("dataset/world_population.csv", "csv", "header", function(table) {
            processPopulationData(table);
        });
    };

    p.setup = function() {
        let cnv2 = p.createCanvas(1000, 600);
        cnv2.parent('canvas2');
    };

    p.draw = function() {
        p.background(50);
        drawTitle(p);
        drawBarChart(p);
        
        // Update the time to animate the transition
        if (t < 1) {
            t += 0.01; // Control the speed of the animation (0.01 is the step for each frame)
        } else {
            // Reset time and switch the year once the animation is complete
            t = 0;
            currentYear = (currentYear === 2020) ? 2022 : 2020; // Toggle between 2020 and 2022
        }
    };

    function processPopulationData(table) {
        PopulationData = [];
        for (let row of table.rows) {
            let country = row.get("Country/Territory");
            let population2020 = parseInt(row.get("2020 Population"));
            let population2022 = parseInt(row.get("2022 Population"));
            PopulationData.push({ country, population2020, population2022 });
        }

        PopulationData.sort((a, b) => b.population2022 - a.population2022);
        PopulationData = PopulationData.slice(0, 10); // Top 10 countries
    }

    function drawTitle(p) {
        p.fill(255);
        p.textAlign(p.CENTER, p.CENTER);
        p.textSize(24);
        p.text("Top 10 Countries by Population", p.width / 2, 40);
        
        // Display the current year
        p.textSize(20);
        p.text("Year: " + currentYear, p.width / 2, 80);
    }

    function drawBarChart(p) {
        let barWidth = p.width * 0.9 / PopulationData.length;
        let maxPopulation = Math.max(PopulationData[0].population2020, PopulationData[0].population2022);

        p.push();
        p.translate(p.width * 0.05, 0);

        // Draw bars for each country
        for (let i = 0; i < PopulationData.length; i++) {
            let country = PopulationData[i].country;
            let population2020 = PopulationData[i].population2020;
            let population2022 = PopulationData[i].population2022;

            // Interpolate population data from 2020 to 2022 based on time variable 't'
            let population = p.lerp(population2020, population2022, t);

            // Map population to bar height
            let barHeight = p.map(population, 0, maxPopulation, 0, p.height * 0.8);

            // Set color based on population size
            let colorValue = p.map(population, 0, maxPopulation, 100, 255);
            p.fill(colorValue, 150, 255 - colorValue);
            p.rect(i * barWidth, p.height - barHeight, barWidth - 4, barHeight);
            
            // Display country name
            p.fill(255);
            p.textSize(16);
            p.textAlign(p.CENTER, p.BOTTOM);
            p.text(country, i * barWidth + barWidth / 2, p.height - barHeight - 5);
        }

        p.pop();
    }
};

new p5(sketch2);
