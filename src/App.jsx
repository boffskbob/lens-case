import { useState } from 'react'
import './App.css'

const DEFAULT_DIAMETER = 50;



function App() {
  const [items, setItems] = useState([]);
  const [count, setCount] = useState(0);

  function addItem(rawX, rawY){
    const sandboxBounds = document.getElementById("sandbox").getBoundingClientRect();
    const x = rawX - sandboxBounds.left - DEFAULT_DIAMETER / 2; 
    const y = rawY - sandboxBounds.top - DEFAULT_DIAMETER / 2;
  
    // Add a new draggable item
    setCount(count + 1);
    setItems([...items, { id: count, x, y }]);
  }

  const handleClick = (e) => {
    const sandbox = document.getElementById("sandbox");
    if (e.target == sandbox){
      addItem(e.clientX, e.clientY);
    }
    else{
      // handle select item
      console.log("clicked item");
    }
  }

  const handleDrag = (e, id) => {
    console.log("start drag");
    e.dataTransfer.setData("item-id", id);
  }

  const handleDrop = (e) => {
    console.log("start drop");
    const itemId = e.dataTransfer.getData("item-id");
    const item = document.getElementById(itemId);
    
    const sandbox = document.getElementById("sandbox").getBoundingClientRect();
    const x = e.clientX - sandbox.left - DEFAULT_DIAMETER / 2; 
    const y = e.clientY - sandbox.top - DEFAULT_DIAMETER / 2;

    item.setAttribute("style", "left: " + String(x) + "px; top: " + String(y) + "px");
    console.log(e.clientX, e.clientY);
  }
  
  const handleDragOver = (e) => {
    e.preventDefault();
  }

  return (
    <div id='container'>
      <div id='sandbox' onClick={handleClick} onDrop={handleDrop} onDragOver={handleDragOver}>
      {items.map((item) => (
        // turn this into a separate component at some point
        <div
          className='lens'
          id={item.id}
          key={item.id}
          style={{ left: item.x, top: item.y }}
          draggable
          onDragStart={(e) => handleDrag(e, item.id)}
        ></div>
      ))}
      </div>
      <div id='selection-container'>
        <div id="selections"></div>
        <button id='save-button'>save</button>
      </div>
    </div>
  )
}

export default App
