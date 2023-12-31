import React, { useEffect, useLayoutEffect, useState } from "react";
import rough from "roughjs/bundled/rough.esm";

const generator = rough.generator();

const WhiteBoard = ({
  canvasRef,
  ctxRef,
  color,
  setElements,
  elements,
  tool,
}) => {

  const [isDrawing, setIsDrawing] = useState(false);
  

  useEffect(() => {
    
    const canvas = canvasRef.current;
    
    canvas.height = window.innerHeight * 2;
    canvas.width = window.innerWidth * 2;
    canvas.style.width = `${window.innerWidth}px`;
    canvas.style.height = `${window.innerHeight}px`;
    const ctx = canvas.getContext("2d");

    ctx.strokeWidth = 5;
    ctx.scale(2, 2);
    ctx.lineCap = "round";
    ctx.strokeStyle = color;
    ctx.lineWidth = 5;
    ctxRef.current = ctx;
  }, []);

  useEffect(() => {
    ctxRef.current.strokeStyle = color;
  }, [color]);

  const handleMouseDown = (e) => {
    const { offsetX, offsetY } = e.nativeEvent;

    if (tool === "pencil") {
      setElements((prevElements) => [
        ...prevElements,
        {
          offsetX,
          offsetY,
          path: [[offsetX, offsetY]],
          stroke: color,
          element: tool,
        },
      ]);
    } else {
      setElements((prevElements) => [
        ...prevElements,
        { offsetX, offsetY, stroke: color, element: tool },
      ]);
    }

    setIsDrawing(true);
  };

  useLayoutEffect(() => {
    if (!elements || !canvasRef.current || !ctxRef.current) return;
  
    const roughCanvas = rough.canvas(canvasRef.current);
  
    if (elements.length > 0) {
      ctxRef.current.clearRect(
        0,
        0,
        canvasRef.current.width,
        canvasRef.current.height
      );
  
      elements.forEach((ele, i) => {
        if (ele.element === "rect") {
          roughCanvas.draw(
            generator.rectangle(ele.offsetX, ele.offsetY, ele.width, ele.height, {
              stroke: ele.stroke,
              roughness: 0,
              strokeWidth: 5,
            })
          );
        } else if (ele.element === "line") {
          roughCanvas.draw(
            generator.line(ele.offsetX, ele.offsetY, ele.width, ele.height, {
              stroke: ele.stroke,
              roughness: 0,
              strokeWidth: 5,
            })
          );
        } else if (ele.element === "pencil") {
          if (ele.path && ele.path.length > 1) {  // Ensure path is defined and has length
            roughCanvas.linearPath(ele.path, {
              stroke: ele.stroke,
              roughness: 0,
              strokeWidth: 5,
            });
          }
        }
      });    
    }
  }, [elements]);
  

  const handleMouseMove = (e) => {
    if (!isDrawing || !elements || elements.length === 0) return;
    const { offsetX, offsetY } = e.nativeEvent;

    if (tool === "rect") {
      setElements((prevElements) =>
        prevElements.map((ele, index) =>
          index === elements.length - 1
            ? {
                offsetX: ele.offsetX,
                offsetY: ele.offsetY,
                width: offsetX - ele.offsetX,
                height: offsetY - ele.offsetY,
                stroke: ele.stroke,
                element: ele.element,
              }
            : ele
        )
      );
    } else if (tool === "line") {
      setElements((prevElements) =>
        prevElements.map((ele, index) =>
          index === elements.length - 1
            ? {
                offsetX: ele.offsetX,
                offsetY: ele.offsetY,
                width: offsetX,
                height: offsetY,
                stroke: ele.stroke,
                element: ele.element,
              }
            : ele
        )
      );
    } else if (tool === "pencil") {
      setElements((prevElements) =>
        prevElements.map((ele, index) =>
          index === elements.length - 1
            ? {
                offsetX: ele.offsetX,
                offsetY: ele.offsetY,
                path: [...ele.path, [offsetX, offsetY]],
                stroke: ele.stroke,
                element: ele.element,
              }
            : ele
        )
      );
    }
  };
 
  const handleMouseUp = (e) => {
    console.log(e)
    setIsDrawing(false);
  };

  return (
    <div
      className="col-md-8 overflow-hidden border  border-dark px-0 mx-auto mt-3 "
      style={{ height: "450px", width:"100%" }}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
    >
      <canvas ref={canvasRef} />
    </div>
  );
};

export default WhiteBoard;