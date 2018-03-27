var starsSketch = function( p ) {
    var STARS_COUNT = 3000;
    var MAX_SIZE = 3;
    var stars = [];
    var speed = 1;

    function Star() {
        this.x = p.random(-p.width, p.width);
        this.y = p.random(-p.height, p.height);
        this.z = p.random(p.width);
        this.size = p.random(MAX_SIZE);
        this.pz = this.z;

        this.update = function () {
            this.pz = this.z;
            this.z -= speed;
            if (this.z < 0) {
                this.x = p.random(-p.width, p.width);
                this.y = p.random(-p.height, p.height);
                this.z = p.random(p.width);
                this.size = p.random(MAX_SIZE);
                this.pz = this.z;
            }
        }

        this.show = function () {
            p.fill(255);
            p.noStroke();
            var sx = p.map(this.x / this.z, 0, 1, 0, p.width);
            var sy = p.map(this.y / this.z, 0, 1, 0, p.height);
            var r = p.map(this.z, 0, p.width, this.size, 1);
            p.ellipse(sx, sy, r, r);

            var px = p.map(this.x / this.pz, 0, 1, 0, p.width);
            var py = p.map(this.y / this.pz, 0, 1, 0, p.height);
            p.stroke(255);
            p.line(px, py, sx, sy);
        }
    }

    p.setup = function() {
        p.createCanvas(800, 800);
        for (var i = 0; i < STARS_COUNT; i++) {
            stars.push(new Star());
        }
    };

    p.draw = function() {
        speed = p.map(p.mouseX, 0, p.width, 1, 60);
        p.background(0);
        p.translate(p.width/2, p.height/2);
        for (var i = 0; i < STARS_COUNT; i++) {
            stars[i].update();
            stars[i].show();
        }
    };
};
