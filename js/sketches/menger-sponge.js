var mengerSpongeSketch = function( p ) {

    function Box(x, y, z, r_) {
        this.pos = new p.createVector(x, y, z);
        this.r = r_;

        this.generate = function () {
            var boxes = [];
            for (var x = -1; x < 2; x++) {
                for (var y = -1; y < 2; y++) {
                    for (var z = -1; z < 2; z++) {
                        var sum = Math.abs(x) + Math.abs(y) + Math.abs(z);
                        if (sum <= 1) {
                        // if (sum > 1) {
                            var newR = this.r/3;
                            var b = new Box(
                                this.pos.x + x*newR,
                                this.pos.y + y*newR,
                                this.pos.z + z*newR,
                                newR);
                            boxes.push(b);
                        }
                    }
                }
            }
            return boxes;
        }

        this.show = function () {
            p.push();
            p.translate(this.pos.x, this.pos.y, this.pos.z);
            p.fill(200);
            p.box(this.r);
            p.pop();
        }
    }

    var a = 0.000;
    var sponge = [new Box(0,0,0,BOX_SIZE)];
    p.setup = function() {
        p.createCanvas(CANVAS_SIZE, CANVAS_SIZE, p.WEBGL);
    };


    p.draw = function() {
        p.background(55);
        p.stroke(255);
        p.fill(255);
        p.ambientLight(200, 50, 10);
        p.ambientMaterial(150);
        // p.translate(p.width/2, p.height/2);
        p.rotateX(a);
        p.rotateY(a*0.4);
        p.rotateZ(a*0.12);
        for (var b in sponge) {
           sponge[b].show();
        }
        a += 0.01;
    };

    p.mouseClicked = function () {
        var next = [];
        for (var b in sponge) {
            var newBoxes = sponge[b].generate();
            next = next.concat(newBoxes);
        }
        sponge = next;
    }
};
