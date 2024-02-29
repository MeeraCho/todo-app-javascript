const form = document.querySelector('form');
const itemInput = document.querySelector('input');
const btn = document.querySelector('btn');
const itemList = document.querySelector('ul');
const clearBtn = document.querySelector('#clear-all');
const filterInput = document.querySelector('#filter');

//------------- add item to the list ---------------
function onSubmitList(e){
    e.preventDefault();

    const newItem = itemInput.value;

    // validation 
    if ( itemInput.value === ''){
        alert('Please add an item.');
        return;
    }

    // Create list item
    const li = document.createElement('li');
    li.appendChild(document.createTextNode(newItem));
    li.appendChild(createDeleteBtn('delete-btn btn-link text-yellow'));

    itemList.appendChild(li);
    
    itemInput.value = '';

    resetUI();
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

//----------------- remove items ----------------
function removeItem(e){
    if(e.target.tagName === 'I'){
        e.target.parentElement.parentElement.remove()
    }

    resetUI();
}

function clearAll(e){
    if (confirm('Are You Sure You Want to Delete All?')){
        while(itemList.firstChild){
            itemList.firstChild.remove()
        }
    }

    resetUI();
}


form.addEventListener('submit', onSubmitList);
itemList.addEventListener('click', removeItem);
clearBtn.addEventListener('click', clearAll);

resetUI()



