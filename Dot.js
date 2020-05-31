class Dot{
  constructor(x, y, d){
    this.pos = createVector(x, y);
    this.speed = createVector(random(-0.5, 0.5), random(-0.5, 0.5));
    this.color = 'rgb(255, 255, 255)';
    this.states = ['susceptible', 'infected', 'recovered'];
    this.state = this.states[0];
    this.duration = d;
    this.count = 0;
    this.dotWidth = 5;
  }
  
  checkDist(other){
    if(other && other != this){
      let distance = p5.Vector.dist(this.pos, other.pos);
      if(distance < 10){
        if(other.state == this.states[1] && 
           this.state == this.states[0] &&
           this.state != this.states[2]){
              //this.color = 'rgb(255, 0, 0)';
              this.state = this.states[1];
        }
      }
    }
  }
  
  checkState(){
    if(this.state == this.states[1]){
      if(this.count > this.duration){
        this.state = this.states[2];
      }
    }
    switch (this.state){
      case 'susceptible': 
        this.color = 'rgb(255, 255, 255)';
        break;
      case 'infected':
        this.color = 'rgb(255, 0, 0)';
        break;
      case 'recovered':
        this.color = 'rgb(0, 255, 0)';
        break;
    }
      
  }
    
  
  move(){
    this.pos.add(this.speed);
  }
  
  checkWall(){
    if(this.pos.x > width || this.pos.x < 0){
      this.speed.x = this.speed.x * (-1);
    } else if(this.pos.y > height || this.pos.y < 0){
      this.speed.y = this.speed.y * (-1);
    }
  }
  
  show(){
    if(this.state == this.states[1]){
      this.count++;
    }
    fill(this.color);
    ellipse(this.pos.x, this.pos.y, this.dotWidth);
  }
}