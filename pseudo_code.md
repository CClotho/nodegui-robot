When 3 is pressed and the state is down set startCrafting to true
Initially put materials for the first set 
start crafting
To handle error consistently press enter or click confirm dialog
When the crafted items reached 30 set switch to selling
minus the crafted items for every sold crafted items on the npc and reset the variables once finished
Every 6 items sold move one down
When the crafted items reached 99 refil and reset 99 to 0 

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

VARIABLES:
AUTO_CRAFT = false
CRAFTING_MODE = false
SELLING_MODE = false
REFILLING_MODE = false
currentCraftedItems = 0
totalCraftedItems = 0
soldItems = 0
