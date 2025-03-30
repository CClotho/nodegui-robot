const robot = require("robotjs");

function delayUsingPerformanceNow(milliseconds) {
    const start = performance.now();
    while (performance.now() - start < milliseconds) {
        // Busy-wait loop
    }
}

function autoCraftLevelling2(
    event,
    MaterialPos,
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
    TotalItemsToCraft
) {
    let materialPos = {
        MAT_ONE: { x: MaterialPos.ONE.x, y: MaterialPos.ONE.y },
        MAT_TWO: { x: MaterialPos.TWO.x, y: MaterialPos.TWO.y },
    };

    let itemPosX = ItemPos.x;
    let itemPosY = ItemPos.y;
    let totalCraftedItems = 0
    let currentCraftedItems = 0;
    let craftedItems = 0;
    let currentIndex = 0;
    let isSelling = false;
    let needsRefill = true; // Ensure refilling happens before crafting starts
    let startCrafting = false;
    let firstRefill = true; // Track if it's the first refill

    if ((event.name === "3" || event.vKey === 51) && event.state === "DOWN") {
        startCrafting = !startCrafting;

        if (startCrafting) {
            console.log("Starting crafting process...");
            start_Craft = setInterval(() => {
                // Check if crafting is complete
                if (currentCraftedItems >= TotalItemsToCraft) {
                    console.log("Crafting complete. Max items crafted.");
                    clearInterval(start_Craft);
                    return;
                }

                // Handle material refilling
                if (needsRefill) {
                    console.log("Refilling materials...");
                    robot.moveMouse(MaterialBtnPos.x, MaterialBtnPos.y);
                    robot.mouseClick();
                    robot.moveMouse(materialPos.MAT_ONE.x, materialPos.MAT_ONE.y);
                    robot.mouseToggle("down", "left");
                    robot.moveMouse(craftingTablePos.x, craftingTablePos.y);
                    robot.mouseToggle("up", "left");
                    robot.moveMouse(materialPos.MAT_TWO.x, materialPos.MAT_TWO.y);
                    robot.mouseToggle("down", "left");
                    robot.moveMouse(craftingTablePos2.x, craftingTablePos2.y);
                    robot.mouseToggle("up", "left");
                    materialPos.MAT_ONE.x += 45;
                    materialPos.MAT_TWO.x += 45;

                    // If it's the first refill, set the amount and begin crafting
                    if (firstRefill) {
                        console.log("Setting crafting amount and starting crafting...");
                        robot.moveMouse(AmountBtnPos.x, AmountBtnPos.y);
                        robot.mouseClick();
                        robot.typeString(quantity.toString()); // Enter the quantity
                        robot.keyTap("enter");

                        robot.moveMouse(BeginBtnPos.x, BeginBtnPos.y);
                        robot.mouseClick();

                        firstRefill = false; // Mark first refill as complete
                    }

                    needsRefill = false; // Refill complete
                    isSelling = true;
                }  
                // Handle selling logic
                else if (isSelling) {
                    console.log("Switching to selling mode...");
                    robot.keyTap("enter");

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
                        console.log("Selling complete. Resuming crafting...");
                        isSelling = false;
                        currentIndex = 0;
                        craftedItems = 0;
                        itemPosX = ItemPos.x;
                        itemPosY = ItemPos.y;
                    } else {
                        robot.moveMouse(itemPosX, itemPosY);
                        robot.mouseToggle("down", "right");
                        robot.mouseToggle("up", "right");
                        itemPosX += 45;
                        currentIndex++;
                    }
                } 
                // Handle crafting logic
                else {
                    console.log(`Crafting item ${currentCraftedItems + 1} of ${TotalItemsToCraft}`);
                    robot.moveMouse(SuccessBtnPos.x, SuccessBtnPos.y);
                    robot.mouseClick();

                    currentCraftedItems++;
                    craftedItems++;

                    if (craftedItems <=30 && craftedItems % 30 === 0) {
                        isSelling = true;
                        console.log("Switching to selling mode...");
                    }

                    if (currentCraftedItems <=99 && currentCraftedItems % 99 === 0 && currentCraftedItems !== 0) {
                        needsRefill = true;
                        console.log("Refilling materials after 99 items...");
                    }
                }
            }, 100);
        } else {
            console.log("Stopping crafting process...");
            clearInterval(start_Craft);
        }
    }
}

/* function autoCraftLevelling2(
    event,
    MaterialPos,
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
    let currentIndex = 0;
    let isSelling = false;
    let needsRefill = true; // Ensure refilling happens before crafting starts
    let startCrafting = false;

    if ((event.name === "3" || event.vKey === 51) && event.state === "DOWN") {
        startCrafting = !startCrafting;

        if (startCrafting) {
            console.log("Starting crafting process...");
            start_Craft = setInterval(() => {
                if (currentCraftedItems >= TotalItemsToCraft) {
                    console.log("Crafting complete. Max items crafted.");
                    clearInterval(start_Craft);
                    return;
                }

                if (needsRefill) {
                    console.log("Refilling materials...");
                    robot.moveMouse(MaterialBtnPos.x, MaterialBtnPos.y);
                    robot.mouseClick();
                    robot.moveMouse(materialPos.MAT_ONE.x, materialPos.MAT_ONE.y);
                    robot.mouseToggle("down", "left");
                    robot.moveMouse(craftingTablePos.x, craftingTablePos.y);
                    robot.mouseToggle("up", "left");
                    robot.moveMouse(materialPos.MAT_TWO.x, materialPos.MAT_TWO.y);
                    robot.mouseToggle("down", "left");
                    robot.moveMouse(craftingTablePos2.x, craftingTablePos2.y);
                    robot.mouseToggle("up", "left");
                    materialPos.MAT_ONE.x += 45;
                    materialPos.MAT_TWO.x += 45;
                    needsRefill = false;

                    robot.moveMouse(AmountBtnPos.x, AmountBtnPos.y);
                    robot.mouseClick();
                    robot.typeString(quantity.toString()); // Enter the quantity
                    robot.keyTap("enter");

                    robot.moveMouse(BeginBtnPos.x, BeginBtnPos.y);
                    robot.mouseClick();
                } else if (isSelling) {
                    console.log("Switching to selling mode...");
                    robot.keyTap("enter");

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
                        console.log("Selling complete. Resuming crafting...");
                        isSelling = false;
                        currentIndex = 0;
                        craftedItems = 0;
                        itemPosX = ItemPos.x;
                        itemPosY = ItemPos.y;
                        needsRefill = true; // Refill materials after selling
                    } else {
                        robot.moveMouse(itemPosX, itemPosY);
                        robot.mouseToggle("down", "right");
                        robot.mouseToggle("up", "right");
                        itemPosX += 45;
                        currentIndex++;
                    }
                } else {
                    console.log(`Crafting item ${currentCraftedItems + 1} of ${TotalItemsToCraft}`);
                   /*  robot.moveMouse(AmountBtnPos.x, AmountBtnPos.y);
                    robot.mouseClick();
                    robot.typeString(quantity.toString()); // Enter the quantity
                    robot.keyTap("enter");

                    robot.moveMouse(BeginBtnPos.x, BeginBtnPos.y);
                    robot.mouseClick(); 

                    // Wait for crafting to complete
                    delayUsingPerformanceNow(2250);

                    // Click the success button to confirm crafting
                    robot.moveMouse(SuccessBtnPos.x, SuccessBtnPos.y);
                    robot.mouseClick();

                    currentCraftedItems++;
                    craftedItems++;

                    if (craftedItems % 30 === 0) {
                        isSelling = true;
                        console.log("Switching to selling mode...");
                    }

                    if (currentCraftedItems % 99 === 0) {
                        needsRefill = true;
                        console.log("Refilling materials after 99 items...");
                    }
                }
            }, 100);
        } else {
            console.log("Stopping crafting process...");
            clearInterval(start_Craft);
        }
    }
}

*/
module.exports = {
    autoCraftLevelling2,
};
 





/* const robot = require("robotjs");
function delayUsingPerformanceNow(milliseconds) {
    const start = performance.now();
    while (performance.now() - start < milliseconds) {
        // Busy-wait loop
    }
}

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
    let currentIndex = 0;
    let isSelling = false;
    let needsRefill = false;
    let startCrafting = false;

    if ((event.name === "3" || event.vKey === 51) && event.state === "DOWN") {
        startCrafting = !startCrafting;

        if (startCrafting) {
            start_Craft = setInterval(() => {
                if (craftedItems > 0 && craftedItems % 30 === 0) {
                    isSelling = true;
                }

                if (isSelling) {
                    console.log("Switching to selling mode...");
                    robot.keyTap("enter");

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
                        console.log("Selling complete. Resuming crafting...");
                        isSelling = false;
                        currentIndex = 0;
                        craftedItems = 0;
                        itemPosX = ItemPos.x;
                        itemPosY = ItemPos.y;
                    } else {
                        robot.moveMouse(itemPosX, itemPosY);
                        robot.mouseToggle("down", "right");
                        robot.mouseToggle("up", "right");
                        itemPosX += 45;
                        currentIndex++;
                    }
                } else if (currentCraftedItems < TotalItemsToCraft) {
                    if (currentCraftedItems % 99 === 0 && currentCraftedItems !== 0) {
                        needsRefill = true;
                    }

                    if (needsRefill) {
                        console.log("Refilling materials...");
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
                        materialPos.MAT_ONE.x += 45;
                        materialPos.MAT_TWO.x += 45;
                        needsRefill = false;
                    }

                    console.log(`Crafting item ${currentCraftedItems + 1} of ${TotalItemsToCraft}`);
                    robot.moveMouse(BeginBtnPos.x, BeginBtnPos.y);
                    robot.mouseClick();
                    delayUsingPerformanceNow(2250);
                    currentCraftedItems++;
                    craftedItems++;
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

module.exports ={
    autoCraftLevelling2
} */

