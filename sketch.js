const particles = [[], [], []];
const colors = ["27,30,57", "95,134,141", "229,83,76"]
const nums = 80;
const noiseScale = 800;

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
    background(0,0,0);
}

function setup() {
	createCanvas(windowWidth, windowHeight);
	background(0,0,0);
	for (let i = 0; i < particles.length; i++)
		for (let j = 0; j < nums; j++)
			particles[i][j] = new Particle(random(0, width),random(0,height));
}

function draw(){
	noStroke();
	smooth();
	for (let i = 0; i < nums; i++) {
		var radius = map(i,0,nums,1,2);
		var alpha = map(i,0,nums,0,1);

		for (let j = 0; j < 3; j++) {
			fill(`rgba(${colors[j]}, ${alpha})`);
			particles[j][i].draw(radius);
		}
	}  
}

class Particle {
	constructor(x, y) {
		this.dir = createVector(0, 0);
		this.vel = createVector(0, 0);
		this.pos = createVector(x, y);
		this.speed = 0.4;
	}

	draw(r) {
		this.move();
		this.display(r);
		this.checkEdge();
	}

	move() {
		var angle = noise(this.pos.x/noiseScale, this.pos.y/noiseScale)*TWO_PI*noiseScale;
		this.dir.x = cos(angle);
		this.dir.y = sin(angle);
		this.vel = this.dir.copy();
		this.vel.mult(this.speed);
		this.pos.add(this.vel);
	}

	checkEdge() {
		if (this.pos.x > width || this.pos.x < 0 || this.pos.y > height || this.pos.y < 0) {
			this.pos.x = random(50, width);
			this.pos.y = random(50, height);
		}
	}

	display(r) {
		ellipse(this.pos.x, this.pos.y, r, r);
		if (this.speed > 0.1) this.speed *= 0.999;
	}
}