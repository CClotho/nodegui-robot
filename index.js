const { QMainWindow, QLabel, QPushButton, QWidget, FlexLayout, QLineEdit, QMenu, QMenuBar,QAction} = require("@nodegui/nodegui");
const mouseEvents = require("global-mouse-events");
const {windowManager} = require('node-window-manager');
const { GlobalKeyboardListener, } = require("node-global-key-listener");
const robot = require("robotjs"); // Ensure robotjs is installed and works with your environment
const { move } = require("./checkPixelColor");
const autoPurchaseItem = require("./src/features/Buy");
const  Disassembling  = require("./src/features/Disassemble");
const Craft = require('./src/features/craftLevelling');
const testCraft = require('./src/features/testCraft2');
let arr = [];
test2 = [];
// user can choose to activate shortcut keys or manually clicking buttons
// Create the main window
const listener = new GlobalKeyboardListener();


const win = new QMainWindow();
/* const test = new QMainWindow();
test.setWindowTitle("Other Page"); */
win.setWindowTitle("Mouse Event Control");




// Create central widget and layout
const centralWidget = new QWidget();
const layout = new FlexLayout();
centralWidget.setLayout(layout);
win.setCentralWidget(centralWidget);



//Menu

const menu = new QMenu();
const menuBar = new QMenuBar();
const action = new QAction();

action.setText('foobar');
action.addEventListener('triggered', () => {
  console.log('triggered');
});

menu.addAction(action);
menu.setTitle('File');

menuBar.addMenu(menu); 
win.setMenuBar(menuBar);


// Create a label for status messages
const label = new QLabel();
label.setText("Press 'Start' to listen for mouse events.");
label.setInlineStyle("color: black; margin: 10px;");

// Create buttons

const startKeyboard = new QPushButton();
startKeyboard.setText("Start Shortcut Keys")
const startButton = new QPushButton();
startButton.setText("Start Listening");

const stopButton = new QPushButton();
stopButton.setText("Stop Listening");
stopButton.setEnabled(false); // Initially disabled

//move mouse
const moveButton = new QPushButton();
moveButton.setText("Move");


const mouseInput1 = new QLineEdit();
const mouseInput2 = new QLineEdit();

// Add widgets to layout
layout.addWidget(label);
layout.addWidget(startButton);
layout.addWidget(stopButton);
layout.addWidget(mouseInput1);
layout.addWidget(mouseInput2);
layout.addWidget(moveButton);
layout.addWidget(startKeyboard);


// Variable to track listener state
let isListening = false;
let toggleRight = false;
let D_A;
let intervalId;
let dissemble = false;
let pauseKeyboardEvents = true;
let typingNumbers = false;
let typing;
let pressCount = 0;


getItemPos = { x: 1418, y: 438 } //: y:438
getSellTabPos = { x: 846, y: 377 }
const MaterialPos = {ONE: {x: 1414, y: 447,}, TWO: {x: 1450, y: 440}};//  {x: 1414, y: 447,}, TWO: {x: 1450, y: 440}
const inventoryPos = { x: 1394, y: 417 };
const DisassemblePos = {x:1038, y:712};
const confirmBtnPos = {x: 881, y:602};
const tradeBtnPos = {x:950, y:607};
const beginBtnPos = {x:1028, y: 962}
const successBtnPos = {x:953, y: 602}
const itemCategory = "ITEM";
const totalOfItems = 30;
const quantity = 0 ;
const npcItemPos = {x: 571, y:383};
let craftTablePos = { x: 696, y: 518};
let craftBeginBtnPos = {x: 682, y: 725,};
let AmountBtnPos ={x: 590, y: 723};
const TotalItemsToCraft = 99;
let materialBtnPos = {x: 1566, y: 407};
let totalItemsToCraft = 990
function keyboardHandler(event, ItemPos, SellTabPos) { // rename this to selling items and buying one specific item

    if(event.name === "T" && event.state === "DOWN") {
    

        typingNumbers = !typingNumbers;

        if (typingNumbers) {
            console.log("Typing numbers");
        
            
           typing = setInterval(() => {
            // robot.typeString("999");

            /*  const startTime = performance.now();
             console.log("Start time", startTime)

             robot.keyToggle("enter", 'down');
             const endNow = performance.now();
             console.log("End time", endNow)
             console.log(`Elapsed time: ${(endNow - startTime ).toFixed(3)} ms`);    
             //robot.keyTap("9") */
             const startTime = performance.now();
             console.log(`Start pressing "Enter": ${startTime}`);
         
             robot.keyToggle("enter", "down");
         
             const endTime = performance.now();
             console.log(`End pressing "Enter": ${endTime}`);
             console.log(`Elapsed time: ${(endTime - startTime).toFixed(3)} ms`);
         
             pressCount++;
         
             if (pressCount >= 10) {
                 clearInterval(typing);
                 console.log("Presscount", pressCount)
                 console.log("Test completed.");
             }

            }, 50); // Adjust the delay as needed (100ms in this case)
        
        } else {
            console.log("Stopped typing");
        
            // Stop the interval
            clearInterval(typing);
            typing= null;
        } 
       
    }
    
    /*Just toggling right click for instantly putting the item in the buy tab */
    if(event.name === "A" && event.state === "DOWN") {
        
        toggleRight = !toggleRight;

        if (toggleRight) {
            console.log("Start toggling mouse up and down");
        
            // Start an interval to repeatedly toggle the mouse
            intervalId = setInterval(() => {
              robot.mouseToggle("down", "right"); // Hold down the right mouse button
              robot.mouseToggle("up", "right");   // Release the right mouse button
            }, 100); // Adjust the delay as needed (100ms in this case)
          } else {
            console.log("Stop toggling mouse up and down");
        
            // Stop the interval
            clearInterval(intervalId);
            intervalId = null;
          } 
       
    }

    
 
    if (event.name === "Q" && event.state === "DOWN") {
        console.log("Event is clicked on Q", event);
        
            dissemble = !dissemble;
           // const getItemPos = { x: 1406, y: 429 };  // get user input 
           // const getSellTabPos = { x: 1296, y: 429 };  // get user input 
            const maxColumns = 6; // Number of slots per row
            const maxItems = 30; // Total slots in inventory
            let currentIndex = 0; // Track the current item index
            let itemXPos =  ItemPos.x//getItemPos.x; 
            let itemYPos =  ItemPos.y//getItemPos.y;
            let confirmPos = {x: 876, y:607};  // get user input 
            let tradePos = {x:955, y:609}; // get user input 
        
            if (dissemble) {
                console.log("Start D/A");
        
                D_A = setInterval(() => {
                   
        
                    // Perform reset logic for every 6th item
                    if (currentIndex > 0 && currentIndex % maxColumns === 0) {
                        console.log(`Reset row at index ${currentIndex}`);
                        itemXPos = ItemPos.x//getItemPos.x; // Reset X to initial position
                        itemYPos += 45;         // Move Y down to the next row
                    }

                    if(currentIndex > 0 && currentIndex % 10 === 0) {
                            // Drag to sell tab position whenever the sell tab is full or every 10 items on the tab
                            
                        robot.moveMouse(confirmPos.x, confirmPos.y);
                        robot.mouseClick()
                        robot.moveMouse(tradePos.x, tradePos.y);
                        robot.mouseClick();
                        console.log(`Moved to sell position: (${SellTabPos.x}, ${SellTabPos.y})`);
                    }
        
                    // Reset both X and Y after the 30th item
                    if (currentIndex === maxItems) {
                        console.log("Reset to initial position after last item");
                        itemXPos =  ItemPos.x//getItemPos.x;
                        itemYPos =  ItemPos.y//getItemPos.y;
                        currentIndex  = 0;
                    }

        
                    

        
                    // Move mouse to the current item position
                    robot.setMouseDelay(0.1);
                    robot.moveMouse(itemXPos, itemYPos);
                    console.log(`Moving to item position: (${itemXPos}, ${itemYPos})`);
                    robot.mouseToggle("down", "left");
                   /*  robot.typeString("999");
                    robot.keyTap("enter"); */
                    robot.moveMouse(SellTabPos.x, SellTabPos.y);
                    robot.mouseToggle("up", "left");
                
        
                    // Update X position for the next item
                    itemXPos += 45; // Increment X by 45 for the next slot
                    currentIndex++; // Move to the next item
                }, 100); // Adjust interval timing as needed
            } else if(dissemble !== true){
            console.log("Stop toggling mouse up and down");
            clearInterval(D_A) // handle the pause otherwise remove eventListener to stop listening
            
            }
        }

       
}

async function pauseKeyboard(event) {
     //alternatively we could pause the script using Z
     // Change this to just toggling the pause variables for each
     // listeners and let each listeners handle their removeListener on their own button
     // e.g if (pause) { Show "The script is on pause" else if not start the execution}
     // else clear the interval
     console.log(" Pause Keyboard Event 'Z' is clicked:", event)
     if(event.name === "Z" && event.state === "DOWN") {
        pauseKeyboardEvents = !pauseKeyboardEvents  // set state from true to false
        if(pauseKeyboardEvents) {
          
        console.log("Keyboard listener value adding event listeners", pauseKeyboardEvents);
        listener.removeListener(keyboardHandler); // creating another listener to keep it globally listening then remove some listener
        listener.removeListener(autoPurchaseItem);
        listener.removeListener(Disassembling);
        listener.removeListener(Disassembling.autoDisassembling2);
        listener.removeListener(testCraft.autoCraftLevelling3);
        console.log("Pausing keyboard listener using shortcut key z")
            
        }
        else {
            console.log("Value of isPauseKEyboard in shortcut z add listener event", pauseKeyboardEvents);
           // listener.addListener(keyboardHandler); // creating another listener to keep it globally listening then remove some listener
            
            await listener.addListener((event) => {
                keyboardHandler(event, getItemPos,getSellTabPos)
                })
            
            await listener.addListener((event) => {
                autoPurchaseItem(event, {x: 456, y: 388},{x: 876, y:607}, {x:955, y:609}, "ITEM",30, 0)
            })
            
            await listener.addListener((event) => {
                Disassembling.Disassembling(event, { x: 1406, y: 429 })
            })

            listener.removeListener(testCraft.autoCraftLevelling3);

            await listener.addListener((event) => {
                Disassembling.autoDisassembling(
                event, 
                npcItemPos,
                inventoryPos , 
                DisassemblePos,
                confirmBtnPos, 
                tradeBtnPos , 
                beginBtnPos,
                successBtnPos, 
                itemCategory,
                totalOfItems,
                quantity 
                )
            })

            await listener.addListener((event) => {
                testCraft.autoCraftLevelling3(
                    event, 
                    MaterialPos,
                    craftTablePos,
                    AmountBtnPos,
                    990,
                    craftBeginBtnPos,
                    successBtnPos,
                    getItemPos,
                    confirmBtnPos,
                    tradeBtnPos,
                    materialBtnPos,
                    totalItemsToCraft,
                    arr

                )
            })

           console.log("Start keyboard listener using shortcut key z")

        }
    }
    
}
// Event listeners

listener.addListener(pauseKeyboard); 
startKeyboard.addEventListener("clicked", async(evt) => {
    // the evt object is specifically for the startKeyboard.addEventListener e.g if the user press the button again

     pauseKeyboardEvents = !pauseKeyboardEvents // turns the initial state from true to false  
     if(pauseKeyboardEvents === true) {
        listener.removeListener(keyboardHandler);
        listener.removeListener(autoPurchaseItem);
        listener.removeListener(Disassembling);
        listener.removeListener(Disassembling.autoDisassembling);
        listener.removeListener(testCraft.autoCraftLevelling3);

        console.log("Paused listening to keyboard events");
        return;
     }
     else {
       // await listener.addListener(keyboardHandler);

         
            await listener.addListener((event) => {
                keyboardHandler(event, getItemPos,getSellTabPos)
            })
            
            await listener.addListener((event) => {
                Disassembling.Disassembling(event, { x: 1406, y: 429 })
            })
            await listener.addListener((event) => {
                autoPurchaseItem(event, {x: 1207, y: 548},{x: 1286, y:554}, {x:1275, y:553}, "ITEM",30, 0)
            })

            await listener.addListener((event) => {
                Disassembling.autoDisassembling(
                event, 
                npcItemPos,
                inventoryPos , 
                DisassemblePos,
                confirmBtnPos, 
                tradeBtnPos , 
                beginBtnPos,
                successBtnPos, 
                itemCategory,
                totalOfItems,
                quantity 
                )
            })

            await listener.addListener((event) => {
                testCraft.autoCraftLevelling3(
                    event, 
                    MaterialPos,
                    craftTablePos,
                    AmountBtnPos,
                    990,
                    craftBeginBtnPos,
                    successBtnPos,
                    getItemPos,
                    confirmBtnPos,
                    tradeBtnPos,
                    materialBtnPos,
                    totalItemsToCraft,
                    arr

                )
            })
            
        console.log("Start listening to keyboard events"); 
      
    }

})

moveButton.addEventListener("clicked", () => {
   
    console.log(mouseInput1.text(), mouseInput2.text())
    if(mouseInput1.text()  || mouseInput2.text()) {
        const startTime = performance.now();
        console.log("Start time", startTime)
        Disassembling.delay(200);
        move(mouseInput1.text(), mouseInput2.text());
        const endNow = performance.now();
        console.log("End time", endNow)
        console.log(`Elapsed time: ${(endNow - startTime ).toFixed(3)} ms`);     
    }
   
})

startButton.addEventListener("clicked", () => {
    if (!isListening) {
        label.setText("Listening for mouse events...");
        isListening = true;
        stopButton.setEnabled(true);
        startButton.setEnabled(false);

        mouseEvents.on("mouseup", (event) => {
            const mouse = robot.getMousePos();
            const hex = robot.getPixelColor(mouse.x, mouse.y);
            console.log(`Mouse clicked at x:${mouse.x}, y:${mouse.y}, color:#${hex}`);
            const mouseData = {
                x: mouse.x,
                y: mouse.y,
                color: `#${hex}`,
            };
            test2.push(mouseData)
            console.log(test2);
        });
    }
});

stopButton.addEventListener("clicked", () => {
    if (isListening) {
        label.setText("Stopped listening for mouse events.");
        isListening = false;
        stopButton.setEnabled(false);
        startButton.setEnabled(true);

        mouseEvents.pauseMouseEvents();
       
    }
});

function _getActiveWindows() {
    const windows = windowManager.getWindows();

    windows.forEach(win => {
        console.log("Titles :", win.getTitle());
        if (win.getTitle().endsWith("Arua")) {
            arr.push(win); // Only push if the title includes "Arua"
        }
    });

}


/* function _getActiveWindows() {
    const windows = windowManager.getWindows();
    const arr = windows.filter(win => win.getTitle().includes("Arua")); // Only returns matching windows
    console.log("Filtered windows:", arr);
    return arr;
}
 */

(async()=> {
    console.log("Operation has started")
    const windows = _getActiveWindows();
    console.log("Log windows", windows);
    console.log("Log arr", arr);
    
  
   
})();

// Show the window
win.show();

global.win = win; // Prevent garbage collection
