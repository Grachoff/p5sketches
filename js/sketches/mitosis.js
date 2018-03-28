var mitosisSketch = function( p ) {
    var MAX_RADIUS = 80;
    function Cell(position, radius, color) {
        this.pos = position ? position.copy() : p.createVector(p.random(p.width), p.random(p.height));
        this.r = radius ? radius : MAX_RADIUS;
        this.c = color ? color : p.color(p.random(0, 255), p.random(0, 255), p.random(0, 255), 100);

        this.move = function () {
            var vel = p5.Vector.random2D();
            this.pos.add(vel);
            if (this.r < MAX_RADIUS) this.r+=p.random(0, 0.3);
        };

        this.show = function () {
            p.noStroke();
            p.fill(this.c, 100);
            p.ellipse(this.pos.x, this.pos.y, this.r, this.r);
        };

        this.clicked = function (x, y) {
            var d = p.dist(this.pos.x, this.pos.y, x, y);
            return d<this.r;
        };

        this.mitosis = function () {
            return new Cell(this.pos, this.r/2, this.c);
        };
    }


    var cells = [];

    p.setup = function() {
        p.createCanvas(CANVAS_SIZE, CANVAS_SIZE);
        cells.push(new Cell());
        cells.push(new Cell());
    };

    p.draw = function () {
        p.background(51);
        for (var i = 0; i < cells.length; i ++) {
            cells[i].move();
            cells[i].show()
        }
    };
    p.mouseClicked = function () {
        for (var i = 0; i < cells.length; i ++) {
            if (cells[i].clicked(p.mouseX, p.mouseY)) {
                var a = cells[i].mitosis();
                var b = cells[i].mitosis();
                cells.splice(i, 1);
                cells.push(a, b);
                return;
            }
        }
    };
};
