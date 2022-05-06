const items = document.querySelector('.items');
const input = document.querySelector('.footer__input');
const addBtn = document.querySelector('.footer__button');

function onAdd() {
    // 1. 사용자가 입력한 텍스트를 받아옴
    const text = input.value;
    // console.log(text);

    if(text === '') {
        input.focus();
        alert('텍스트를 입력해주세요.');
        return;
    }

    // 2. 받아온 텍스트를 사용하여 새로운 아이템을 만듬 (텍스트 + 삭제버튼)
    const item = createItem(text);
    
    // 3. items 컨테이너 안에 새로 만든 아이템 추가
    items.appendChild(item);

    // 4. 새로 추가된 아이템으로 스크롤링
    item.scrollIntoView({  block: 'center' }); 

    // 5. 인풋 초기화 
    input.value = '';
    input.focus();
}

// UUID 혹은 object의 hascode를 사용해서 고유한 애들을 만드는게 사실 더 좋음..
let id = 0; 

function createItem(text) {
    const itemRow = document.createElement('li');
    itemRow.setAttribute('class', 'item__row');
    itemRow.setAttribute('data-id', id);

    itemRow.innerHTML = `
    <div class="item">
        <span class="item__name">${text}</span>
        <button class="item__delete">
            <i class="fas fa-trash-alt" data-id = ${id}></i>
        </button>
    </div>
    <div class="item__divider"></div>
    `;
    id++;

    return itemRow;
}

addBtn.addEventListener('click', () => {
    onAdd();
});

input.addEventListener('keypress', (event) =>{
    if(event.key === 'Enter') {
        onAdd();
    }
});

items.addEventListener('click', (event)=>{
    const id = event.target.dataset.id

    if(id) {
        const toBeDeleted =document.querySelector(`.item__row[data-id="${id}"]`);
        toBeDeleted.remove();
    }
})