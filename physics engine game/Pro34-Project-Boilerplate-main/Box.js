class Box{

    constructor(x,y,w,h){

        this.h = h;
        this.w = w;

        this.body = Matter.Bodies.rectangle(x,y,w,h);
        Matter.World.add(world,this.body)

    }

    show(){
        var pos = this.body.position;
        var angle = this.body.angle
        push();
        translate (pos.x, pos.y);
        rotate (angle);
        fill(255);
        rect (0,0, this.w, this.h)
        pop ();
    }
}