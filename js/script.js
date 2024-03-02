const form = document.querySelector('form');
const itemInput = document.querySelector('#item-input');
const formBtn = document.querySelector('.form-btn');
const itemList = document.querySelector('#item-list');
const clearBtn = document.querySelector('#clear-all');
const filterInput = document.querySelector('#filter');
let isEditMode = false;


//------------- add item to the list ---------------
function onAddItemSubmit(e){
    e.preventDefault();

    const newItem = itemInput.value;

    // validation 
    if ( itemInput.value === ''){
        alert('Please add an item.');
        return;
    }

    // check duplicate item 
    if (checkIfItemExists(newItem)){
        alert('That item already exists.')
        return;
    }

    // Check for edit mode
    if (isEditMode) {
        const itemToEdit = itemList.querySelector('.edit-mode');
        
        itemToEdit.remove();
        removeItemfromStorage(itemToEdit.textContent);

        itemToEdit.classList.remove('edit-mode');

        isEditMode = false; 
    } else {
        if (checkIfItemExists(newItem)){
            alert('That item already exists.')
            return;
        }
    }

    //save item to DOM
    addItemToDOM(newItem);

    //save item to Local Storage
    addItemToLocalStorage(newItem);

    resetUI();
    itemInput.value = '';
}

function addItemToDOM(newItem){
    const li = document.createElement('li');
    li.appendChild(document.createTextNode(newItem));
    li.appendChild(createDeleteBtn('remove-btn btn-link'));

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

//---------Check Duplicate Items----------
function checkIfItemExists(item){
    const itemsFromStorage = getItemfromStorage();
    return itemsFromStorage.includes(item)
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

//-----------------Reset UI State----------------
function resetUI(){
    itemInput.value = '';

    const items = itemList.querySelectorAll('li');
    if ( items.length === 0 ){
        filterInput.classList.add('hidden');
        clearBtn.classList.add('hidden');
    } else {
        filterInput.classList.remove('hidden');
        clearBtn.classList.remove('hidden');
    }

    formBtn.innerHTML = '<i class="fa-solid fa-plus"></i>';
    formBtn.classList.add('add-mode')
    
    isEditMode = false;
}

//----------------- Remove Items ----------------
function onClickRemoveItem(e){
    if(e.target.tagName === 'BUTTON'){
        removeItem(e.target.parentElement)
    }

    if(e.target.tagName === 'I'){
        removeItem(e.target.parentElement.parentElement)
    }

    if(e.target.tagName === 'LI'){
        setItemToEdit(e.target);
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

//----------------- Edit Items ----------------
function setItemToEdit(itemToEdit){
    isEditMode = true;

    itemToEdit.classList.add('edit-mode');
    formBtn.innerHTML = '<i class="fa-solid fa-pen"></i>';
    // formBtn.style.backgroundColor = '#228B22';
    itemInput.value = itemToEdit.textContent; 
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




