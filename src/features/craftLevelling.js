/* 
add the mats on the craft table  then click begin --> wait 2 sec delay then increment
just log craft 1 2 3 4 5 then if it hit crafted Items === 30 enter
sell the items --> repeat then calculate the mats so if 100 items re-fill 


*/
const robot = require('robotjs');

const {Disassemble, delayUsingPerformanceNow} = require('./Disassemble');
let startCrafting = false;
let start_Craft;

function autoCraftLevelling(
    event,
    MaterialPos,
    CraftTablePos,
    AmountBtnPos,
    quantity,
    BeginBtnPos,
    SuccessBtnPos,
    ItemPos ,
    ConfirmBtnPos,
    TradeBtnPos,
    MaterialBtnPos,
    TotalItemsToCraft // 990

) {
    // take count via craftedItemsIndex ++ if it hit 120 then repeat.
    let materialPos = 
    {
        MAT_ONE : {x: MaterialPos.ONE.x, y:MaterialPos.ONE.y}, // materialPos.MAT_ONE.x
        MAT_TWO : {x: MaterialPos.TWO.x, y:MaterialPos.TWO.y}
    }

    /* let craftTablePos = { x: 696, y: 518};
    let beginBtnPos = {x: 682, y: 725,};
    let  delay;
    let successBtnPos ={x:953, y: 602};
    let amountBtnPos = {x: 590, y: 723};
  
    let SellTabPos = { x: 846, y: 377 };
    let confirmBtnPos = {x: 881, y:602};
    let tradeBtnPos = {x:950, y:607};
  
    */
    let itemPos = ItemPos;
    let currentCraftedItems = 0;  
    let BatchesToSell = 0;
    let BatchesSold = 0;
    let isSelling = false;
    let itemsToSell = 0;
    let craftedItems =0;

    if((event.name === "3" || event.vKey === 50 ) && event.state === "DOWN") {

        startCrafting = !startCrafting;


        if(startCrafting) {
            start_Craft = setInterval(()=> {
                // currentCraftedItems !== TotalItemsToCraft
                  robot.setMouseDelay(100);

                
                

                if(craftedItems <= TotalItemsToCraft ) {

                    if(currentCraftedItems <= TotalItemsToCraft  && currentCraftedItems % 99 === 0  || currentCraftedItems === 0) {
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
                        robot.moveMouse( 1422, 403) // Equip Btn
                        robot.mouseClick();
                        robot.moveMouse(AmountBtnPos.x, AmountBtnPos.y);
                        robot.mouseClick();
                        
                        robot.typeString(quantity); // 990
                        robot.keyTap("enter");
    
                        robot.moveMouse(BeginBtnPos.x, BeginBtnPos.y)
                        robot.mouseClick();

                                                
                        materialPos.MAT_ONE.x =  MaterialPos.ONE.x +=45;
                        materialPos.MAT_TWO.x = MaterialPos.TWO += 45;   

 
    
                    }
                   
          


              

                if (itemsToSell % 30 === 0) {
                    robot.moveMouse(itemPos.x, itemPos.y);
                    robot.mouseToggle("down", "right");
                    craftedItems++
                    itemPos.x += 45;
                    

                    if(craftedItems % 6 === 0) {
                        itemPos.x = ItemPos.x//getItemPos.x; // Reset X to initial position
                        itemPos.y += 45;  
                    }

                    if(craftedItems % 10 === 0) {
                        robot.moveMouse(ConfirmBtnPos.x, ConfirmBtnPos.y);
                        robot.mouseClick();
                        robot.moveMouse(TradeBtnPos.x, TradeBtnPos.y);
                        robot.mouseClick();
                    }

                    if(craftedItems === 30 ) {
                        itemPos.x = ItemPos.x;
                        itemPos.y = ItemPos.y;
                        craftedItems = 0;
                        itemsToSell = 0;
                    }
                
                }

                delayUsingPerformanceNow(2000);
                    currentCraftedItems++;
                    itemsToSell++;
                    console.log("current crafted items", currentCraftedItems);
                    robot.keyTap("enter");
         
                }
            }, 100)
            
        }
        else {
            clearInterval(start_Craft)
        }
        
    }



}

/* 
function autoCraftLevelling2(
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
    TotalItemsToCraft
) {
    let materialPos = {
        MAT_ONE: { x: MaterialPos.ONE.x, y: MaterialPos.ONE.y },
        MAT_TWO: { x: MaterialPos.TWO.x, y: MaterialPos.TWO.y },
    };

    let itemPos = { ...ItemPos };
    let currentCraftedItems = 0;
    let craftedItems = 0;
    let itemsToSell = 0;
    let isSelling = false;

    if ((event.name === "3" || event.vKey === 50) && event.state === "DOWN") {
        startCrafting = !startCrafting;

        if (startCrafting) {
            start_Craft = setInterval(() => {
                if (isSelling) {
                    // Selling Logic
                    robot.moveMouse(itemPos.x, itemPos.y);
                    robot.mouseToggle("down", "right");
                    robot.mouseToggle("up", "right");
                    itemPos.x += 45;
                    craftedItems++;
                    itemsToSell++;

                    if (craftedItems % 6 === 0) {
                        itemPos.x = ItemPos.x;
                        itemPos.y += 45;
                    }

                    if (craftedItems % 10 === 0) {
                        robot.moveMouse(ConfirmBtnPos.x, ConfirmBtnPos.y);
                        robot.mouseClick();
                        robot.moveMouse(TradeBtnPos.x, TradeBtnPos.y);
                        robot.mouseClick();
                    }

                    if (craftedItems === 30) {
                        console.log("Selling complete. Resuming crafting...");
                        isSelling = false;
                        craftedItems = 0;
                        itemsToSell = 0;
                        itemPos = { ...ItemPos };
                    }
                } else if (currentCraftedItems < TotalItemsToCraft) {
                    // Crafting Logic
                    if (currentCraftedItems % 99 === 0 || currentCraftedItems === 0) {
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

                        materialPos.MAT_ONE.x += 45;
                        materialPos.MAT_TWO.x += 45;
                    }

                    delayUsingPerformanceNow(2000);
                    currentCraftedItems++;
                    console.log("Current crafted items:", currentCraftedItems);

                    if (currentCraftedItems % 30 === 0) {
                        console.log("Switching to selling mode...");
                        isSelling = true;
                    }
                } else {
                    console.log("Crafting complete.");
                    clearInterval(start_Craft);
                }
            }, 100);
        } else {
            clearInterval(start_Craft);
        }
    }
}

 */

/* function autoCraftLevelling2(
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
    TotalItemsToCraft
) {
    let materialPos = {
        MAT_ONE: { x: MaterialPos.ONE.x, y: MaterialPos.ONE.y },
        MAT_TWO: { x: MaterialPos.TWO.x, y: MaterialPos.TWO.y },
    };

    let itemPos = { ...ItemPos };
    let currentCraftedItems = 0;
    let craftedItems = 0;
    let itemsToSell = 0;
    let isSelling = false;

    if ((event.name === "3" || event.vKey === 50) && event.state === "DOWN") {
        startCrafting = !startCrafting;

        if (startCrafting) {
            start_Craft = setInterval(() => {
                if (isSelling) {
                    // Selling Logic
                    robot.moveMouse(itemPos.x, itemPos.y);
                    robot.mouseToggle("down", "right");
                    itemPos.x += 45;
                    craftedItems++;
                    itemsToSell++;

                    if (craftedItems % 6 === 0) {
                        itemPos.x = ItemPos.x;
                        itemPos.y += 45;
                    }

                    if (craftedItems % 10 === 0) {
                        robot.moveMouse(ConfirmBtnPos.x, ConfirmBtnPos.y);
                        robot.mouseClick();
                        robot.moveMouse(TradeBtnPos.x, TradeBtnPos.y);
                        robot.mouseClick();
                    }

                    if (craftedItems === 30) {
                        console.log("Selling complete. Resuming crafting...");
                        isSelling = false;
                        craftedItems = 0;
                        itemsToSell = 0;
                        itemPos = { ...ItemPos };
                    }
                } else if (currentCraftedItems < TotalItemsToCraft) {
                    // Crafting Logic
                    if (currentCraftedItems % 99 === 0 || currentCraftedItems === 0) {
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

                        materialPos.MAT_ONE.x += 45;
                        materialPos.MAT_TWO.x += 45;
                    }

                    delayUsingPerformanceNow(2000);
                    currentCraftedItems++;
                    console.log("Current crafted items:", currentCraftedItems);

                    if (currentCraftedItems % 30 === 0) {
                        console.log("Switching to selling mode...");
                        isSelling = true;
                    }
                } else {
                    console.log("Crafting complete. Max items crafted.");
                    clearInterval(start_Craft);
                }
            }, 100);
        } else {
            clearInterval(start_Craft);
        }
    }
}
 */

/* function autoCraftLevelling2(
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
    TotalItemsToCraft
) {
    let materialPos = {
        MAT_ONE: { x: MaterialPos.ONE.x, y: MaterialPos.ONE.y },
        MAT_TWO: { x: MaterialPos.TWO.x, y: MaterialPos.TWO.y },
    };

    let itemPos = { ...ItemPos };
    let currentCraftedItems = 0;
    let craftedItems = 0;
    let itemsToSell = 0;
    let isSelling = false;

    if ((event.name === "3" || event.vKey === 50) && event.state === "DOWN") {
        startCrafting = !startCrafting;

        if (startCrafting) {
            start_Craft = setInterval(() => {
                
                 if (currentCraftedItems < TotalItemsToCraft && isSelling === false) {
                    // Crafting Logic 0 % any number will equivalent to 0 eg 0 % 99 = 0
                    if (currentCraftedItems <= 0 && currentCraftedItems% 99 === 0) {
                        // Perform initial setup for every 99 items
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

                        materialPos.MAT_ONE.x += 45;
                        materialPos.MAT_TWO.x += 45;
                }

                if(craftedItems > 0 && craftedItems % 30 === 0) {
                        isSelling = true;
                        
                }
                 else {
                        delayUsingPerformanceNow(2250);
                        ++currentCraftedItems;
                        ++craftedItems;
                        console.log("Current crafted items:", currentCraftedItems);
                }

                     
                    
                } else if (craftedItems > 0 && craftedItems % 30 === 0) {
                    isSelling = true;
                    console.log("Switching to selling mode")

               
            
                    console.log("Switching to selling mode...");
                    isSelling = true;
                    
                

                    if (craftedItems % 6 === 0) {
                        itemPos.x = ItemPos.x;
                        itemPos.y += 45;
                    }

                    if (craftedItems % 10 === 0) {
                        robot.moveMouse(ConfirmBtnPos.x, ConfirmBtnPos.y);
                        robot.mouseClick();
                        robot.moveMouse(TradeBtnPos.x, TradeBtnPos.y);
                        robot.mouseClick();
                    }


                    if (craftedItems === 0) {
                        console.log("Selling complete. Resuming crafting...");
                        isSelling = false;
                        craftedItems = 0;
                        itemsToSell = 0;
                        itemPos = { ...ItemPos };
                        robot.moveMouse(BeginBtnPos.x, BeginBtnPos.y);
                        robot.mouseClick();
                    }

                    robot.keyTap("enter");
                    robot.moveMouse(itemPos.x, itemPos.y);
                    robot.mouseToggle("down", "right");
                    robot.mouseToggle("up", "right");
                    itemPos.x += 45;
                    --craftedItems;
                }
                if(currentCraftedItems === TotalItemsToCraft) {
                    console.log("Crafting complete. Max items crafted.");
                    clearInterval(start_Craft);
                }
            }, 100);
        } else {
            clearInterval(start_Craft);
        }
    }
}

 */

function autoCraftLevelling2(
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
    TotalItemsToCraft
) {
    let materialPos = {
        MAT_ONE: { x: MaterialPos.ONE.x, y: MaterialPos.ONE.y },
        MAT_TWO: { x: MaterialPos.TWO.x, y: MaterialPos.TWO.y },
    };


    let itemPosX = ItemPos.x;
    let itemPosY = ItemPos.y;

    let currentCraftedItems = 0;
    let craftedItems = 0;
    let currentIndex= 0;
    let isSelling = false;
    let startCrafting = false;

    if ((event.name === "3" || event.vKey === 51) && event.state === "DOWN") {
        startCrafting = !startCrafting;

        if (startCrafting) {
            start_Craft = setInterval(() => {

                
                if (craftedItems > 0 && currentCraftedItems === 30) {
                    isSelling = true;
                }
                  if (isSelling) {
                    // Selling Logic
                    console.log("Switching to selling mode...");
                    robot.keyTap("enter");

                    if (currentIndex > 0 && currentIndex % 6 === 0) {
                        itemPosX = ItemPos.x
                        itemPosY += 45;
                    }

                    if (currentIndex > 0 && currentIndex   % 10 === 0) {
                        robot.moveMouse(ConfirmBtnPos.x, ConfirmBtnPos.y);
                        robot.mouseClick();
                        robot.moveMouse(TradeBtnPos.x, TradeBtnPos.y);
                        robot.mouseClick();
                    }


                    if (currentIndex === craftedItems) {
                        console.log("Selling complete. Resuming crafting...");
                        isSelling = false;
                        currentIndex = 0;
                        craftedItems = 0
                    
              
                        robot.moveMouse(BeginBtnPos.x, BeginBtnPos.y);
                        robot.mouseClick();
                        itemPosX = ItemPos.x;
                       itemPosY = ItemPos.y
                    }else {
                        robot.moveMouse(itemPosX, itemPosY);
                        robot.mouseToggle("down", "right");
                        robot.mouseToggle("up", "right");
                        itemPosX += 45;
                        currentIndex++;
                 

                    }

                    
               
                
                } else if (currentCraftedItems < TotalItemsToCraft && isSelling === false) {
                    // Crafting Logic
                    if (currentCraftedItems % 99 === 0 && currentCraftedItems === 0) {
                        // Perform setup every 99 items
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

                        materialPos.MAT_ONE.x += 45;
                        materialPos.MAT_TWO.x += 45;
                    }

                    delayUsingPerformanceNow(2250);
                    ++currentCraftedItems;
                    ++craftedItems;
                    console.log("Current crafted items:", currentCraftedItems);

                   
                } else {
                    console.log("Crafting complete. Max items crafted.");
                    clearInterval(start_Craft);
                }
            }, 100);
        } else {
            clearInterval(start_Craft);
        }
    }
}



module.exports = {
    autoCraftLevelling,
    autoCraftLevelling2
}