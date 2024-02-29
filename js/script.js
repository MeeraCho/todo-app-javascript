const form = document.querySelector('form');
const itemInput = document.querySelector('input');
const btn = document.querySelector('btn');
const itemList = document.querySelector('ul');

//---------- ---add item to the list ---------------
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

    itemInput.value = ''
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






form.addEventListener('submit', onSubmitList);




