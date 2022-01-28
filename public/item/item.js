const { default: axios } = require("axios");

const navbar = document.querySelector('.navbar');
const mainBox = document.querySelector('.main_box');
const pagination = document.querySelector('.pagination');
const addBut = document.querySelector('.addButton');
const modalContainer = document.querySelector('.modalContainer');
const modalBox = document.querySelector('.modalBox');
const content = modalBox.querySelector('.content');
const modalCloseBut = modalBox.querySelector('.close');
const subBut = content.querySelector('.submitBut');

const listBox = {  //페이지에 세팅을 해줄 현재페이지와 타입
  currentPageNo : 1,
  type: 'all',
}

function paging(type, pagination) {
  let page = '';

  const prev = pagination.firstPageNoOnPageList - 1 > 0 ? 
    `<button data-current-page-no="${pagination.firstPageNoOnPageList}" data-type=${type}>&lt;</button>` : '';
  const next = pagination.lastPageNoOnPageList + 1 > pagination.totalPageCount ?
    `<button data-cuurent-page-no="${pagination.lastPageNoOnPageList}" data-type=${type}>다음</button>` : '';
  
  for(let i = pagination.firstPageNoOnPageList ; i < pagination.lastPageNoOnPageList + 1 ; i++) {
    if(i == pagination.currentPageNo) {
      page += `<button class="current" data-type=${type}>${i}</button>`;
    }else {
      page += `<button data-current-page-no="${i}" data-type=${type}>${i}</button>`;
    }
  }

  const html = `${prev}${page}${next}`;

  pagination.innerHTML = html;
}

async function list(type = 'all', currentPageNo = 1) {
  const result = await axios.get(`/item/list?currentPageNo=${currentPageNo}&type=${type}`, {
      header: {
        'Accept': 'application/json'
      }
  });

  listBox.currentPageNo = currentPageNo;
  listBox.type = type;

  const pagination = result.data.pagination;
  const items = result.data.items;
  console.log('pagination.items',pagination,items);

  let html = '';

  for(let i = 0; i < items.length; i++) {
    const item = items[i];
    const temp = `
            <div class="item item-${item.itemNumber}">
                ${item.itemtype} ${item.itemname} ${item.value} ${item.size} ${item.colors}
                <div class="item_change">
                    <button data-item-number="${item.itemNumber}" data-type="${item.itemtype}" class="modify" type="button">수정</button>
                    <button data-item-number="${item.itemNumber}" data-type="${item.itemtype}" class="delete" type="button">삭제</button>
                </div>
            </div>`
    html += temp;
  }
  if(html === '') {
    html += '<div class="item">데이터가 없습니다</div>';
  }

  mainBox.innerHTML = html;

  paging(type, pagination);

}

function prepareAdd() {
  modalContainer.classList.remove('hidden');
  content.action = 'add';
}

async function prepareModify(itemNumber) {  //dataset으로 type이랑 itemNumber가 들어있음
  const result = await axios.get(`/item/${itemNumber}`, {
    header : {
      'Accept' : 'application/json',
    }
  });

  const item = result.data.item;
  
  modalContainer.classList.remove('hidden');
  modalContainer.querySelector('.thumbnail').classList.remove('hidden');
  modalBox.classList.add('.modifySize');

  content.action = 'modify';

  const thumbnail = document.querySelector('.thumbnail');
  const itemNumber = document.querySelector('content input[name=itemNumber]');
  const itemType = document.querySelector('.content input[name=itemtype]');
  const itemName = document.querySelector('.content input[name=itemName]');
  const value = document.querySelector('.content input[name=value]');
  const size = document.querySelector('.content input[name=size]');
  const color = document.querySelector('.content input[name=color]');

  thumbnail.src = `${item.imgFilePath}/${item.filename}`;
  itemType.value = item.itemtype;
  itemName.value = item.itemname;
  value.value =item.value;
  size.value = item.size;
  color.value = item.color;
}

async function prepareDelete(itemNumber) {;
  const result = await axios.get(`/item/delete?itemNumber=${itemNumber}`, {
    headers: {
      'Accept': 'application/json',
    }
  });
  if(result === true) {
    list(listBox.type, listBox.currentPageNo);
  }

}

subBut.addEventListener('click', function(event) {
  const itemNumber = document.querySelector('content input[name=itemNumber]');
  const itemType = document.querySelector('.content input[name=itemtype]');
  const itemName = document.querySelector('.content input[name=itemName]');
  const img = document.querySelector('content input[name=img]');
  const value = document.querySelector('.content input[name=value]');
  const size = document.querySelector('.content input[name=size]');
  const color = document.querySelector('.content input[name=color]');

  const formData = new FormData();
  formData.append('itemNumber', itemNumber);
  formData.append('itemtype',(itemType.value);
  formData.append('itemName',itemName.value);
  formData.append('uploadImg',img.files[0]);
  formData.append('value',value.value);
  formData.append('size',size.value);
  formData.append('color',color.value);

  const action = content.action;
  const result = await axios.post(`${action}`,formData, {
    headers: {
      'Content-Type': 'multipart/form-data';
    }
  });

  if(result === true) {
    modalContainer.classList.add('.hidden');
    const pageNo = action.contains('modify') && listBox.currentPageNo; 
    //아이템을 추가할 경우에는 현재 페이지가 다시보일 필요가 없이 해당 타입의 1페이지가 보이면 됨
    modalContainer.querySelector('.thumbnail').classList.add('hidden');
    content.classList.remove('.modifySize');

    list(listBox.type, pageNo);

    itemNumber.value = '';
    itemType.value = '';
    itemName.value = '';
    value.value = '';
    size.value = '';
    color.value = '';
    img.value = '';
  }
});

navbar.addEventListener('click', function(event) {
  const target = event.target;
  if(target.classList.contains('clothes')) {
    return;
  }

  const type = target.dataset.type;
  
  console.log('type',type);
  list(type);
  //await list(type); --> 굳이 await를?
});

addBut.addEventListener('click',function(event){
  prepareAdd();
});

modalCloseBut.addEventListener('click',function() {
  const itemNumber = document.querySelector('content input[name=itemNumber]');
  const itemType = document.querySelector('.content input[name=itemtype]');
  const itemName = document.querySelector('.content input[name=itemName]');
  const img = document.querySelector('content input[name=img]');
  const value = document.querySelector('.content input[name=value]');
  const size = document.querySelector('.content input[name=size]');
  const color = document.querySelector('.content input[name=color]');

  modalContainer.querySelector('.thumbnail').classList.add('hidden');
  content.classList.remove('.modifySize');

  itemNumber.value = '';
  itemType.value = '';
  itemName.value = '';
  value.value = '';
  size.value = '';
  color.value = '';
  img.value = '';
})

pagination.addEventListener('click', function(event) {
  const target = event.target;
  const type = target.dataset.type;
  const currentPageNo = target.dataset.currentPageNo;

  console.log('type, currentPageNo',type, currentPageNo);
  list(type, currentPageNo);
  //await list(type, currentPageNo);
})

mainBox.addEventListener('click', (event) => {
  const target = event.target;
  const itemNumber = target.dataset.itemNumber;
  console.log('event',event);
  if (target.className === 'modify') {
    prepareModify(itemNumber);
  } else if (target.className === 'delete') {
    prepareDelete(itemNumber);
  }
});

