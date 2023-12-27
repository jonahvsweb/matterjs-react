import { useEffect, useRef } from "react";
import Matter, { Bodies, Engine, Render, World } from "matter-js";

import "./Comp.css";

const Comp = ({ props }) => {
  const scene = useRef();
  const engine = useRef(Engine.create());

  useEffect(() => {
    const cw = document.body.clientWidth;
    const ch = document.body.clientHeight;
    const total = 10;

    const render = Render.create({
      element: scene.current,
      engine: engine.current,
      options: {
        width: cw,
        height: ch,
        wireframes: false,
        background: "transparent",
      },
    });

    World.add(engine.current.world, [
      Bodies.rectangle(cw / 2, -10, cw, 20, { isStatic: true }),
      Bodies.rectangle(-10, ch / 2, 20, ch, { isStatic: true }),
      Bodies.rectangle(cw / 2, ch + 10, cw, 20, { isStatic: true }),
      Bodies.rectangle(cw + 10, ch / 2, 20, ch, { isStatic: true }),
    ]);

    for (let i = 0; i < total; i++) {
      World.add(engine.current.world, [
        Bodies.circle(
          Math.random() * cw,
          Math.random() * ch,
          50 + Math.random() * 150,
          {
            mass: 0.1,
            friction: 0.005,
            render: {
              fillStyle: "#0000FF",
            },
          }
        ),
      ]);
    }

    Matter.Runner.run(engine.current);
    Render.run(render);

    return () => {
      Render.stop(render);
      World.clear(engine.current.world);
      Engine.clear(engine.current);
      render.canvas.remove();
      render.canvas = null;
      render.context = null;
      render.textures = {};
    };
  }, []);

  return <div ref={scene} className="component-main" />;
};

export default Comp;
