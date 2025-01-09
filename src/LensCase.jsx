import { useState, useContext } from 'react';
import { ItemsContext } from './App';
import { Box } from '@mui/material';

const DEFAULT_DIAMETER = 50;


// component that determines the width and length of the box
function LensCase() {
    // the larger of the two bounds should be set to the width, and will not take up more than 80% of the sandbox's width.
    const [width, setWidth] = useState(0);
    const [length, setLength] = useState(0);
    const items = useContext(ItemsContext);

    const handleClick = (e) => {
        if (e.target.className == 'lens'){

        }
    }
    
    const handleDrag = (e, id) => {
        console.log("start drag");
        console.log(e.clientX, e.clientY);
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
        
        const lensBoxBounds = document.getElementById("case").getBoundingClientRect();
        let x = e.clientX - lensBoxBounds.left - diameter / 2; 
        let y = e.clientY - lensBoxBounds.top - diameter / 2;
        console.log(lensBoxBounds.left);
        console.log(x);
        // TODO : add margin of error maybe
        if (x > lensBoxBounds.right - lensBoxBounds.left - diameter) {
            console.log()
            x = lensBoxBounds.right - lensBoxBounds.left - diameter;
        }
        else if (x < 0){
            x = 0;
        }
        
        if (y > lensBoxBounds.bottom - lensBoxBounds.top - diameter) {
            y = lensBoxBounds.bottom - lensBoxBounds.top - diameter;
        }
        else if (y < 0){
            y = 0;
        }

        item.setAttribute("style", "left: " + String(x) + "px; top: " + String(y) + "px; height: " + prevHeight + "; width: " + prevWidth + ";");
        console.log(e.clientX, e.clientY);
    }
    
    const handleDragOver = (e) => {
        e.preventDefault();
    }

    return (<>
    <Box id='case' onClick={handleClick} onDrop={handleDrop} onDragOver={handleDragOver}>
        {items.map((item) => (
            <div
            className='lens'
            id={item.id}
            key={item.id}
            style={{ left: item.x, top: item.y, height: DEFAULT_DIAMETER + "px", width: DEFAULT_DIAMETER + "px"}}
            draggable
            onDragStart={(e) => handleDrag(e, item.id)} 
            />
        ))}
    </Box>
      </>)
}

export default LensCase;