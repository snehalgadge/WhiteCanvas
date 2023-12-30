import React, { useRef, useState } from 'react'
import WhiteBoard from '../components/WhiteBoard'


const RoomPage = () => {

  const canvasRef = useRef(null)
  const ctxRef = useRef(null)

  const[tool, setTool] = useState("pencil")
  const[color, setColor] = useState("black")
  const[elements, setElements] = useState([])
  const[history, setHistory] = useState([])

  const undo = () =>{
    setHistory((prevHistroy) => [
      ...prevHistroy,
      elements[elements.length - 1]
    ]);
    setElements((prevElememts) => 
    prevElememts.slice(0,prevElememts.length - 1)
    )
  }

  const redo = () =>{
    setElements((prevElememts) => [
      ...prevElememts,
      history[history.length - 1]
    ]);
    setHistory((prevHistroy) => 
    prevHistroy.slice(0,prevHistroy.length - 1)
    )
  }
  const handleClearCanvas = () =>{
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    ctx.fillRect = "white";

    if (elements.length > 0) {
      ctxRef.current.clearRect(
        0,
        0,
        canvasRef.current.width,
        canvasRef.current.height
      )
    } 
    setElements([])
  }


  return (
    <div className='row'>
    <h1 className='text-center py-4'>White Board Sharing App{" "}
    <span className='text-primary'>[Users online: 0]</span></h1>
      <div className='col-md-12 mb-4 mx-auto px-4 d-flex align-items-center justify-content-center'>
        <div className='col-md-5 d-flex justify-content-center gap-5'>
        <div className='d-flex gap-1'>
          <input type='radio' 
          name='tool' 
          checked={tool === "pencil"}
          value='pencil' 
          onChange={(e)=>setTool(e.target.value)}
          />
          <label for="pencil">Pencil</label>
        </div>
        <div className='d-flex gap-1'>
        <input type='radio' 
        name='tool' 
        checked={tool === "line"}
        value='line' 
        onChange={(e)=>setTool(e.target.value)}
        />
        <label for="line">Line</label>
        </div>
        <div className='d-flex gap-1'>
        <input type='radio' 
          name='tool' 
          checked={tool === "rect"}
          value='rect' 
          onChange={(e)=>setTool(e.target.value)}
          />
          <label for="rect">Reactangle</label>
        </div>
        </div>
        <div className='col-md-2'>
         <div className='d-flex align-items-center'>
          <label for='color'>Select Color:</label>
          <input type='color'
          id='color'
          className='mt-1 ms-2'
          onChange={ (e) => setColor(e.target.value) }/>
         </div>
        </div>
        <div className='col-md-3 d-flex justify-content-center gap-2'>
          <button className='btn btn-primary mt-1'
          disabled={ elements.length === 0 }
          onClick={ undo }
          >Undo</button>
          <button className='btn btn-outline-primary mt-1'
          disabled={ history.length < 1}
          onClick={ redo }
          >Redo</button>
        </div>
        <div className='col-md-2'>
          <button className='btn btn-danger' onClick={handleClearCanvas}>Clear Canvas</button>
        </div>
      </div>
      <div className='col-md-10 mx-auto'>
      <WhiteBoard 
      canvasRef={canvasRef} 
      ctxRef={ctxRef}
      elements={elements}
      setElements={setElements}
      color={color}
      tool={tool}
      />
      </div>
    </div>
  )
}

export default RoomPage