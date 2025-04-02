const robot = require('robotjs')
const MODE = {CRAFTING_MODE: false, SELLING_MODE: false, REFILLING_MODE: false}
/* 
let startCraft;
let currentCraftedItems = 29; // FOR DEBUG SO I MADE IT 29
let totalCraftedItems = 0;

let totalCurrentMatIndex = 0;
let currentMatIndex = 0;
let initialSetup = true; // THIS WILL JUST RUN ONCE */


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
    TotalItemsToCraft,
    getSellTab
)  {
    let startCrafting = false;
    let itemPosX = ItemPos.x;
    let itemPosY = ItemPos.y;

    function getItemPosX() {
        return itemPosX
    }

    function getItemPosY() {
        return itemPosY
    }

    // let materialPos = {x: craftMaterialPos.x, y: craftMaterialPos.y}
    if(event.name === "3" || event.vKey === 51 && event.state === "DOWN") {
        let materialPos = {x: craftMaterialPos.x, y: craftMaterialPos.y}
        startCrafting = !startCrafting
        let soldItems = 0;

        let startCraft;
        let currentCraftedItems = 99; // FOR DEBUG SO I MADE IT 29
        let totalCraftedItems = 0;

        let totalCurrentMatIndex = 0;
        let currentMatIndex = 0;
        let initialSetup = true; // THIS WILL JUST RUN ONCE

        if(startCrafting) {
            // calling this function for every second
            startCraft = setInterval(() => {

            if(initialSetup) {

                robot.moveMouse(MaterialBtnPos.x, MaterialBtnPos.y)
                robot.mouseClick();
                //Additng the first material
                robot.moveMouse(materialPos.x, materialPos.y)
                robot.mouseToggle("down", "left")
                robot.moveMouse(craftingTablePos.x, craftingTablePos.y)
                robot.mouseToggle("up", "left")
                materialPos.x +=45
                // Adding the second material
                robot.moveMouse(materialPos.x, materialPos.y)
                robot.mouseToggle("down", "left")
                robot.moveMouse(craftingTablePos2.x, craftingTablePos2.y)
                robot.mouseToggle("up", "left")
                robot.moveMouse(equipBtnPos.x, equipBtnPos.y)
                robot.mouseClick();
                robot.moveMouse(AmountBtnPos.x, AmountBtnPos.y)
                robot.mouseClick();
                robot.typeString(quantity.toString()) // "999"
                robot.keyTap("enter")
                robot.mouseClick()
                robot.moveMouse(BeginBtnPos.x, BeginBtnPos.y)
                robot.mouseClick();
                robot.keyTap("enter")


                currentMatIndex++;
                initialSetup = false
                MODE.CRAFTING_MODE = true
                console.log("Switching to crafting mode...")

            }
            

            if(totalCraftedItems < TotalItemsToCraft) {
      
                if(MODE.CRAFTING_MODE) {
                    //delayUsingPerformanceNow(2250)
                delayUsingPerformanceNow(50)
                robot.keyTap("enter")
                robot.moveMouse(SuccessBtnPos.x, SuccessBtnPos.y)
                robot.mouseClick()
                
            

                if (currentCraftedItems === 30) {
                    MODE.SELLING_MODE = true;
                    MODE.CRAFTING_MODE = false;
                    console.log("Switching to selling mode...");
                    robot.moveMouse(equipBtnPos.x, equipBtnPos.y);
                    robot.mouseClick();
                    return
                    
                }

                if (totalCraftedItems === 99) {
                    MODE.REFILLING_MODE = true;
                    MODE.CRAFTING_MODE = false;
                    console.log("Switching to refilling mode...");
                    return

                }
                    totalCraftedItems++
                    currentCraftedItems++
                    console.log(`Current crafted items and total crafted items: ${currentCraftedItems} ${totalCraftedItems}`)
                }
                else if (MODE.SELLING_MODE) {

                    console.log("MODE SELLING MODE", MODE.SELLING_MODE)
  
                    if (MODE.SELLING_MODE && soldItems > 0 && (soldItems % 6 === 0)) {

                        console.log(" MET CONDITION - Resetting Row ");
                        itemPosX = ItemPos.x;  
                        itemPosY += 45; 
                    }
                    
                    // Handle confirm/trade every 10 sold items
                    if (soldItems > 0 && soldItems % 10 === 0) {
                        robot.moveMouse(ConfirmBtnPos.x, ConfirmBtnPos.y);
                        robot.mouseClick();
                        robot.moveMouse(TradeBtnPos.x, TradeBtnPos.y);
                        robot.mouseClick();
                    }
                    
                    // When all 30 items are sold, reset and switch mode
                    if (soldItems === 30) {
                        currentCraftedItems = 0;
                        soldItems = 0;
                        itemPosX = ItemPos.x;
                        itemPosY = ItemPos.y;
                        MODE.SELLING_MODE = false;
                        MODE.CRAFTING_MODE = true;
                        console.log("Selling complete. Resuming crafting...");
                        robot.moveMouse(BeginBtnPos.x, BeginBtnPos.y);
                        robot.mouseClick();
                        
                    }
                                   
                    robot.setMouseDelay(0.1)
                    robot.moveMouse(getItemPosX(), getItemPosY());
                    robot.mouseToggle("down", "left");
                    robot.moveMouse(getSellTab.x, getSellTab.y);
                    robot.mouseToggle("up", "left");
                    delayUsingPerformanceNow(500);
                           
                    ++soldItems;
                    itemPosX += 45; 
                    console.log('This is called by getter ( the value of the var when it was called) ', getItemPosX(), getItemPosY())
                    console.log("This is the variable after +45", itemPosX)
                    console.log(`Sold items: ${soldItems}`);
                    console.log(`Moving to new row at Y: ${itemPosY} and column at X: ${itemPosX}`);     



                }

                else if(MODE.REFILLING_MODE && totalCraftedItems == 99) {
                
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
    
    
    
                    robot.moveMouse(MaterialBtnPos.x, MaterialBtnPos.y)
                    robot.mouseClick();
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
                    currentCraftedItems = 0
                    if(MODE.CRAFTING_MODE) {
                        console.log("Already in crafting mode...")
                    }
                    else {
                        MODE.CRAFTING_MODE = true
                    }
                    
                    MODE.REFILLING_MODE = false
                    console.log("Switching to crafting mode...")
    
                    
                }
                    
            }
           
            }, 200);
        }
        else{
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