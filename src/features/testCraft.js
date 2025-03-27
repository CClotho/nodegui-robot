

let currentClientIndex = 0;
let StartCrafting;

function processClient(client) {
   
        if (client.craftedItems > 0 && client.currentCraftedItems === 30) {
            client.isSelling = true;
        }

        if (client.isSelling) {
            console.log(`Switching to selling mode for client ${currentClientIndex + 1}...`);
            robot.keyTap("enter");

            if (currentIndex > 0 && currentIndex % 6 === 0) {
                client.itemPosX = ItemPos.x;
                client.itemPosY += 45;
            }

            if (currentIndex > 0 && currentIndex % 10 === 0) {
                robot.moveMouse(ConfirmBtnPos.x, ConfirmBtnPos.y);
                robot.mouseClick();
                robot.moveMouse(TradeBtnPos.x, TradeBtnPos.y);
                robot.mouseClick();
            }

            if (currentIndex === client.craftedItems) {
                console.log(`Selling complete for client ${currentClientIndex + 1}. Resuming crafting...`);
                client.isSelling = false;
                client.currentIndex = 0;
                client.craftedItems = 0;

                robot.moveMouse(BeginBtnPos.x, BeginBtnPos.y);
                robot.mouseClick();
                client.itemPosX = ItemPos.x;
                client.itemPosY = ItemPos.y;

                clearInterval(intervalId);
                moveToNextClient();
            } else {
                robot.moveMouse(client.itemPosX, client.itemPosY);
                robot.mouseToggle("down", "right");
                robot.mouseToggle("up", "right");
                client.itemPosX += 45;
                currentIndex++;
            }
        } else if (client.currentCraftedItems < TotalItemsToCraft && !client.isSelling) {
            if (client.currentCraftedItems % 99 === 0 && client.currentCraftedItems === 0) {
                robot.keyToggle("enter", "down");
                robot.moveMouse(MaterialBtnPos.x, MaterialBtnPos.y);
                robot.mouseClick();
                robot.moveMouse(client.materialPos.MAT_ONE.x, client.materialPos.MAT_ONE.y);
                robot.mouseToggle("down", "left");
                robot.moveMouse(CraftTablePos.x, CraftTablePos.y);
                robot.mouseToggle("up", "left");
                robot.moveMouse(client.materialPos.MAT_TWO.x, client.materialPos.MAT_TWO.y);
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

                client.materialPos.MAT_ONE.x += 45;
                client.materialPos.MAT_TWO.x += 45;
            }

            delayUsingPerformanceNow(2250);
            client.currentCraftedItems++;
            client.craftedItems++;
            console.log(`Client ${currentClientIndex + 1}: Current crafted items:`, client.currentCraftedItems);
        } else {
            console.log(`Crafting complete for client ${currentClientIndex + 1}. Max items crafted.`);
            clearInterval(intervalId);
            moveToNextClient();
    }
}

function moveToNextClient() {
    currentClientIndex++;
    if (currentClientIndex < clients.length) {
        processClient(clients[currentClientIndex]);
    } else {
        console.log("All clients processed.");
    }
}

function autoCraftLevelling3 (event) {
    if ((event.name === "3" || event.vKey === 51) && event.state === "DOWN") {
        startCrafting = !startCrafting;
    
        if (startCrafting) {
            console.log("Starting crafting process...");
             StartCrafting = setInterval(()=> {
                processClient(clients[currentClientIndex]);
            })
        }
        else {
            clearInterval(StartCrafting);
        }
    }
    

}

module.export = autoCraftLevelling3;
