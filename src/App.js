import React, { useState } from "react";
import Konva from "konva";

import { Stage, Layer, Rect, Text } from "react-konva";

function App() {
  const [textEditVisible, setTextEditVisible] = useState(false)
  const [textX, setTextX] = useState(0)
  const [textY, setTextY] = useState(0)
  const [textValue, setTextValue] = useState('')
  const [flag, setFlag] = useState(false)
  const [texts, setTexts] = useState([])


  const handleTextareaKeyDown = e => {
    if (e.keyCode === 13 && e.target.value !== '') {
      setTextEditVisible(false)
      const newText = new Konva.Text({
        text: textValue,
        x: textX + 10,
        y: textY - 15,
      })
      setTexts([...texts, newText])
      setFlag(false)

    }
  };

  const handleTextEdit = (e) => {
    setTextValue(e.target.value)

  };

  const handleTextDblClick = (e) => {
    const absPos = e.target.getAbsolutePosition();
    setTextEditVisible(true)
    setTextX(absPos.x)
    setTextY(absPos.y)
  };

  function handleMouseDown(e) {
    if (flag) {
      const absPos = e.target.getStage().getPointerPosition()
      handleTextDblClick(e)
      setTextEditVisible(true)
      setTextX(absPos.x)
      setTextY(absPos.y)

    }
  }
  function flagbtn() {
    setFlag(true)
    setTextValue('')
  }

  return (
    <div>
      <button onClick={flagbtn} >click</button>
      <button onClick={() => { setTexts({}) }} >Delete</button>
      <Stage
        onClick={handleMouseDown}
        width={window.innerWidth} height={window.innerHeight}>
        <Layer>
          {/* <Text
            fontSize={20}
            align={"left"}
            fontStyle={20}
            draggable
            text={textValue}
            x={pointer.x - 20}
            y={pointer.y - 10}
            wrap="word"
            width={400}
            onClick={e => handleTextDblClick(e)}
          /> */}
          {console.log(texts)}
          {texts.length > 0 && texts.map((t, i) => {
            console.log(t.attrs.x)
            return (
              <Text
                key={i}
                fontSize={20}
                align={"left"}
                fontStyle={20}
                draggable
                text={t.attrs.text}
                x={t.attrs.x}
                y={t.attrs.y}
                wrap="word"
                width={400}
                onClick={e => handleTextDblClick(e)}
              />
            )
          })}
        </Layer>
      </Stage>
      <textarea
        value={textValue}
        style={{
          color: 'black',
          fontSize: '20px',
          background: 'transparent',
          overflow: 'hidden',
          scrollbar: 'none',
          outline: 'none',
          border: 'none',
          scrollbarColor: 'none',
          display: textEditVisible ? "block" : "none",
          position: "absolute",
          top: textY + 10 + "px",
          left: textX - 15 + "px"
        }}
        onChange={e => handleTextEdit(e)}
        onKeyDown={e => handleTextareaKeyDown(e)}
      />
    </div>
  );

}

export default App
