import Konva from 'konva';
import { useState } from 'react';
import { Stage, Layer, Text, Rect, Circle } from 'react-konva'

function App() {
  const [inprog, setInprog] = useState({})
  const [rects, setRects] = useState([])
  const [isDrawing, setIsDrawing] = useState(false)
  function handleMouseDown(e) {
    setIsDrawing(true)
    const shape = new Konva.Rect({
      x: e.target.getStage().getPointerPosition().x,
      y: e.target.getStage().getPointerPosition().y,
      width: 20,
      height: 20,
      fill: "red",
      stroke: "red"
    })
    setInprog(shape)
  }
  function handleMouseMove(e) {
    if (!isDrawing) { setIsDrawing(false) }
    if (inprog.attrs) {
      const width = e.target.getStage().getPointerPosition().x - inprog.attrs.x
      const height = e.target.getStage().getPointerPosition().y - inprog.attrs.y
      const shape = new Konva.Rect({
        x: inprog.attrs.x,
        y: inprog.attrs.y,
        width: width,
        height: height,
        fill: "red",
        stroke: "red"
      })
      setInprog(shape)
      console.log(width)
    }
  }

  function handleMouseUp(e) {
    setIsDrawing(false)
    setRects([...rects, inprog])
    setInprog({})
    console.log(rects);
  }
  return (
    <div>
      app working
      <Stage
        width={window.innerWidth} height={window.innerHeight}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
      >
        <Layer>

          {rects.length > 0 &&
            <>
              {
                rects.map((rect, i) => {
                  return (

                    <Rect
                      key={i}
                      x={rect.attrs.x}
                      y={rect.attrs.y}
                      width={rect.attrs.width}
                      height={rect.attrs.height}
                      fill="red"
                      opacity={0.2}
                      stroke='red'
                      shadowBlur={10}
                      draggable

                    />

                  )

                }
                )
              }

            </>

          }


        </Layer>
      </Stage>

    </div>
  );
}

export default App;
