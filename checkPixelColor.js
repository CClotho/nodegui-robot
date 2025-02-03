const robot = require('robotjs');
const { GlobalKeyboardListener, } = require("node-global-key-listener");
const mouseEvents = require("global-mouse-events");

/* 
const listener = new GlobalKeyboardListener();
let pause = false;
let k = false;

 
const mouseFn =mouseEvents.on("mouseup", event => {
    
    console.log("Global mouse event", event)
    
    
    const mouse = robot.getMousePos();
    const hex = robot.getPixelColor(mouse.x, mouse.y);
    console.log("#" + hex + " at x:" + mouse.x + " y:" + mouse.y);
     
   
  
}); 


const Keyboard = listener.addListener((event ) => {
    // instead hardcode values get position for the 30 slots in the inventory
    // and ending position
   console.log("Global mouse event", event)
    if(event.name === 'A' && event.state === 'DOWN') {
        console.log(`Key: ${event.name}, State: ${event.state}`);
        const move = robot.moveMouse(1157, 519);
         robot.mouseToggle("down", "left"); // Hold down the left mouse button 
        const dragItemOutside = robot.dragMouse(1003, 519);
        robot.mouseToggle("up", "left"); // Release the left mouse button
        robot.keyTap('1')
        robot.keyTap("enter");
        robot.keyTap("enter"); 
        // Add delay for crafting 

  
    }


})
 */
function move(x, y) {

    if(x ,y) // is empty dont run
   if(x && y) {
    robot.moveMouse(x,y);
   }
   else {
    return;
   }
}

module.exports = {

    move
}