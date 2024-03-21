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
var leftwall = Bodies.rectangle(10, -4420, 100, 10000, { isStatic: true});
var rightwall = Bodies.rectangle(800, -4420, 100, 10000, { isStatic: true});

// add the ground to the world
Composite.add(engine.world, [ground, leftwall, rightwall]);

// create a mouse constraint
var mouse = Mouse.create(render.canvas);
var mouseConstraint = MouseConstraint.create(engine, {
    mouse: mouse
});

// add the mouse constraint to the world
Composite.add(engine.world, mouseConstraint);

// run the renderer
Render.run(render);

// create runner
var runner = Runner.create();

// run the engine
Runner.run(runner, engine);

// create a player
var player = Bodies.rectangle(200, 200, 50, 50);

// add the player to the world
Composite.add(engine.world, player);

// add keyboard event listener for player movement
document.addEventListener("keydown", function(event) {
    switch (event.code) {
        case 'ArrowUp':
            Matter.Body.setVelocity(player, {x: player.velocity.x, y: -10});
            updateCamera();
            break;
        case 'ArrowDown':
            Matter.Body.setVelocity(player, {x: player.velocity.x, y: 10});
            updateCamera();
            break;
        case 'ArrowLeft':
            Matter.Body.setVelocity(player, {x: -10, y: player.velocity.y});
            updateCamera();
            break;
        case 'ArrowRight':
            Matter.Body.setVelocity(player, {x: 10, y: player.velocity.y});
            updateCamera();
            break;
    }
});

setInterval(() => {
    updateCamera();
    player.angle = 0;
}, 10);

function updateCamera() {
    let translate = {x : 250, y : 250};
    Render.lookAt(render, player, translate);
    Bounds.translate(render.bounds, translate);
}