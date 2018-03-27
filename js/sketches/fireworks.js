var fireworksSketch = function( p ) {
    function Particle(x, y, hu, firework) {
        this.pos = p.createVector(x, y);
        this.firework = firework;
        this.lifespan = 455;
        this.hu = hu;
        if (this.firework) {
            this.vel = p.createVector(p.random(-1, 1),p. random(-20, -5));
        } else {
            // this.vel = p.createVector(p.random(-10, 10), p.random(-10, -1));
            this.vel = p5.Vector.random2D();
            this.vel.mult(p.random(1, 8));
        }

        this.acc = p.createVector(0, 0);

        this.applyForce = function (force) {
            this.acc.add(force);
        }

        this.update = function () {
            if (!this.firework) {
                this.vel.mult(0.95);
                this.lifespan -= 4;
            }
            this.vel.add(this.acc);
            this.pos.add(this.vel);
            this.acc.mult(0);
        }

        this.show = function () {
            p.colorMode(p.HSB);
            if (!this.firework) {
                p.strokeWeight(2);
                p.stroke(this.hu, 255, 255, this.lifespan);
            } else {
                p.strokeWeight(4);
                p.stroke(this.hu, 255, 255);
            }
            p.point(this.pos.x, this.pos.y);
        }
    }

    function Firework(x, y) {
        this.hu = p.random(255);
        if (x && y) {
            this.firework = new Particle(x, y, this.hu, true);
        } else {
            this.firework = new Particle( p.random( p.width),  p.height, this.hu, true);
        }
        this.exploded = false;
        this.particles = [];
        this.showCount = 0;

        this.update = function () {
            if (!this.exploded) {
                this.firework.applyForce(gravity);
                this.firework.update();
                if (this.firework.vel.y >= 0) {
                    this.exploded = true;
                    this.explode();
                }
            } else {
                for (var i = 0; i < this.particlesCount; i++) {
                    this.particles[i].applyForce(gravity);
                    this.particles[i].update();
                }
            }

        }

        this.explode = function () {
            this.particlesCount = p.random(200);
            for (var i = 0; i < this.particlesCount; i++) {
                var particle = new Particle(this.firework.pos.x, this.firework.pos.y, this.hu);
                this.particles.push(particle);
            }
        }

        this.show = function () {

            if (!this.exploded) {
                this.firework.show();
            }

            for (var i = 0; i < this.particlesCount; i++) {
                this.particles[i].show();
            }

            return ++this.showCount;
        }
    }

    var fireworks = [], gravity;

    p.setup = function() {
        p.createCanvas(1600, 1000);
        gravity = p.createVector(0, 0.2);
        p.stroke(255);
        p.strokeWeight(4);
        p.background(0);
    }

    p.draw = function() {
        p.colorMode(p.RGB);
        p.background(0, 0, 0, 25);
        if (p.random(1) < 0.24) {
            fireworks.push(new Firework());
        }

        for (var i = fireworks.length - 1; i >= 0; i--) {
            fireworks[i].update();
            if (fireworks[i].show() > 400) {
                fireworks.splice(i, 1);
            }
            ;
        }
    }

    p.mouseClicked = function() {
        fireworks.push(new Firework(p.mouseX, p.mouseY));
    }
}
