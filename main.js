// module aliases
var Engine = Matter.Engine,
    Render = Matter.Render,
    Runner = Matter.Runner,
    Bodies = Matter.Bodies,
    Composite = Matter.Composite,
    Mouse = Matter.Mouse,
    MouseConstraint = Matter.MouseConstraint;

// create an engine
var engine = Engine.create();

// create a renderer
var render = Render.create({
    element: document.body,
    engine: engine
});

// create an array to store all bodies
var bodies = [];

// create a ground
var ground = Bodies.rectangle(400, 610, 810, 60, { isStatic: true });

// add the ground to the world
Composite.add(engine.world, ground);

// create a mouse constraint
var mouse = Mouse.create(render.canvas);
var mouseConstraint = MouseConstraint.create(engine, {
    mouse: mouse
});

// add the mouse constraint to the world
Composite.add(engine.world, mouseConstraint);

// initialize shapeIndex to 0 (rectangle)
var shapeIndex = 0;

// listen for keydown events
document.addEventListener("keydown", function (event) {
    switch (event.key) {
        case '1':
            shapeIndex = 0; // rectangle
            alert("rectangle");
            break;
        case '2':
            shapeIndex = 1; // circle
            alert("circle");
            break;
        case '3':
            shapeIndex = 2; // other shape
            alert("triangle");
            break;
        default:
            break;
    }
});

// listen for right-click events
render.canvas.addEventListener('contextmenu', function (event) {
    event.preventDefault(); // prevent default context menu

    // Create different types of bodies based on shapeIndex
    var newBody;
    switch (shapeIndex) {
        case 0:
            newBody = Bodies.rectangle(mouse.position.x, mouse.position.y, 80, 80);
            break;
        case 1:
            newBody = Bodies.circle(mouse.position.x, mouse.position.y, 40);
            break;
        case 2:
            newBody = Bodies.trapezoid(mouse.position.x, mouse.position.y, 80, 80, 1);
            break;  
        default:
            // Handle other cases (if needed)
            break;
    }

    if (newBody) {
        bodies.push(newBody); // add to the bodies array
        Composite.add(engine.world, newBody); // add to the world
    }
});

// run the renderer
Render.run(render);

// create runner
var runner = Runner.create();

// run the engine
Runner.run(runner, engine);