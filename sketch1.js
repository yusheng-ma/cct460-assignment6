let table, coords;
let img;
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
        storeCountryCoords();
    };

    p.draw = function() {
        p.background(240);
        p.image(img, 0, 0, p.width, p.height); // Draw map
        drawCountryBubbles();
    };

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
            let cca3 = table.getString(r, 'CCA3');
            let population = parseInt(table.getString(r, '2022 Population'));

            if (countryCoords[cca3]) {
                let { lat, lon } = countryCoords[cca3];

                // Map latitude and longitude to canvas coordinates
                let x = p.map(lon, -180, 180, 0, p.width); // Longitude to X axis
                let y = p.map(lat, -90, 90, p.height, 0);   // Latitude to Y axis

                // Bubble size based on population
                let radius = p.map(population, 0, 1500000000, 2, 60); // Adjust the max population

                // Draw the bubble
                p.ellipse(x, y, radius * 2, radius * 2);
            }
        }
    }
};

// Create the first sketch
new p5(sketch1);
