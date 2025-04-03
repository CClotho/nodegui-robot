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
    if(event.name === "3" && event.state === "DOWN") {
        let materialPos = {x: craftMaterialPos.x, y: craftMaterialPos.y}
        startCrafting = !startCrafting
        let soldItems = 0;

        let startCraft;
        let currentCraftedItems = 0; // FOR DEBUG SO I MADE IT 29
        let totalCraftedItems = 0; // change later

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
            

            if(TotalItemsToCraft < 999) {
      
                if(MODE.CRAFTING_MODE) {
                    //delayUsingPerformanceNow(2250)
         
                robot.keyTap("enter")
                robot.moveMouse(SuccessBtnPos.x, SuccessBtnPos.y)
                robot.mouseClick()
                
  
                

                if (currentCraftedItems === 30 ) {
                    robot.keyTap('enter')
                    console.log("Switching to selling mode...");
                    robot.moveMouse(equipBtnPos.x, equipBtnPos.y);
                    robot.mouseClick();
                    MODE.SELLING_MODE = true;
                    MODE.CRAFTING_MODE = false;
                    }

                     
                if (totalCraftedItems === 99) {
                   
                    console.log("Switching to refilling mode...");
                    delayUsingPerformanceNow(5000)
                    MODE.REFILLING_MODE = true;
                    MODE.CRAFTING_MODE = false;
                    

                } 
                    delayUsingPerformanceNow(1325)
                    if(totalCraftedItems < 99) {
                        ++totalCraftedItems
                    }
                    if(currentCraftedItems < 30) {
                        ++currentCraftedItems

                    }
                 
                  
                    --TotalItemsToCraft
                    console.log(`Current crafted items : ${currentCraftedItems}, Total Crafted Items: ${totalCraftedItems}, and Total Items To Craft: ${TotalItemsToCraft}`)
                }
                else if (MODE.SELLING_MODE) {

                    console.log("MODE SELLING MODE", MODE.SELLING_MODE)
  
                    if (soldItems > 0 && soldItems % 6 === 0) {

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

                    if(soldItems === 30 && totalCraftedItems === 99) {
                        soldItems = 0;
                        itemPosX = ItemPos.x;
                        itemPosY = ItemPos.y;
                        console.log("Selling complete. Resuming crafting...");
                        robot.moveMouse(BeginBtnPos.x, BeginBtnPos.y);
                        robot.mouseClick();
                        MODE.SELLING_MODE = false;
                        MODE.CRAFTING_MODE = true;
                    }
                    
                    // When all 30 items are sold, reset and switch mode
                    if (soldItems === 30) {
                        currentCraftedItems = 0;
                        soldItems = 0;
                        itemPosX = ItemPos.x;
                        itemPosY = ItemPos.y;
                        console.log("Selling complete. Resuming crafting...");
                        robot.moveMouse(BeginBtnPos.x, BeginBtnPos.y);
                        robot.mouseClick();
                        MODE.SELLING_MODE = false;
                        MODE.CRAFTING_MODE = true;
                        
                    }
                                   
                    //robot.setMouseDelay(0.1)
                    robot.moveMouse(getItemPosX(), getItemPosY());
                    robot.mouseToggle("down", "right");
                    robot.mouseToggle("up", "right");
                   
                           
                    if(soldItems < 30) {
                        ++soldItems;
                    }
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

                    if(currentMatIndex > 0 && currentMatIndex % 9 === 0  ) { 
                        
                        // ANIMAL TAIL FUR THEN NEXT IS 9x of WOOD
                        // EVERY 9th iteration add ANIMAL TAIL FUR
                        // FIX TOMORROW
                        materialPos.x +=45
                        robot.keyTap('enter')
                        robot.moveMouse(MaterialBtnPos.x, MaterialBtnPos.y)
                        robot.mouseClick();
                        //Additng the first material
                        robot.moveMouse(materialPos.x, materialPos.y)
                        robot.mouseToggle("down", "left")
                        robot.moveMouse(craftingTablePos.x, craftingTablePos.y)
                        robot.mouseToggle("up", "left")
                        robot.typeString(quantity) // "999"
                        robot.keyTap('enter')
                        
                        // Adding the second material
                        materialPos.x +=45
                        robot.moveMouse(materialPos.x, materialPos.y)
                        robot.mouseToggle("down", "left")
                        robot.moveMouse(craftingTablePos2.x, craftingTablePos2.y)
                        robot.mouseToggle("up", "left")
                        robot.typeString(quantity) // "999"
                        robot.keyTap('enter')
                        robot.moveMouse(equipBtnPos.x, equipBtnPos.y)
                        robot.mouseClick();
                        robot.moveMouse(BeginBtnPos.x, BeginBtnPos.y)
                        robot.mouseClick();
                        robot.keyTap("enter")
                        robot.mouseClick()
                    
                        totalCurrentMatIndex = currentMatIndex
                        currentMatIndex = 0
                    }
    
                    if(totalCurrentMatIndex == 30 ) { 
                        
                       clearInterval(startCraft)
                       startCrafting = false
                    }
    
                    materialPos.x +=45
                    robot.keyTap('enter')
                    robot.moveMouse(MaterialBtnPos.x, MaterialBtnPos.y)
                    robot.mouseClick();
                    //Additng the first material
                    robot.moveMouse(materialPos.x, materialPos.y)
                    robot.mouseToggle("down", "left")
                    robot.moveMouse(craftingTablePos.x, craftingTablePos.y)
                    robot.mouseToggle("up", "left")
                    robot.typeString(quantity) // "999"
                    robot.keyTap('enter')
                    robot.moveMouse(equipBtnPos.x, equipBtnPos.y)
                    robot.mouseClick();
                    robot.moveMouse(BeginBtnPos.x, BeginBtnPos.y)
                    robot.mouseClick();
                    robot.keyTap("enter")
                    robot.mouseClick()
    
                  
                     
                    
    
                    // move the position of the 2 materials from the inventory +45px
                    if(totalCraftedItems == 99) {
                        totalCraftedItems = 0;   
                    }

                    if(currentCraftedItems == 30) {
                        currentCraftedItems = 0
                    }
                    currentMatIndex++;
                    
                 
                  
                    MODE.REFILLING_MODE = false
                    MODE.CRAFTING_MODE = true;
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