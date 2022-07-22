class Bird{

    constructor(x,y,r){

        this.r = r;

        this.body = Matter.Bodies.circle(x,y,r);
        Matter.World.add(world, this.body)
    }

    show(){
        var pos = this.body.position;
        var angle = this.body.angle
        push();
        translate (pos.x, pos.y);
        rotate (angle);
        fill(255);
        ellipse(0,0, this.r);
        pop ();
    }
}