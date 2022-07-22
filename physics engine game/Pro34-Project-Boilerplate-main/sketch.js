
const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;
const Mouse = Matter.Mouse;
const MouseConstraint = Matter.MouseConstraint,
Render = Matter.Render,
Runner = Matter.Runner,
Events = Matter.Events,
Constraint = Matter.Constraint,
Composite = Matter.Composite;



var ground, box;
var bird;
var mConstraint;



function setup() {
  var canvas = createCanvas(600,400);

  engine = Engine.create();
  var render = Render.create({
    element:document.body,
    engine:engine,
    options: {
      width: 900,
      height: 400,
      showAngleIndicator:true,
      wireframes: false,
      background: "lightblue"
    }
  })

  world = engine.world;

  ground = new Ground(width/2, height-10, width, 20);
  box = new Box(450,300,50,75);

  bird = new Bird (50,300,25)
  
  /*const mouse = Mouse.create(canvas.elt);
  const options = {
    mouse: mouse
  }
  mConstraint = MouseConstraint.create(engine, options);
  World.add(world,mConstraint);*/

  
  // var elastic = Matter.Constraint.create({
  //   pointA:{x:10,y:310},
  //   bodyB: bird,
  //   stiffness: 0.05,
  //   length: 0.5
  // });

  var option = {
    pointA:{x:10,y:310},
    bodyB : bird.body,
    stiffness: 0.05,
    length: 0.5
  }

  elastic = Constraint.create(option);
  World.add(world, elastic);

  var mouse = Mouse.create(render.canvas);
  var MouseConstraint = MouseConstraint.create(engine,{
    mouse:mouse,
    constraint:{
      stiffness:0.2,
      render:{
        visible:false
      }
    }
  })

  render.mouse = mouse;
  Matter.Composite.add(engine.world,MouseConstraint);

  var firing= false;

  Events.on(mouseConstraint, 'enddrag', function(event){
    if(event.body === bird) firing = true;
  });

  Events.on(engine, 'afterUpdate', function(){

    if(firing && Math.abs(bird.position.x - 250)< 20 && Math.abs(bird.position.y - 250)<20 )
    {

      bird = new Bird (50,300,25);
      Matter.Composite.add(engine.world, bird);
      elastic.bodyB = bird.body;
      firing = false;

    }
  })


  rectMode(CENTER);
  ellipseMode(CENTER);
  
}


function draw() 
{
  background(51);
  Engine.update(engine);

  ground.show();
  box.show();
  bird.show();
}

