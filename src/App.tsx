import { useEffect, useState } from "react";
import Konva from "konva";
import { Stage, Layer, Circle } from "react-konva";
import React from "react";
import Layout from "./components/layouts/Layout";

function App() {
  const circleRef = React.useRef<Konva.Circle>(null);

  useEffect(() => {
    if (!circleRef.current) return;

    circleRef.current.on("dragstart", () => {
      console.log("dragstart");
    });

    circleRef.current.on("dragend", (data) => {
      console.log(data);
    });
  }, [])

  return (
    <Layout>
      {/* <Button className="bg-primary">
        hello
      </Button>
      <Stage width={window.innerWidth} height={window.innerHeight}>
        <Layer>
          <Circle ref={circleRef} x={200} y={100} radius={50} fill="green" draggable />
        </Layer>
      </Stage> */}

      <section className="w-full h-full bg-white">

      </section>
    </Layout>
  );
}

export default App;
