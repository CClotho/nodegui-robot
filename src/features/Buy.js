const robot = require('robotjs');
let dissemble = false;
let toggle = false; 
let startPurchasingItem;
CONSTANTS = {
    MAX_COLUMN: 6,
    MAX_ITEMS: 30,
    MAX_QUANTITY: 999 | "999",
    ITEM_CATEGORY: "MATERIAL" | "ITEM"
}

/**
 * @typedef {Object} MousePos Mouse coordinates
 * @property {number} MousePos.x  Mouse x-axis coordinate
 * @property {number} MousePos.y  Mouse y-axis coordinate
 */


/**
 * Auto Buy an item/mat while specifying the quantity and total number of the item/mat.
 * @function
 * @param {IGlobalKeyEvent} event - The key event that was emitted. It contains information about the key event (e.g., key code, key name, etc.).
 * @param {MousePos} itemPos - Position of the item/mat on the screen.(required)
 * @param {MousePos} confirmBtnPos - Position of the confirm button on the screen. (required)
 * @param {MousePos} tradeBtnPos - Position of the trade button on the screen. (required)
 * @param {string} itemCategory - The category of the item to buy. "MATERIAL" / "ITEM" (required)
 * @param {string} [quantity] - Quantity of the item/mat to purchase. (optional)
 * @param {number} total - Total number of items/mats available. (required)
 * 
 * @remarks 
 * - Press 1 To Start The Action
 * - Make sure the quantity is not over 1000 
 * - Make sure the total of the items is not over 30
 * - If the item category is ITEM skip quantity
 */
// autoPurchaseItemFromNpc

function autoPurchaseItem(event, itemPos, confirmBtnPos, tradeBtnPos, itemCategory, total, quantity) {
 
    
    // itemPos  { x: 1139, y: 465, color: '#d5e8f7' }
    // handle empty parameters
    
    //console.log("Auto Purchase is on action", toggle);
    
    if(event.name === "F" && event.state === "DOWN") {
        let currentIndex = 0;
        
       
        toggle = !toggle; // from false to true
        if(toggle) {
          
            startPurchasingItem = setInterval(() => {
            robot.setMouseDelay(0)
            // can add this option to automatically stop whenever it hit 30 already
            //
            console.log("Auto Purchase : current index", currentIndex);
            console.log("Auto Purchase : toggle is inside IFs", toggle);

            if(currentIndex > 0 && currentIndex % 10 === 0) {
                robot.moveMouse(confirmBtnPos.x, confirmBtnPos.y);
                robot.mouseClick()
                robot.moveMouse(tradeBtnPos.x, tradeBtnPos.y);
                robot.mouseClick();
                console.log(`Bought the items!`);
            }
             
            if(itemCategory === "MATERIAL" && quantity > 0) {
                robot.moveMouse(itemPos.x,itemPos.y); 
                robot.mouseToggle("down", "right");
                robot.typeString(quantity)// "999"
                robot.keyTap("enter")
                robot.mouseToggle("up", "right");
               // currentIndex++;
               
            }
            else {
                robot.moveMouse(itemPos.x, itemPos.y);
                robot.mouseToggle("down", "right");
                robot.mouseToggle("up", "right");
                //currentIndex++;
            }

            // Put this condition on the last so it will all first check and process those conditions above 
            // might removed this if the user stated Looping : true;
            if(currentIndex ===total  ) {
                clearInterval(startPurchasingItem);
                startPurchasingItem = null
                toggle = false; // from true to false;
                currentIndex = 0;
            }

            currentIndex++;
            }, 100)
        }

         
    }
    else if(toggle !== true) {
        clearInterval(startPurchasingItem);
        startPurchasingItem = null; // clear the reference of the interval function
    }



}


module.exports = autoPurchaseItem;

/* 
METHOD 1::
Get the position of the item to buy {x, y}
toggle() right clicks
Get the position of confirm button {x,y}
Get the position of trade button {x,y}
repeat 30x ONLY this is for SOLO BUYING ALONE
THERE IS AN OPTION TO SPECIFY HOW MANY TIMES WE WILL BUY THE ITEM  "ITEM " 
THERE IS AN OPTION TO SPECIFY HOW MANY MATS AND HOW MANY TIMES WE WILL BUY THE MATS\


positionOfItemToBuy: object {x, y}
positionOfConfirmBtn :object {x, y}
positionOfTradeBtn: object {x, y}
categoryOfTheItem : string (e.g., "MAT", "ITEM") // click option via button
IF ITEM YOU CAN SPECIFY HOW MANY TIMES YOU WILL BUY THE ITEM (e.g., 5 THEN BUY THE ITEMS 5)
IF MAT YOU CAN SPECIFY THE QUANTITY AND HOW MANY TIMES YOU WILL BUY THE MAT  (e.g., 500, 30 BUY 500PCS OF THAT 15x)
THEN ENTER 
E.G Buy(positionOfItemToBuy, categoryOfTheItem, positionOfConfirmBtn, positionOfTradeBtn, quantity, totalToBuy);

BUY => BuyTab.show();
// Position of Item to buy [input] [input]
// Position of Confirm Btn [input] [input]
// position of TradeBtn    [input]  [input]
// category of item Button: MAT / Button: ITEM
if ITEM render button total of items to buy
if MAT render 2 button quantity and totalOfMaterials to buy

then click Begin [button] // only start the listener for this once clicked e.g if(event.name ==="a")
// under the begin button checks if buyAutomation variable is false else execute else remove event listener
// if(the inputs are not empty) run the script otherwise don't
// so save first 
// then clik star tto start the events

// I THINK JUST NEED 1 GLOBAL EVENT to pause for all
FUTURE ADDONS / FEATURES
CAN BUY MULTIPLE MATS and ITEM (e.g., CHECK IF ITEM2 HAS coordinates THEN MOVE OTHERWISE do nothing)
try pause on the current Index then resume the computation base on the index

METHOD:: 2
MORE DIRECT

Get the position of the item to buy {x,y}
get the position of the inventory {x,y}
drag items from the npc tab to the inventory {x,y}
If MATS  you have to specify the quantity then enter 
*/



/* D/A AUTOMATION WILL COMBINED BUYING OF THE ITEMS THEN DISASSEMBLING  PART REPEAT*/


/* 
 GLOBALLY PAUSE
 get all the variables for toggling pause on each operations
            pauseBuy
            pauseSell
            pause
 
    and under each operation e.g buyTab  if(pause) // true {remove Listener else add listener}
*/
