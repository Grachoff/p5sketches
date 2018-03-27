var lorenzAttractorSketch = function( p ) {
    var x, y, z, xold, yold, zold;
    var A = 12;
    var B = 38;
    var C = 18.0/3.0;
    var dt = 0.01;

    p.setup = function() {
        x = 10.01;
        y = 10;
        z = 10;
        xold = x;
        yold = y;
        zold = z;
        p.createCanvas(CANVAS_SIZE, CANVAS_SIZE, p.P3D );
    };

    p.draw = function () {
        var dx = (A * (y-x)) * dt;
        var dy = (x * (B - z) - y) * dt;
        var dz = (x * y - C * z) * dt;
        x += dx;
        y += dy;
        z += dz;
        p.translate(p.width/2, p.height/2)
        p.stroke(255, 100, 50);
        p.line(xold, yold, zold, x, y, z);
        console.log(xold, yold, zold, x, y, z);
        xold = x;
        yold = y;
        zold = z;
    }
}
