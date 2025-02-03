
const robot = require('robotjs');
const {windowManager} = require('node-window-manager');
let  Dis = require('./Disassemble');


function autoCraftLevelling3(
    event,
    MaterialPos,
    CraftTablePos,
    AmountBtnPos,
    quantity,
    BeginBtnPos,
    SuccessBtnPos,
    ItemPos,
    ConfirmBtnPos,
    TradeBtnPos,
    MaterialBtnPos,
    TotalItemsToCraft,
    currentWin
) {
    let materialPos = {
        MAT_ONE: { x: MaterialPos.ONE.x, y: MaterialPos.ONE.y },
        MAT_TWO: { x: MaterialPos.TWO.x, y: MaterialPos.TWO.y },
    };

    let initialSetup = true;
    let itemPosX = ItemPos.x;
    let itemPosY = ItemPos.y;
    let currentWinIndex =0;
    let currentCraftedItems = 0;
    let craftedItems = 0;
    let currentIndex= 0;
    let isSelling = false;
    let startCrafting = false;
    let batchSetupCompleted = false;
  

    if ((event.name === "3" || event.vKey === 51) && event.state === "DOWN") {
        startCrafting = !startCrafting;

        if (startCrafting) {
            start_Craft = setInterval(() => {

                
                if (craftedItems > 0 && craftedItems === 30 && !isSelling) {
                    isSelling = true;
                    currentWinIndex = 0; // Start from the first window
                    console.log("Switching to selling mode...");
                    robot.keyTap("enter");
                    robot.moveMouse(1422, 403); // Equip Btn
                }
                  if (isSelling) {

                    console.log("Switching to selling mode...");
                  
                    robot.keyTap("enter");
                    if (currentWinIndex <= currentWin.length - 1 && isSelling) {
                        // Bring the current window to the foreground
                        currentWin[currentWinIndex].bringToTop();
                
                        // Selling logic
                        if (currentIndex > 0 && currentIndex % 6 === 0) {
                            itemPosX = ItemPos.x;
                            itemPosY += 45;
                        }
                
                        
                        if (currentIndex > 0 && currentIndex % 10 === 0) {
                            robot.moveMouse(ConfirmBtnPos.x, ConfirmBtnPos.y);
                            robot.mouseClick();
                            robot.moveMouse(TradeBtnPos.x, TradeBtnPos.y);
                            robot.mouseClick();
                        }
                
                        if (currentIndex === craftedItems) {
                            console.log(`Selling complete for window ${currentWinIndex + 1}. Resuming crafting...`);
             
                            
                            robot.moveMouse(BeginBtnPos.x, BeginBtnPos.y);
                            robot.mouseClick();
                            itemPosX = ItemPos.x;
                            itemPosY = ItemPos.y;

                            
                            currentWinIndex++;
                            currentIndex = 0;

                           
                        } 
                        if (currentWinIndex >= currentWin.length) {
                            console.log("All windows processed. Restarting crafting...");
                            currentWinIndex = 0;
                            isSelling = false;
                            currentIndex = 0;
                            craftedItems = 0; // Reset total crafted items if necessary
                            materialPos.MAT_ONE.x += 45;
                            materialPos.MAT_TWO.x += 45;
                        }
                        
                        else {
                            robot.moveMouse(itemPosX, itemPosY);
                            robot.mouseToggle("down", "right");
                            robot.mouseToggle("up", "right");
                            itemPosX += 45;
                            currentIndex++;
                        }
                
               
                    }
                    
               
                } else if (currentCraftedItems < TotalItemsToCraft && isSelling === false) {

                    // Initial preparation logic
                    if (initialSetup) {
                        if(currentWinIndex < currentWin.length) {
                            currentWin[currentWinIndex].bringToTop();
                            console.log(`Switching to client ${currentWinIndex + 1} for crafting setup...`);
                            console.log("Performing initial setup for crafting...");
                            // Add initial setup logic here, such as preparing materials
                            robot.keyToggle("enter", "down");
                            robot.moveMouse(MaterialBtnPos.x, MaterialBtnPos.y);
                            robot.mouseClick();
                            robot.moveMouse(materialPos.MAT_ONE.x, materialPos.MAT_ONE.y);
                            robot.mouseToggle("down", "left");
                            robot.moveMouse(CraftTablePos.x, CraftTablePos.y);
                            robot.mouseToggle("up", "left");
                            robot.moveMouse(materialPos.MAT_TWO.x, materialPos.MAT_TWO.y);
                            robot.mouseToggle("down", "left");
                            robot.moveMouse(CraftTablePos.x, CraftTablePos.y);
                            robot.mouseToggle("up", "left");
                            robot.moveMouse(1422, 403); // Equip Btn
                            robot.mouseClick();
                            robot.moveMouse(AmountBtnPos.x, AmountBtnPos.y);
                            robot.mouseClick();
                            robot.typeString(quantity); // 990
                            robot.keyTap("enter");
                            robot.moveMouse(BeginBtnPos.x, BeginBtnPos.y);
                            robot.mouseClick();

                            ++currentWinIndex;
                        }

                        if (currentWinIndex >= currentWin.length) {
                            console.log("Initial setup complete. Starting crafting phase...");
                            currentWinIndex = 0; // Reset index for crafting phase
                            initialSetup = false; // Transition to crafting phase
                        }
                       
                    }
            

                    if (currentCraftedItems > 0 && currentCraftedItems % 99 === 0 && !batchSetupCompleted) {
                        console.log(`Switching to client ${currentWinIndex + 1} for crafting setup...`);
                        currentWin[currentWinIndex].bringToTop();

                        // Crafting setup logic
                        robot.keyToggle("enter", "down");
                        robot.moveMouse(MaterialBtnPos.x, MaterialBtnPos.y);
                        robot.mouseClick();
                        robot.moveMouse(materialPos.MAT_ONE.x, materialPos.MAT_ONE.y);
                        robot.mouseToggle("down", "left");
                        robot.moveMouse(CraftTablePos.x, CraftTablePos.y);
                        robot.mouseToggle("up", "left");
                        robot.moveMouse(materialPos.MAT_TWO.x, materialPos.MAT_TWO.y);
                        robot.mouseToggle("down", "left");
                        robot.moveMouse(CraftTablePos.x, CraftTablePos.y);
                        robot.mouseToggle("up", "left");
                        robot.moveMouse(1422, 403); // Equip Btn
                        robot.mouseClick();
                        robot.moveMouse(AmountBtnPos.x, AmountBtnPos.y);
                        robot.mouseClick();
                        robot.typeString(quantity); // 990
                        robot.keyTap("enter");
                        robot.moveMouse(BeginBtnPos.x, BeginBtnPos.y);
                        robot.mouseClick();

                        // Move to the next client
                        ++currentWinIndex;
                        if (currentWinIndex >= currentWin.length) {
                            currentWinIndex = 0;
                        }

                        // Mark the batch setup as complete
                        batchSetupCompleted = true;
                } else {
                    batchSetupCompleted = false;

                    // General crafting loop
                    Dis.delayUsingPerformanceNow(2250);
                    ++currentCraftedItems;
                    ++craftedItems;
                    console.log("Current crafted items:", currentCraftedItems);
                }
            }

               /*     
                } else {
                    console.log("Crafting complete. Max items crafted.");
                    clearInterval(start_Craft);
                } */
            }, 100);
        } else {
            clearInterval(start_Craft);
        }
    }
}

async function _bringWindowsToTop(windows)  {
    console.log("5 Seconds and it will bring the window to top and focus on it")
    await delay(5000)


        while(stop) {
            for (const window of windows) {
           // while stop is true keep looping else if false stop the loop
                console.log(`Bringing window to top: ${window.getTitle()}`);
               
                window.bringToTop(); // Bring the window to the foreground
                await delay (2000)
          }
        
        }
   
};



module.exports = {
    autoCraftLevelling3
}


