const form = document.querySelector('form');
const itemInput = document.querySelector('input');
const btn = document.querySelector('btn');
const itemList = document.querySelector('ul');
const clearBtn = document.querySelector('#clear-all');
const filterInput = document.querySelector('#filter');

//------------- add item to the list ---------------
function onAddItemSubmit(e){
    e.preventDefault();

    const newItem = itemInput.value;

    // validation 
    if ( itemInput.value === ''){
        alert('Please add an item.');
        return;
    }

    //save it to DOM
    addItemToDOM(newItem);

    //save it to Local Storage
    addItemToLocalStorage(newItem);

    resetUI();
    itemInput.value = '';
}

function addItemToDOM(newItem){
    const li = document.createElement('li');
    li.appendChild(document.createTextNode(newItem));
    li.appendChild(createDeleteBtn('delete-btn btn-link text-yellow'));

    itemList.appendChild(li);
}

function addItemToLocalStorage(newItem){
    const itemsFromStorage = getItemfromStorage()

    itemsFromStorage.push(newItem);
    localStorage.setItem('items', JSON.stringify(itemsFromStorage));
}

function getItemfromStorage() {
    let itemsFromStorage; 

    if(localStorage.getItem('items') === null){
        itemsFromStorage = [];
    } else {
        itemsFromStorage = JSON.parse(localStorage.getItem('items'));
    }
    return itemsFromStorage;
}

function createDeleteBtn(classes){
    const deleteBtn = document.createElement('button');
    deleteBtn.className = classes;

    const icon = createDeleteIcon('fa-solid fa-xmark')
    deleteBtn.appendChild(icon);

    return deleteBtn;
}

function createDeleteIcon(classes){
    const icon = document.createElement('i')
    icon.className = classes;
    return icon
}

//---------Display Item from Local Storage----------
function displayItems() {
    const itemsFromStorage = getItemfromStorage() 
    itemsFromStorage.forEach((item)=>addItemToDOM(item));
    resetUI();
}

//-----------------filter items----------------
function filterItems(e){
    const items = itemList.querySelectorAll('li');
    const text = e.target.value.toLowerCase();

    items.forEach((item)=>{
        const itemName = item.firstChild.textContent.toLowerCase();
        
        if (itemName.indexOf(text) != -1){
            item.style.display = 'flex'
        } else {
            item.style.display = 'none'
        }
    })
}

//-----------------Clear UI State----------------
function resetUI(){
    const items = itemList.querySelectorAll('li');
    if ( items.length === 0 ){
        filterInput.classList.add('hidden');
        clearBtn.classList.add('hidden');
    } else {
        filterInput.classList.remove('hidden');
        clearBtn.classList.remove('hidden');
    }
}

//----------------- Remove Items ----------------
function onClickRemoveItem(e){
    if(e.target.tagName === 'I'){
        removeItem(e.target.parentElement.parentElement)
    }
}

function removeItem(itemToRemove){
    //remove item from DOM
    itemToRemove.remove();

    //remove item from storage 
    removeItemfromStorage(itemToRemove.textContent)

    resetUI();
}

function removeItemfromStorage(itemToRemove){
    let itemsFromStorage = getItemfromStorage();

    // Filter out item to be removed
    itemsFromStorage = itemsFromStorage.filter((i) => (i != itemToRemove));

    // Re-set to localStorage
    localStorage.setItem('items', JSON.stringify(itemsFromStorage));
}

function clearAll(e){
    if (confirm('Are You Sure You Want to Delete All?')){
        // Clear All from DOM
        while(itemList.firstChild){
            itemList.firstChild.remove()
        }

        // Clear All from localStorage
        localStorage.removeItem('items')
    }
    resetUI();
}

//----------------- Event Listeners ----------------
function init(){
    form.addEventListener('submit', onAddItemSubmit);
    itemList.addEventListener('click', onClickRemoveItem);
    clearBtn.addEventListener('click', clearAll);
    filterInput.addEventListener('input', filterItems);
    document.addEventListener('DOMContentLoaded', displayItems);
    
    resetUI()
}

init();




