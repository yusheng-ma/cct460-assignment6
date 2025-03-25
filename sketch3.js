let countryData = [];
let sketch3 = function(p) {
    p.preload = function() {
        p.loadTable("dataset/world_population.csv", "csv", "header", function(table) {
            processCountryData(table);
        });
    };

    p.setup = function() {
        let cnv3 = p.createCanvas(1000 * 1.2, 600 * 1.2); // Increased canvas width for a wider chart
        cnv3.parent('canvas3');
    };

    p.draw = function() {
        p.background(50);
        drawTitle(p);
        drawScatterPlot(p);
    };

    function processCountryData(table) {
        countryData = [];
        for (let row of table.rows) {
            let country = row.get("Country/Territory");
            let density = parseFloat(row.get("Density (per km²)"));
            let area = parseFloat(row.get("Area (km²)"));
            if (!isNaN(density) && !isNaN(area)) { // Ensure valid data
                countryData.push({ country, density, area });
            }
        }
    }

    function drawTitle(p) {
        p.fill(255);
        p.textAlign(p.CENTER, p.CENTER);
        p.textSize(24);
        p.text("Countries by Population Density vs. Area (2022)", p.width / 2, 40);
    }

    function drawScatterPlot(p) {
        let maxArea = Math.max(...countryData.map(c => c.area));
        let maxDensity = Math.max(...countryData.map(c => c.density));
        
        // Apply a logarithmic scale for area and density to compress the values
        let logMaxArea = Math.log(maxArea); // Log scale for area
        let logMaxDensity = Math.log(maxDensity); // Log scale for density
        
        p.push();
        p.translate(p.width * 0.05, p.height * 0.1); // Adjust position for better spacing
        
        let xAxisLength = p.width * 0.9; // Horizontal axis space
        let yAxisLength = p.height * 0.8; // Vertical axis space
        
        // Draw axes
        p.stroke(255);
        p.line(0, yAxisLength, xAxisLength, yAxisLength); // X-axis
        p.line(0, 0, 0, yAxisLength); // Y-axis
        
        // Label axes
        p.fill(255);
        p.textSize(16);
        p.textAlign(p.CENTER, p.CENTER);
        
        // "Area" label stays horizontal
        p.text("Area (log scale)", xAxisLength / 2, yAxisLength + 40);

        // "Population Density" label rotated
        p.push();
        p.translate(-40, yAxisLength / 2); // Adjust position for vertical text
        p.rotate(-Math.PI / 2); // Rotate 90 degrees counterclockwise
        p.text("Population Density (log scale)", -60, 20);
        p.pop();
    
        // Draw values on X-axis
        let xTicks = [1, 10, 100, 1000, 10000, 100000, 1000000, 10000000]; // Log scale ticks for area
        for (let i = 0; i < xTicks.length; i++) {
            let xPosition = p.map(Math.log(xTicks[i]), 0, logMaxArea, 0, xAxisLength);
            p.fill(255);
            p.textSize(12);
            p.text(xTicks[i], xPosition, yAxisLength + 20); // Place the label below the axis
        }
    
        // Draw values on Y-axis
        let yTicks = [1, 10, 100, 1000, 10000]; // Log scale ticks for density
        for (let i = 0; i < yTicks.length; i++) {
            let yPosition = p.map(Math.log(yTicks[i]), 0, logMaxDensity, yAxisLength, 0);
            p.push();
            p.translate(-40, yPosition); // Translate to Y-axis label position
            p.rotate(-Math.PI / 2); // Rotate 90 degrees counterclockwise
            p.fill(255);
            p.textSize(12);
            p.text(yTicks[i], 0, 0); // Place the label at the new position
            p.pop();
        }
    
        // Draw points for each country
        for (let i = 0; i < countryData.length; i++) {
            let country = countryData[i].country;
            let density = countryData[i].density;
            let area = countryData[i].area;

            // Apply log transformation to area and density
            let logArea = Math.log(area);
            let logDensity = Math.log(density);

            // Map the log-transformed area and density to fit within the canvas
            let x = p.map(logArea, 0, logMaxArea, 0, xAxisLength);
            let y = p.map(logDensity, 0, logMaxDensity, yAxisLength, 0);
    
            // Set color based on density for visual distinction
            let colorValue = p.map(density, 0, maxDensity, 100, 255);
            p.fill(colorValue, 150, 255 - colorValue);
            p.noStroke();
            p.ellipse(x, y, 10, 10); // Draw circle for each country
        
            // Display country name
            p.fill(255);
            p.textSize(12);
            p.textAlign(p.CENTER, p.BOTTOM);
            p.text(country, x, y - 5);
        }
        
        p.pop();
    }    
};

new p5(sketch3);
