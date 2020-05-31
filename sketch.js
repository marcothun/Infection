let dots = [];
let g;
let countSus, countInf, countRec;
let poulation;

function setup() {
  createCanvas(800, 800, P2D);
  g = createGraphics(800, 150, P2D);
  g.position(0, 805);
  g.background(50);
   
  population = 500;
  const duration = 1000;
  let infected = false;
  countSus = population;
  countInf = 0;
  countRec = 0;
  
  for(let i = 0; i < population; i++){
    dots[i] = new Dot(random(width), random(height), duration);
    
    if(i == population/2 && infected == false){
      dots[i].state = dots[i].states[1];
      infected = true;
      console.log("infected");
      console.log("Status Dot Nr:" + i + " " + dots[i].state);
    }
  }

}

function draw() {
  background(0);
  countSus = population;
  countInf = 0;
  countRec = 0;
  
  let boundary = new Rectangle(width / 2, height / 2, width / 2, height / 2);
  let qtree = new QuadTree(boundary, 10);
  
  for (let d of dots) {
    let point = new Point(d.pos.x, d.pos.y, d);
    qtree.insert(point);
  }
  
    
  
  
  for(let d of dots){
    let range = new Rectangle(d.pos.x, d.pos.y, 10, 10);
    //let range = new Circle(d.pos.x, d.pos.y, 50);
    let points = qtree.query(range);
    
    for(let p of points){
      d.checkDist(p.userData);
    }
    
    d.checkState();
    d.checkWall();
    d.move();
    d.show();
    
    if (d.state == d.states[0]){
      countSus--;
    }
    if (d.state == d.states[1]){ 
      countInf++;
    }
    if (d.state == d.states[2]){ 
      countRec++; 
    }
  }
  
  let gInfY = map(countInf, 0, population, g.height, 0);
  let gRecY = map(countRec, 0, population, g.height, 0);
  let gSusY = map(countSus, population, 0, g.height, 0);
  
  g.noStroke();
  g.fill(255, 0, 0);
  g.ellipse(frameCount/10, gInfY, 2, 2);
  g.fill(0, 255, 0);
  g.ellipse(frameCount/10, gRecY, 2, 2);
  g.fill(255, 255, 255);
  g.ellipse(frameCount/10, gSusY, 2, 2);
  g.show();
}