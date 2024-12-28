import { useState } from 'react';
import { Box, Button, Stack, TextField } from '@mui/material';
import './App.css';

const DEFAULT_DIAMETER = 50;



function App() {
  const [items, setItems] = useState([]); // removable
  const [count, setCount] = useState(0);
  const [selected, setSelected] = useState(null); // id of the item
  const [textValue, setTextValue] = useState("");


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
    if (e.target.className == 'lens'){
      // handle select item
      console.log("clicked item");
      setSelected(e.target.id);
      setTextValue(e.target.style.width.substring(0, e.target.style.width.length - 2) / 2)
      updateRadius(100, e.target.id);
    }
    // clicked on sandbox
    else{
      addItem(e.clientX, e.clientY);
      setSelected(null);
    }
  }

  const updateRadius = (radius, id) => {
    var item = document.getElementById(id);
    item.style.width = String(radius) + 'px';
    item.style.height = String(radius) + 'px';
  }

  const handleDrag = (e, id) => {
    console.log("start drag");
    e.dataTransfer.setData("item-id", id);
  }

  const handleDrop = (e) => {
    console.log("start drop");
    const itemId = e.dataTransfer.getData("item-id");
    const item = document.getElementById(itemId);

    const prevWidth = item.style.width;
    const prevHeight = item.style.height;
    const diameter = prevWidth.substring(0, prevWidth.length - 2);
    console.log(prevHeight, prevWidth)
    
    const sandbox = document.getElementById("sandbox").getBoundingClientRect();
    const x = e.clientX - sandbox.left - diameter / 2; 
    const y = e.clientY - sandbox.top - diameter / 2;
    console.log

    item.setAttribute("style", "left: " + String(x) + "px; top: " + String(y) + "px; height: " + prevHeight + "; width: " + prevWidth + ";");
    console.log(e.clientX, e.clientY);
  }
  
  const handleDragOver = (e) => {
    e.preventDefault();
  }

  const handleTextChange = (e) => {
    setTextValue(e.target.value);
    console.log(textValue);

    // adjust selected - error when text isn't numbers
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
          style={{ left: item.x, top: item.y, height: DEFAULT_DIAMETER + "px", width: DEFAULT_DIAMETER + "px"}}
          draggable
          onDragStart={(e) => handleDrag(e, item.id)}
        ></div>
      ))}
      </div>
      <div id='selection-container'>
        <div id="selections">{selected != null ? 
          <Stack direction="row" spacing={2}><Box className='textFormat'>Radius</Box> {/^\d+$/.test(textValue) ? <TextField label="Enter Text"
          variant="outlined"
          value={textValue} // Controlled input
          onChange={handleTextChange} // Update state on input change
          // default value is the size of the selected item
          fullWidth/> : <TextField error onChange={handleTextChange} margin="normal" helperText="Please input numbers only"/>}</Stack> : <Box className='textFormat'>No Item Selected</Box>
          }</div>
        <Button>save</Button>
      </div>
    </div>
  )
}

export default App
