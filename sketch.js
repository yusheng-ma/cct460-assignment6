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

function preload() {
  table = loadTable('./dataset/world_population.csv', 'csv', 'header');
  img = loadImage('./img/world_continent.png'); // 載入地圖
}

function setup() {
  createCanvas(1500, 750);
  textSize(12);
  groupByContinent();
}

function draw() {
  background(240);
  image(img, 0, 0, width, height); // 繪製地圖
  drawVisualization();
}

function groupByContinent() {
  continentPop = {};
  for (let r = 0; r < table.getRowCount(); r++) {
    let continent = table.getString(r, 'Continent');
    let population = int(table.getString(r, '2022 Population'));

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
    return population.toLocaleString(); // Use the formatted number for smaller populations
  }
}

function drawVisualization() {
  textAlign(CENTER, CENTER);
  let maxPop = max(Object.values(continentPop));

  for (let continent in continentPop) {
    let pop = continentPop[continent];
    let radius = map(pop, 0, maxPop, 10, 80);
    let [x, y] = continentPositions[continent] || [width / 2, height / 2];

    fill(255, 150, 0, 180);
    noStroke();
    ellipse(x, y, radius * 2, radius * 2);

    fill(0);
    textSize(14);
    let formattedPop = humanReadablePop(pop); // Convert population to human-readable format
    
    // Display continent name and formatted population number
    text(continent, x, y - radius - 10);
    text(formattedPop, x, y);
  }
}

