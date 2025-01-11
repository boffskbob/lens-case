import { useState, createContext } from 'react';
import { Box, Button, Grid, Grid2, Stack, TextField } from '@mui/material';
import './App.css';
import SaveButton from './SaveButton.jsx';
import LensCase from './LensCase.jsx';

const DEFAULT_DIAMETER = 50;
const DEFAULT_BOX_HEIGHT = 2;
const DEFAULT_BOX_WIDTH = 6;
const DEFAULT_BOX_LENGTH = 4;

// TODO : create a width/height context
export const ItemsContext = createContext([]);

function App() {
  const [items, setItems] = useState([]); // removable
  const [count, setCount] = useState(0);
  const [selected, setSelected] = useState(null); // id of the item
  const [textValue, setTextValue] = useState("");
  const [boxHeight, setBoxHeight] = useState(DEFAULT_BOX_HEIGHT);
  const [boxWidth, setBoxWidth] = useState(DEFAULT_BOX_WIDTH);
  const [boxLength, setBoxLength] = useState(DEFAULT_BOX_LENGTH);

  const handleClick = (e) => {
    const sandbox = document.getElementById("sandbox");
    if (e.target.className == 'lens'){
      // handle select item
      console.log("clicked item");
      setSelected(e.target.id);
      setTextValue(e.target.style.width.substring(0, e.target.style.width.length - 2) / 2)
    }
    else{
      setSelected(null);
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

  const handleBoxHeightText = (e) => {
    setBoxHeight(e.target.value);
  }

  const handleBoxWidthText = (e) => {
    setBoxWidth(e.target.value);
    // update display if valid number
  }

  const handleBoxLengthText = (e) => {
    setBoxLength(e.target.value);
    // update display if valid number
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
          // selected item
          <Stack direction="row" spacing={2}><Box className='textFormat' margin={2}>Radius</Box> {/^\d+$/.test(textValue) || /^\d+\.?\d*$/.test(textValue) ? 
          
          // valid input
          <TextField label="Enter Text"
          variant="outlined"
          value={textValue} // Controlled input
          onChange={handleTextChange} // Update state on input change
          fullWidth/> : 
          
          // invalid input
          <TextField error onChange={handleTextChange} margin="normal" helperText="Please input numbers only"/>}</Stack> :

          // no selected item
          <Grid2 container spacing={1}>
            <Grid2 size={12} className='textFormat'>Lens Case Dimensions</Grid2>
            {/* <Box className='textFormat'>Lens Case Dimensions</Box> */}

            <Grid2 size={4} className='textField'><Box className='textFormat'>Length</Box></Grid2>
            <Grid2 size={7}>{/^\d+$/.test(boxLength) || /^\d+\.?\d*$/.test(boxLength) ? <TextField variant='outlined' value={boxLength} onChange={handleBoxLengthText}
            /> : <TextField error helperText="Please input numbers only" value={boxLength} onChange={handleBoxLengthText}/>}</Grid2>

            <Grid2 size={4} className='textField'><Box className='textFormat'>Width</Box></Grid2>
            <Grid2 size={7}>{/^\d+$/.test(boxWidth) || /^\d+\.?\d*$/.test(boxWidth) ? <TextField variant='outlined' value={boxWidth} onChange={handleBoxWidthText}
            /> : <TextField error helperText="Please input numbers only" value={boxWidth} onChange={handleBoxWidthText}/>}</Grid2>

            <Grid2 size={4} className='textField'><Box className='textFormat'>Height</Box></Grid2>
            <Grid2 size={7}>{/^\d+$/.test(boxHeight) || /^\d+\.?\d*$/.test(boxHeight) ? <TextField variant='outlined' value={boxHeight} onChange={handleBoxHeightText}
            /> : <TextField error helperText="Please input numbers only" value={boxHeight} onChange={handleBoxHeightText}/>}</Grid2>
          </Grid2>
          }</div>
        
        <Button onClick={addLens}>Add Item</Button>
        <SaveButton />
      </div>
    </div>
  )
}

export default App
