let countries = [];
let tick = 0;
let allYears = [
    "1970 Population",
    "1980 Population",
    "1990 Population",
    "2000 Population",
    "2010 Population",
    "2015 Population",
    "2020 Population",
    "2022 Population"
];
let drawData = [];
let nextDrawData = [];
let speed = 0.01;

let sketch4 = function(p) {
    p.preload = function() {
        p.loadTable("dataset/world_population.csv", "csv", "header", function(table) {
            countries = loadPopulationData(table);
        });
    };

    p.setup = function() {
        let cnv4 = p.createCanvas(1000, 600);
        cnv4.parent('canvas4');
    };

    p.draw = function() {
        p.background(50);

        tick += speed;
        // tick 0 -> 1970
        // tick 1 -> 1980
        // tick 2 -> 1990
        // tick 3 -> 2000
        // tick 4 -> 2010
        // tick 5 -> 2015
        // tick 6 -> 2020
        // tick 7 -> 2022
        if (tick >= 7) {
            tick = 0;
        }

        prepareDrawData();
        prepareNextDrawData();

        drawTitle(p);
        drawBarChart(p);
    };

    function loadPopulationData(table) {
        let allCountries = [];
        for (let row of table.rows) {
            let country = row.get("Country/Territory");
            let populationData = {};
            allYears.forEach(year => {
                populationData[year] = parseInt(row.get(year));
            });
            allCountries.push({ country, populationData });
        }

        return allCountries;
    }

    function prepareDrawData() {
        drawData = [];

        let currentYearIndex = Math.floor(tick);
        let nextYearIndex = Math.ceil(tick) % allYears.length;
        let t = tick - Math.floor(tick);

        for (let i = 0; i < countries.length; i++) {
            let country = countries[i];
            let currentPopulation = country.populationData[allYears[currentYearIndex]];
            let nextPopulation = country.populationData[allYears[nextYearIndex]];
            let interpolatedPopulation = p.lerp(currentPopulation, nextPopulation, t);

            drawData.push({ country: country.country, population: interpolatedPopulation });
        }

        // Sort countries by current year's population
        drawData.sort((a, b) => b.population - a.population);
        drawData = drawData.slice(0, 10); // Get the top 10 countries for the current year
    }

    function prepareNextDrawData() {
        nextDrawData = [];

        let nextTick = tick + speed;
        let currentYearIndex = Math.floor(nextTick);
        let nextYearIndex = Math.ceil(nextTick) % allYears.length;
        let t = nextTick - Math.floor(nextTick);

        for (let i = 0; i < countries.length; i++) {
            let country = countries[i];
            let currentPopulation = country.populationData[allYears[currentYearIndex]];
            let nextPopulation = country.populationData[allYears[nextYearIndex]];
            let interpolatedPopulation = p.lerp(currentPopulation, nextPopulation, t);

            nextDrawData.push({ country: country.country, population: interpolatedPopulation });
        }

        // Sort countries by current year's population
        nextDrawData.sort((a, b) => b.population - a.population);
        nextDrawData = nextDrawData.slice(0, 10); // Get the top 10 countries for the current year
    }

    function drawTitle(p) {
        p.fill(255);
        p.textAlign(p.CENTER, p.CENTER);
        p.textSize(24);
        p.text("Top 10 Countries by Population", p.width / 2, 40);

        // Display the current year
        let currentYearIndex = Math.floor(tick);
        p.textSize(20);
        p.text("Year: " + years[currentYearIndex].split(' ')[0], p.width / 2, 80);
    }

    function drawBarChart(p) {
        let barWidth = p.width * 0.9 / drawData.length;
        // Find the maximum population for scaling
        let maxPopulation = drawData[0].population;

        p.push();
        p.translate(p.width * 0.05, 0);

        // Draw bars for each country in the current top 10
        for (let i = 0; i < drawData.length; i++) {
            let country = drawData[i].country;
            let currentPopulation = drawData[i].population;

            // Map population to bar height
            let barHeight = p.map(currentPopulation, 0, maxPopulation, 0, p.height * 0.8);

            // Set color based on population size
            let colorValue = p.map(currentPopulation, 0, maxPopulation, 100, 255);
            p.fill(colorValue, 150, 255 - colorValue);
            p.rect(i * barWidth, p.height - barHeight, barWidth - 4, barHeight);

            // Display country name
            p.fill(255);
            p.textSize(16);
            p.textAlign(p.CENTER, p.BOTTOM);
            p.text(country, i * barWidth + barWidth / 2, p.height - barHeight - 5);

            // Display population under the country name
            p.textAlign(p.CENTER, p.TOP);
            p.text(formatPopulation(currentPopulation), i * barWidth + barWidth / 2, p.height - barHeight + 20);
        }

        p.pop();
    }

    function formatPopulation(num) {
        if (num >= 1e9) {
            return (num / 1e9).toFixed(2) + "B";
        } else if (num >= 1e6) {
            return (num / 1e6).toFixed(2) + "M";
        } else if (num >= 1e3) {
            return (num / 1e3).toFixed(2) + "K";
        }
        return num.toString();
    }    
};

new p5(sketch4); 