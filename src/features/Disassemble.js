const {CONSTANTS} = require('./constants/constants');
const robot = require('robotjs');

let dissemble = false;
let D_A;
let Start_DA;
let startDisassembling = false;

// We could specify the total max Items or columns in the future
// for now fixed 30 and 6

function autoDisassembling(
    event,
    npcItemPos, 
    inventoryPos,
    DisassemblePos,
    confirmBtnPos,
    tradeBtnPos,
    beginBtnPos,
    successBtnPos,
    itemCategory,
    totalOfItems, 
    quantity, 
){
   let currentBoughtItems = 0;
   let currentItemsDisassembled = 0;
   let InventoryXPos = inventoryPos.x
   let InventoryYPos = inventoryPos.y
   let maxColumns =  CONSTANTS.MAX_COLUMN;



   if((event.name === "2" || event.vKey === 50) && event.state === "DOWN") {

        startDisassembling = !startDisassembling;

        if(startDisassembling) {
          
            Start_DA = setInterval(()=> {
                if(currentBoughtItems  <= totalOfItems && currentItemsDisassembled % 30 === 0) {
                    if(currentBoughtItems > 0 && currentBoughtItems % 10 === 0 ) {
                        robot.moveMouse(confirmBtnPos.x, confirmBtnPos.y);
                        robot.mouseClick()
                        robot.moveMouse(tradeBtnPos.x, tradeBtnPos.y);
                        robot.mouseClick();
                        console.log(`Bought the items!`);
                    }
                        
                    if(itemCategory === "MATERIAL" && quantity > 0) {
                        robot.moveMouse(npcItemPos.x,npcItemPos.y); 
                        robot.mouseToggle("down", "right");
                        robot.typeString(quantity)// "999"
                        robot.keyTap("enter")
                        robot.mouseToggle("up", "right");
                        //currentBoughtItems++;
                        
                    }
                    else {
                        robot.moveMouse(npcItemPos.x, npcItemPos.y);
                        robot.mouseToggle("down", "right");
                        robot.mouseToggle("up", "right");
                        // currentBoughtItems++;
                    }
                    currentBoughtItems++;
                } 
                
                if(currentBoughtItems > totalOfItems) {
                    if (currentItemsDisassembled < currentBoughtItems) {
                        // Disassemble items logic
                        if (
                          currentItemsDisassembled > 0 &&
                          currentItemsDisassembled % maxColumns === 0
                        ) {
                          console.log(`Reset row at index ${currentItemsDisassembled}`);
                          InventoryXPos = inventoryPos.x; // Reset X to initial position
                          InventoryYPos += 45; // Move Y down to the next row
                        }
            
                        robot.setMouseDelay(100);
                        robot.moveMouse(InventoryXPos, InventoryYPos);
                        console.log(
                          `Disassembling item at position: (${InventoryXPos}, ${InventoryYPos})`
                        );
                        robot.mouseToggle("down", "left");
                        robot.dragMouse(DisassemblePos.x, DisassemblePos.y);
                        robot.mouseToggle("up", "left");
            
                        robot.moveMouse(beginBtnPos.x, beginBtnPos.y);
                        robot.mouseClick("left");
            
                        delayUsingPerformanceNow(500);
                        robot.moveMouse(successBtnPos.x, successBtnPos.y);
                        robot.mouseClick("left");
                        robot.keyTap("enter");
            
                        InventoryXPos += 45;
                        currentItemsDisassembled++;
                      } else {
                        // Reset for the next cycle
                        console.log("Cycle complete. Resetting counters.");
                        currentBoughtItems = 0;
                        currentItemsDisassembled = 0;
                        InventoryXPos = inventoryPos.x;
                        InventoryYPos = inventoryPos.y;
                    }
                }
                
            },100)

        }else {
            clearInterval(Start_DA);
        }
   }
}




 function Disassembling(event, ItemPos) { // optional: total param

    
    if (event.name === "Y" && event.state === "DOWN") {
        console.log("Event is clicked on Y", event);
        
            dissemble = !dissemble;
            // const getItemPos = { x: 1406, y: 429 };  // get user input 
            // const getSellTabPos = { x: 1296, y: 429 };  // get user input 
            const maxColumns = 6; // Number of slots per row
            const maxItems = 30; // Total slots in inventory
            let currentIndex = 0; // Track the current item index
            let itemXPos =  ItemPos.x//getItemPos.x; 
            let itemYPos =  ItemPos.y//getItemPos.y;
            // DA {x:1309, y:374} begin button  {x:1287, y: 635}
            let DissPos = {x:1301, y:428};
            let beginPos =  {x:1287, y: 635};
            let total = 30; // for now this is hardcoded eventually 
            if (dissemble) {
                console.log("Start D/A");
        
                D_A = setInterval(() => {
                    
                    
                    // Perform reset logic for every 6th item
                    if (currentIndex > 0 && currentIndex % maxColumns === 0) {
                        console.log(`Reset row at index ${currentIndex}`);
                        itemXPos = ItemPos.x//getItemPos.x; // Reset X to initial position
                        itemYPos += 45;         // Move Y down to the next row
                    }

                    // Reset both X and Y after the 30th item
                    if (currentIndex === maxItems) {
                        console.log("Reset to initial position after last item");
                        itemXPos =  ItemPos.x//getItemPos.x;
                        itemYPos =  ItemPos.y//getItemPos.y;
                        currentIndex  = 0;
                    }


                    // Move mouse to the current item position
                  
                    robot.setMouseDelay(100);
                  
                    robot.moveMouse(itemXPos, itemYPos);
                    
                    console.log(`Moving to item position: (${itemXPos}, ${itemYPos})`);
                    robot.mouseToggle("down", "left");
                    robot.dragMouse(DissPos.x, DissPos.y);
                    robot.mouseToggle("up", "left");
                    //delay(1000);                   
                 
                    robot.moveMouse(beginPos.x, beginPos.y);
                    robot.mouseClick("left")
                    
                    delayUsingPerformanceNow(500);
                    robot.moveMouse(956,616);
                    robot.mouseClick("left");
                    robot.keyToggle("enter", 'down') //delay ranging 120-186ms
                    /* robot.keyToggle("enter", 'down');
                    robot.keyTap("enter"); */
                    

                  /*
                  robot.mouseClick("left");
                    robot.moveMouse(957,612); // success confirm
                    robot.mouseClick(); */
                    if(currentIndex ===total  ) {
                        clearInterval(Disassembling);
                        startPurchasingItem = null
                        toggle = false; // from true to false;
                        currentIndex = 0;
                    }
                
        
                    // Update X position for the next item
                    itemXPos += 45; // Increment X by 45 for the next slot
                    currentIndex++; // Move to the next item
                }, 200); // Adjust interval timing as needed
            } else if(dissemble !== true){
            console.log("Stop toggling mouse up and down");
            clearInterval(D_A) // handle the pause otherwise remove eventListener to stop listening
            
            }
        }
        

}
    
function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

//delayUsingPerformanceNow(2500); 
function delayUsingPerformanceNow(milliseconds) {
    const start = performance.now();
    while (performance.now() - start < milliseconds) {
        // Busy-wait loop
    }
}

module.exports ={
    autoDisassembling,
    Disassembling,
    delay, 
    delayUsingPerformanceNow
}