/* jshint esversion: 6 */
const input=document.getElementById("input");
var items = [];

const itemsDiv = document.getElementById("list");

const storageKey = "key";

//MAIN functions in 'general' ORDER of execution:



function renderItems() { // **RESOLVE 'null' issue**
    itemsDiv.innerHTML = null; //REMOVES any elements/things in the div
    //const idx = { // Find a way to have the # value of idx increase by 1 everytime the "Add Item" btn is pressed OR whenever the addItem() fuction is used
        //btn.addEventListener("click", addItem() ){
        //    idx +=1
        //}

    //}
    for (let [idx, item] of Object.entries(items)) { //Object.entries() -- creates pairs (index, item#) --- google "mdn web docs Object.entries()" --> scroll down to "Iterating through an Object"
        const container = document.createElement("div");
        container.style.marginBottom = "10px";

        const text = document.createElement("p");
        text.style.display = "inline"; //button & text is orineted horizontally
        text.style.marginRight = "10px";
        text.textContent = `${item}`; // SOLVED!!! => PROBLEM: text used to be "undefined:undefined" --- now there's nothing as a list item && for the <p> element OR addItem() has issues pushing to "items" list

        const btn = document.createElement("button")
        btn.textContent = "Delete"
        btn.onclick = () => removeItems(idx) // try: btn.addEventListener("click", delButton(idx))// try: btn.onclick = () => removeItem(idx) --- this will "wrap" the removeItem(idx) in a function so that JS won't execute it right-way
        
        container.appendChild(text) // adds new p element to new div
        container.appendChild (btn) // adds new button element to new div
        itemsDiv.appendChild(container) // add new div inside old div
    }
}

//function delButton() { // for use with btn.addEventListener("click", delButton(idx)) inside renderItems() function
    //removeItems(idx)
//}

function loadItems() {
    const oldItems = localStorage.getItem(storageKey)
    if (oldItems) items = JSON.parse(oldItems)
    renderItems()
} // this uses LOCAL storage (on browser) -- on client side: can store str, num, etc. >>> arrays MUST be converted to str


function saveItems() {
    const stringItems = JSON.stringify(items);
    localStorage.setItem(storageKey, stringItems) //stringItems UPDATES all items under the storageKey

}



function addItem() {
    const value = input.value;
    if (!value) {
        alert("You CANNOT add an empty item!")
        return //this is called a "Naked Return" -- allows you to exit if statement
    }
    items.push(value); //
    renderItems()
    input.value = ""
    saveItems()
}


function removeItems(idx) {
    items.splice(idx, 1)
    renderItems()
    saveItems()
}



//renderItems() --- this was to test the renderItems() function

document.addEventListener("DOMContentLoaded", loadItems)// auto calls all saved items 

/*let btn = document.getElementById("btn");
btn.addEventListener("click", function() {
    return addItem()
})*/