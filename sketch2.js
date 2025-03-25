let balls = [];

let sketch2 = function(p) {
    p.setup = function() {
        let cnv2 = p.createCanvas(500, 500);
        cnv2.parent('canvas2'); // Attach to div
        for (let i = 0; i < 10; i++) {
            balls.push(new Ball(p.random(p.width), p.random(p.height), p.random(10, 30), p));
        }
    };

    p.draw = function() {
        p.background(50);
        for (let ball of balls) {
            ball.move();
            ball.display();
        }
    };

    class Ball {
        constructor(x, y, r, p) {
            this.p = p;
            this.x = x;
            this.y = y;
            this.r = r;
            this.xSpeed = p.random(-3, 3);
            this.ySpeed = p.random(-3, 3);
        }

        move() {
            this.x += this.xSpeed;
            this.y += this.ySpeed;

            if (this.x < this.r || this.x > this.p.width - this.r) this.xSpeed *= -1;
            if (this.y < this.r || this.y > this.p.height - this.r) this.ySpeed *= -1;
        }

        display() {
            this.p.fill(255, 100, 100);
            this.p.noStroke();
            this.p.ellipse(this.x, this.y, this.r * 2);
        }
    }
};

// Create the second sketch
new p5(sketch2);
