const robot = require('robotjs');
const { windowManager } = require('node-window-manager');
const Dis = require('./Disassemble');

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
    const STATES = {
        INITIAL_SETUP: 'INITIAL_SETUP',
        CRAFTING: 'CRAFTING',
        SELLING: 'SELLING',
    };

    let state = STATES.INITIAL_SETUP;
    let materialPos = {
        MAT_ONE: { x: MaterialPos.ONE.x, y: MaterialPos.ONE.y },
        MAT_TWO: { x: MaterialPos.TWO.x, y: MaterialPos.TWO.y },
    };

    let itemPosX = ItemPos.x;
    let itemPosY = ItemPos.y;
    let currentWinIndex = 0;
    let currentCraftedItems = 0;
    let craftedItems = 0;
    let currentIndex = 0;

    let startCrafting = false;

    if ((event.name === "3" || event.vKey === 51) && event.state === "DOWN") {
        startCrafting = !startCrafting;

        if (startCrafting) {
            start_Craft = setInterval(() => {
                const currentClient = currentWin[currentWinIndex];

                switch (state) {
                    case STATES.INITIAL_SETUP:
                        console.log(`Performing initial setup for client ${currentWinIndex + 1}...`);
                        currentClient.bringToTop();
                        performInitialSetup(materialPos, CraftTablePos, AmountBtnPos, quantity, BeginBtnPos);
                        currentWinIndex++;
                        if (currentWinIndex >= currentWin.length) {
                            currentWinIndex = 0;
                            state = STATES.CRAFTING;
                            console.log("Initial setup complete. Starting crafting phase...");
                        }
                        break;

                    case STATES.CRAFTING:
                        if (currentCraftedItems < TotalItemsToCraft) {
                            if (currentCraftedItems % 99 === 0 && currentCraftedItems !== 0) {
                                console.log(`Refilling materials for client ${currentWinIndex + 1}...`);
                                currentClient.bringToTop();
                                refillMaterials(materialPos, CraftTablePos, MaterialBtnPos);
                            }

                            console.log(`Crafting item ${currentCraftedItems + 1} of ${TotalItemsToCraft}...`);
                            robot.moveMouse(BeginBtnPos.x, BeginBtnPos.y);
                            robot.mouseClick();
                            Dis.delayUsingPerformanceNow(2250);
                            currentCraftedItems++;
                            craftedItems++;

                            if (craftedItems % 30 === 0) {
                                state = STATES.SELLING;
                                console.log("Switching to selling mode...");
                            }
                        } else {
                            console.log("Crafting complete. Max items crafted.");
                            clearInterval(start_Craft);
                        }
                        break;

                    case STATES.SELLING:
                        console.log(`Selling items for client ${currentWinIndex + 1}...`);
                        currentClient.bringToTop();
                        sellItems(itemPosX, itemPosY, ConfirmBtnPos, TradeBtnPos, craftedItems);
                        craftedItems = 0;
                        itemPosX = ItemPos.x;
                        itemPosY = ItemPos.y;
                        state = STATES.CRAFTING;
                        break;

                    default:
                        console.log("Unknown state. Stopping automation.");
                        clearInterval(start_Craft);
                        break;
                }
            }, 100);
        } else {
            clearInterval(start_Craft);
        }
    }
}

function performInitialSetup(materialPos, CraftTablePos, AmountBtnPos, quantity, BeginBtnPos) {
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
}

function refillMaterials(materialPos, CraftTablePos, MaterialBtnPos) {
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
}

function sellItems(itemPosX, itemPosY, ConfirmBtnPos, TradeBtnPos, craftedItems) {
    for (let i = 0; i < craftedItems; i++) {
        robot.moveMouse(itemPosX, itemPosY);
        robot.mouseToggle("down", "right");
        robot.mouseToggle("up", "right");
        itemPosX += 45;

        if ((i + 1) % 6 === 0) {
            itemPosX = ItemPos.x;
            itemPosY += 45;
        }

        if ((i + 1) % 10 === 0) {
            robot.moveMouse(ConfirmBtnPos.x, ConfirmBtnPos.y);
            robot.mouseClick();
            robot.moveMouse(TradeBtnPos.x, TradeBtnPos.y);
            robot.mouseClick();
        }
    }
}

module.exports = {
    autoCraftLevelling3,
};