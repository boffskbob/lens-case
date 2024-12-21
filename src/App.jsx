import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

const DIAMETER = 50;


function App() {
  const [items, setItems] = useState([]);
  const [count, setCount] = useState(0);

  const handleClick = (e) => {
    console.log("ran handle click");
    const sandbox = document.getElementById("sandbox").getBoundingClientRect();
    const x = e.clientX - sandbox.left - DIAMETER / 2; // Offset for the item size
    const y = e.clientY - sandbox.top - DIAMETER / 2;

    // Add a new draggable item
    setCount(count + 1);
    setItems([...items, { id: count, x, y }]);
  }

  const handleDrag = (e) => {
    const item = e.target;
    console.log(e.id);
  }

  return (
    <>
      <div id='sandbox' onClick={handleClick}>
      {items.map((item) => (
        <div
          className='lens'
          key={item.id}
          style={{ left: item.x, top: item.y }}
          draggable
          onDrag={(e) => handleDrag(e, item.id)}
        ></div>
      ))}
      </div>
    </>
  )
}

export default App
