let PopulationData = [];
let years = [
    "1970 Population",
    "1980 Population",
    "1990 Population",
    "2000 Population",
    "2010 Population",
    "2015 Population",
    "2020 Population",
    "2022 Population"
];
let currentYearIndex = 0; // Index to track the current year being displayed
let nextYearIndex = 1; // The next year to transition to
let t = 0; // Time variable for animation
let topCountries = [];

let sketch2 = function(p) {
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

        // Update time for smooth transition between years
        t += 0.01; // Adjust this value for animation speed
        if (t >= 1) {
            t = 0; // Reset time for the next year transition
            currentYearIndex = nextYearIndex;
            nextYearIndex = (nextYearIndex + 1) % years.length; // Move to the next year
            processPopulationData(table); // Reprocess data for the next year
        }
    };

    function processPopulationData(table) {
        let allCountries = [];
        for (let row of table.rows) {
            let country = row.get("Country/Territory");
            let populationData = {};
            years.forEach(year => {
                populationData[year] = parseInt(row.get(year));
            });
            allCountries.push({ country, populationData });
        }

        // Sort countries by current year's population
        allCountries.sort((a, b) => b.populationData[years[currentYearIndex]] - a.populationData[years[currentYearIndex]]);
        topCountries = allCountries.slice(0, 10); // Get the top 10 countries for the current year

        // Ensure we have exactly 10 countries, adding placeholders if necessary
        while (topCountries.length < 10) {
            topCountries.push({ country: "", populationData: {} });
        }
    }

    function drawTitle(p) {
        p.fill(255);
        p.textAlign(p.CENTER, p.CENTER);
        p.textSize(24);
        p.text("Top 10 Countries by Population", p.width / 2, 40);

        // Display the current year
        p.textSize(20);
        p.text("Year: " + years[currentYearIndex].split(' ')[0], p.width / 2, 80);
    }

    function drawBarChart(p) {
        let barWidth = p.width * 0.9 / topCountries.length;
        let maxPopulation = 1.5e9;

        p.push();
        p.translate(p.width * 0.05, 0);

        // Draw bars for each country in the current top 10
        for (let i = 0; i < topCountries.length; i++) {
            let country = topCountries[i].country;
            let currentPopulation = topCountries[i].populationData[years[currentYearIndex]];
            let nextPopulation = topCountries[i].populationData[years[nextYearIndex]];

            // Interpolate between the two population values
            let interpolatedPopulation = p.lerp(currentPopulation, nextPopulation, t);

            // Map population to bar height
            let barHeight = p.map(interpolatedPopulation, 0, maxPopulation, 0, p.height * 0.8);

            // Set color based on population size
            let colorValue = p.map(interpolatedPopulation, 0, maxPopulation, 100, 255);
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
