import { Button, listItemClasses } from "@mui/material";
import { SVG } from '@svgdotjs/svg.js';


function SaveButton(){
    const default_width = 93; // mm
    const default_length = 68; // mm
    var savedItem = null;

    const saveSVG = () => {
        // create an overarching svg
        if (savedItem == null){
            var savedItem = SVG().addTo('body').size(300, 130)

            var rect = savedItem.circle(100).fill('#f06').move(20, 20)
        }
        const items = document.getElementsByClassName('lens');
        
        const sandboxBounds = document.getElementById("sandbox").getBoundingClientRect();
        console.log("sandbox bounds", sandboxBounds.left, sandboxBounds.top);

        for (var i = 0; i < items.length; i ++){
            const temp = items[i];
            console.log(temp.style.width);
            console.log(temp.style.left, temp.style.top)
        }
    }

    const addItem = () => {
        savedItem.circle(100).attr({ fill: '#f06' });
    }
    const printSVG = () => {
        console.log(savedItem);
    }

    return (<>
    <Button onClick={saveSVG}>save</Button>
    </>
    )
}

export default SaveButton;