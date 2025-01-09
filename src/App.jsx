import { useState, createContext } from 'react';
import { Box, Button, Stack, TextField } from '@mui/material';
import './App.css';
import SaveButton from './SaveButton.jsx';
import LensCase from './LensCase.jsx';

const DEFAULT_DIAMETER = 50;

// TODO : create a width/height context
export const ItemsContext = createContext([]);

function App() {
  const [items, setItems] = useState([]); // removable
  const [count, setCount] = useState(0);
  const [selected, setSelected] = useState(null); // id of the item
  const [textValue, setTextValue] = useState("");

  const handleClick = (e) => {
    const sandbox = document.getElementById("sandbox");
    if (e.target.className == 'lens'){
      // handle select item
      console.log("clicked item");
      setSelected(e.target.id);
      setTextValue(e.target.style.width.substring(0, e.target.style.width.length - 2) / 2)
    }
  }

  function addLens(){
    const lensBoxBounds = document.getElementById("case").getBoundingClientRect();
    const x = (lensBoxBounds.right - lensBoxBounds.left - DEFAULT_DIAMETER / 2) / 2;
    const y = (lensBoxBounds.bottom - lensBoxBounds.top - DEFAULT_DIAMETER / 2) / 2;

    // Add a new item in the center
    setCount(count + 1);
    setItems([...items, { id: count, x, y }]);
  }

  const updateRadius = (radius, id) => {
    var item = document.getElementById(id);
    item.style.width = String(radius * 2) + 'px';
    item.style.height = String(radius * 2) + 'px';
  }


  const handleTextChange = (e) => {
    setTextValue(e.target.value);

    // adjust if its a valid number
    if (/^\d+$/.test(e.target.value)){
      updateRadius(parseInt(e.target.value), selected);
    }
  }

  return (
    <div id='container'>
      <Box id='sandbox' onClick={handleClick}>
        <ItemsContext.Provider value={items}>
          <LensCase />
        </ItemsContext.Provider>
      </Box>
      <div id='selection-container'>
        <div id="selections">{selected != null ? 
          <Stack direction="row" spacing={2}><Box className='textFormat' margin={2}>Radius</Box> {/^\d+$/.test(textValue) ? <TextField label="Enter Text"
          variant="outlined"
          value={textValue} // Controlled input
          onChange={handleTextChange} // Update state on input change
          fullWidth/> : <TextField error onChange={handleTextChange} margin="normal" helperText="Please input numbers only"/>}</Stack> : <Box className='textFormat'>No Item Selected</Box>
          }</div>
        
        <Button onClick={addLens}>Add Item</Button>
        <SaveButton />
      </div>
    </div>
  )
}

export default App
