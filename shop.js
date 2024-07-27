const myForm = document.querySelector('form');
const formBtn = myForm.querySelector('button')
const myInput = document.querySelector('form input');

const shopUl = document.querySelector('ul');

const shopFilter = document.querySelector('.filter .filterItem');
const clearShopItem = document.querySelector('.clear button');
let isSetItem = false;
// loading item from local storage

function displaylist(){
    let ItemFromStorage = getShopItem();

    ItemFromStorage.forEach(item => shopListItem(item));
    checkUi()
}

// for the add of shop item
function addShopItem(e){
    e.preventDefault(); 
    const shopInput = myInput.value
    if(myInput.value === ''){
        alert('field cannot be empty')
        return
    }
    
    if(isSetItem){
        let checkItem = shopUl.querySelector('edit-item');
        removeLocal(checkItem);
        checkItem.classList.remove('edit-item');
        checkItem.remove()

        isSetItem = false;
    }else{
        if(checkItemExist(shopInput)){
            alert('item already exist');
            return;
        }
    }

    
   
    shopListItem(shopInput);
    addToLocalStorage(shopInput);
    myInput.value = '';
}

//shop item function to create a list.

function shopListItem(item){
    const shopList = document.createElement('li');
    
    shopList.className = 'shopList';
    
    shopList.appendChild(document.createTextNode(item));
    shopList.appendChild(listBtn());

    shopUl.appendChild(shopList);

   return;
  
}

//creating a button function.

function listBtn(){
    const listBtn = document.createElement('button');
    listBtn.className = 'listBtn';
    
    const iconLi = document.createElement('i');
    iconLi.className = 'fa-solid fa-xmark red';
    iconLi.style.backgroundColor = 'transparent';
    iconLi.style.border = 'none';

    listBtn.appendChild(iconLi);
    return listBtn;
}

//adding to local storage

function addToLocalStorage(item){
    let shopItemToStore = getShopItem()

    //pushing the item to local storage to store as array
    shopItemToStore.push(item);

    // coverting it to a string

    localStorage.setItem('store', JSON.stringify(shopItemToStore));
    
    
}


function getShopItem(){
    let shopItemToStore;

    if(localStorage.getItem('store') === null){
        shopItemToStore = [];
    }else{
        shopItemToStore = JSON.parse(localStorage.getItem('store'));
    }

    checkUi()
    return shopItemToStore;
}


// to filter item

function filterItem(e){
    let shopfilterItem = e.target.value.toLowerCase();
    const shopListItem  = shopUl.querySelectorAll('li');

    shopListItem.forEach(item =>{
        const pp = item.firstChild.textContent.toLowerCase();
        
        if(pp.indexOf(shopfilterItem) != -1){
            item.style.display = 'flex';
        }else{
            item.style.display = 'none';
        }
    })
}

    function removeList(e){
        const shopListItem  = shopUl.querySelectorAll('li');
        if(e.target.parentElement.classList.contains('listBtn')){
        removeListItem(e.target.parentElement.parentElement);
        }else{
            setEditItem(e.target);
        }
        
    }

    function setEditItem(myItem){
        isSetItem = true;

            shopUl.querySelectorAll('li').forEach(i => {
                i.classList.remove('edit-item');
            })

        myItem.classList.add('edit-item');
        formBtn.innerHTML = 'Update Item';
        formBtn.style.backgroundColor = 'green'
        myInput.value = myItem.textContent;
    }

function removeListItem(item){
    if(confirm('are you sure')){

        item.remove();

        removeLocal(item.textContent);
        checkUi();
    }
}
//remove form local storage

function removeLocal(item){
    let removeFromLocal = getShopItem();

    removeFromLocal = removeFromLocal.filter((items) => items != item);

    localStorage.setItem('store',JSON.stringify(removeFromLocal))
}

//to clear all the whole list even from local storage;

function deleteList(){
    while(shopUl.firstChild){
        shopUl.removeChild(shopUl.firstChild)
    }
    localStorage.removeItem('store')
    checkUi();
}

function checkItemExist(item){
    const checkItem  = getShopItem();
    return checkItem.includes(item);
}

function checkUi(){
    const shopListItem  = shopUl.querySelectorAll('li');
    if(shopListItem.length === 0){
        shopFilter.style.display = 'none'
        clearShopItem.style.display = 'none'
    }else{
        shopFilter.style.display = 'block'
        clearShopItem.style.display = 'block'
    }

    formBtn.innerHTML = 'Add Item';
        formBtn.style.backgroundColor = 'black'
}

checkUi();
// to clear all the list





myForm.addEventListener('submit', addShopItem);
shopUl.addEventListener('click',removeList);
clearShopItem.addEventListener('click',deleteList);
shopFilter.addEventListener('input',filterItem);
document.addEventListener('DOMContentLoaded', displaylist)
