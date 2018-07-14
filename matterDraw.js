function setPhysics() {
    var Engine = Matter.Engine,
        Render = Matter.Render,
        Runner = Matter.Runner,
        Composites = Matter.Composites,
        MouseConstraint = Matter.MouseConstraint,
        Mouse = Matter.Mouse,
        World = Matter.World,
        Bodies = Matter.Bodies,
        Common = Matter.Common,
        
        engine = Engine.create(),
        world = engine.world,
        
        render = Render.create({
        element: document.body,
        engine: engine,
        options: {
            width: screen.width,
            height: screen.height,
            showAngleIndicator: false,
            wireframes: false,
            background: "#FFFFFF",
            showAxes: true
        }
    });
    
    Render.run(render);
    
    var runner = Runner.create();
    Runner.run(runner, engine);
    
    
    var base = Bodies.rectangle(screen.width * 0.5, screen.height * 0.73, screen.width, screen.height * 0.2, {
        isStatic: true,
        render: {
            fillStyle: '#FFDD99'
        }
    });
    
    var computer = [
        Bodies.rectangle(screen.width * 0.25, screen.height * 0.35, screen.width * 0.03, screen.height * 0.4),
        
        Bodies.rectangle(screen.width * 0.75, screen.height * 0.35, screen.width * 0.03, screen.height * 0.4),
        
        Bodies.rectangle(screen.width * 0.5, screen.height * 0.15, screen.width * 0.53, screen.height * 0.025),
        
        Bodies.rectangle(screen.width * 0.5, screen.height * 0.55, screen.width * 0.53, screen.height * 0.025),
        
        Bodies.rectangle(screen.width * 0.5, screen.height * 0.59, screen.width * 0.07, screen.height * 0.08),
        
        Bodies.rectangle(screen.width * 0.5, screen.height * 0.63, screen.width * 0.25, screen.height * 0.05)
    ];
    
    
    for (var i = 0; i < computer.length; ++i) {
        computer[i].isStatic = true;
        computer[i].render.fillStyle = "#000000";
    }
    
    World.add(world, [base].concat(computer));
    
    function drawCircles(xCenter) {
        return Composites.stack(xCenter, -700, 30, 10, 10, 10, function(x, y) {
            return Bodies.circle(x, y, Common.random(10, 25), {
                restitution: 0.7,
                friction: 0.3
            });
        })
    }
    
    World.add(world, [drawCircles(screen.width * 0.05), drawCircles(screen.width * 0.75)]);
    
    
    var mouse = Mouse.create(render.canvas),
        mouseConstraint = MouseConstraint.create(engine, {
            mouse: mouse,
            constraint: {
                stiffness: 0.2,
                render: {
                    visible: false
                }
            }
        });
    
    World.add(world, mouseConstraint);
    
    render.mouse = mouse;
    
    Render.lookAt(render, {
        min: {
            x: 0,
            y: 0
        },
        max: {
            x: screen.width,
            y: screen.height
        }
    });
};
