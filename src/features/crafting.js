const robot = require('robotjs')
const MODE = {CRAFTING_MODE: false, SELLING_MODE: false, REFILLING_MODE: false}

function delayUsingPerformanceNow(milliseconds) {
    const start = performance.now();
    while (performance.now() - start < milliseconds) {
        // Busy-wait loop
    }
}


function CraftingBot(
    event,
    craftMaterialPos,
    craftingTablePos,
    craftingTablePos2,
    AmountBtnPos,
    quantity,
    BeginBtnPos,
    SuccessBtnPos,
    ItemPos,
    ConfirmBtnPos,
    TradeBtnPos,
    MaterialBtnPos,
    equipBtnPos,
    TotalItemsToCraft
)  {
    let startCrafting = false;
    let startCraft;
    let currentCraftedItems = 0;
    let totalCraftedItems = 0;
    let soldItems = 0;
    let totalCurrentMatIndex = 0;
    let currentMatIndex = 0;
    let initialSetup = true; // THIS WILL JUST RUN ONCE

     let materialPos = {x: craftMaterialPos.x, y: craftMaterialPos.y}
    if(event.name === "3" || event.vKey === 51 && event.state === "DOWN") {
        startCrafting = !startCrafting

        if(startCrafting) {
            // calling this function for every second
            startCraft = setInterval(() => {
            if(MODE.REFILLING_MODE && totalCraftedItems >= 0 && totalCraftedItems == 99 || initialSetup) {
                
                MODE.CRAFTING_MODE = false
                MODE.SELLING_MODE = false

                console.log("Switching to refilling mode...")

                if(currentMatIndex > 0 && currentMatIndex % 6 === 0  ) { 
                    
                    materialPos.x = craftMaterialPos.x
                    materialPos.y+=45  
                    totalCurrentMatIndex = currentMatIndex
                    currentMatIndex = 0
                }

                if(totalCurrentMatIndex == 30 ) { 
                    
                   clearInterval(startCraft)
                   startCrafting = false
                }



                robot.moveMouse(MaterialBtnPos.x, MaterialBtnPos)
                //Additng the first material
                robot.moveMouse(materialPos.x, materialPos.y)
                robot.mouseToggle("down", "left")
                robot.moveMouse(craftingTablePos.x, craftingTablePos.y)
                robot.mouseToggle("up", "left")
                robot.typeString(quantity) // "999"
                materialPos.x +=45
                // Adding the second material
                robot.moveMouse(materialPos.x, materialPos.y)
                robot.mouseToggle("down", "left")
                robot.moveMouse(craftingTablePos2.x, craftingTablePos2.y)
                robot.mouseToggle("up", "left")
                if(initialSetup) {
                    robot.moveMouse(AmountBtnPos.x, AmountBtnPos.y)
                    robot.typeString(quantity) // "999"
                    robot.moveMouse(equipBtnPos.x, equipBtnPos.y)
                    robot.mouseClick();
                }
                
                robot.moveMouse(equipBtnPos.x, equipBtnPos.y)
                robot.mouseClick();
                robot.moveMouse(BeginBtnPos.x, BeginBtnPos.y)
                robot.mouseClick();
                robot.keyTap("enter")
                robot.mouseClick()
               
                
                robot.mouseClick()
            
                if(totalCraftedItems == 99) {
                    totalCraftedItems = 0;
                }

                // move the position of the 2 materials from the inventory +45px
               
                currentMatIndex++;
               
                initialSetup = false
                MODE.CRAFTING_MODE = true
                MODE.REFILLING_MODE = false

                
            }

            // if MODE is CRAFTING and TOTALCRAFITEMS IS LESS THAN TOTALITEMSTOCRAFT
            // INITIALLY REFILL THE MATERIALS
            if(MODE.CRAFTING_MODE && totalCraftedItems < TotalItemsToCraft) {
               // SET A DELAY FOR FINISHING CRAFTING AND INCREMENT THE CURRENT CRAFTED ITEMS BY 1 AND TOTAL CRAFTED ITEMS BY 1
             /*    if(currentCraftedItems == 0 ) {
                    robot.moveMouse(BeginBtnPos.x, BeginBtnPos.y)
                    robot.mouseClick()
                    robot.keyTap("enter")
                } */

                if(currentCraftedItems > 0 && currentCraftedItems % 6 === 0) {

                }

                if(currentCraftedItems > 0 && currentCraftedItems % 30 === 0) {
                    MODE.SELLING_MODE = true
                }

                if(currentCraftedItems > 0 && currentCraftedItems % 99 === 0) {
                    MODE.REFILLING_MODE = true
                }
               
               
            
                //robot.moveMouse(BeginBtnPos.x, BeginBtnPos.y)
                delayUsingPerformanceNow(2250)
                robot.keyTap("enter")
                robot.moveMouse(SuccessBtnPos.x, SuccessBtnPos.y)
                robot.mouseClick()
                

                totalCraftedItems++
                currentCraftedItems++
                console.log(`Current crafted items and total crafted items: ${currentCraftedItems} ${totalCraftedItems}`)
            }

            if(MODE.SELLING_MODE && currentCraftedItems == 30) {
                robot.moveMouse(equipBtnPos.x, equipBtnPos.y)
                robot.mouseClick()
                if(soldItems > 0 && soldItems% 6 === 0) {
                    itemPosX = ItemPos.x;
                    itemPosY += 45;
                }

                if(soldItems > 0 && soldItems % 30 === 0) {


                    // RESET BACK TO THE FIRST ITEM POSITION
                    itemPosX = ItemPos.x;
                    itemPosY = itemPos.y
                    MODE.SELLING_MODE = false
                    MODE.CRAFTING_MODE = true
                    currentCraftedItems = 0;
                    soldItems = 0;
                }

                robot.moveMouse(ItemPos.x, ItemPos.y)
                robot.mouseToggle("down", "right")
                robot.moveMouse(ConfirmBtnPos.x, ConfirmBtnPos.y);
                robot.mouseClick();
                robot.moveMouse(TradeBtnPos.x, TradeBtnPos.y);
                robot.mouseClick();
                soldItems++;

            }
         
           
            }, 100);
        }
        else if(startCrafting == false){
            clearInterval(startCraft)
            console.log("Stopping crafting...")
            startCrafting = false
            MODE.CRAFTING_MODE = false
            MODE.SELLING_MODE = false
            MODE.REFILLING_MODE = false
            initialSetup = true
        }
    }
}

module.exports = {
    CraftingBot,
}