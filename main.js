let myLibrary = [];

function Book(title, author, pages, read, data) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
  this.data = data;
}

function addBookToLibrary(newBook) {
  myLibrary.push(newBook);
}

const bookList = document.querySelector('.book-list');

function createTd(book) {
  const tr = document.createElement('tr');

  const cellData = [book.title, book.author, book.pages];
  cellData.forEach(data => {
    const td = document.createElement('td');
    td.textContent = data;
    tr.appendChild(td);
  });

  const readBtn = document.createElement('button');
  readBtn.textContent = book.read ? 'READ' : 'NOT READ';
  const readTd = document.createElement('td');
  readTd.appendChild(readBtn);
  tr.appendChild(readTd);
  readBtn.addEventListener('click', () => changeReadStatus(readBtn));
  readBtn.setAttribute('data-num', book.data);

  createRemoveBtn(tr, book.data);

  bookList.appendChild(tr);
}

function changeReadStatus(readBtn) {
  const dataAttributeNum = Number(readBtn.getAttribute('data-num'));
  const bookToUpdate = myLibrary.find(book => book.data === dataAttributeNum);

  if (bookToUpdate) {
    bookToUpdate.read = !bookToUpdate.read;
    readBtn.textContent = bookToUpdate.read ? 'READ' : 'NOT READ';
  }
}

function createRemoveBtn(parent, dataAttributeNum) {
  const tdBtn = document.createElement('td');
  const removeBtn = document.createElement('button');
  removeBtn.textContent = 'Remove';
  removeBtn.setAttribute('data-num', dataAttributeNum);

  tdBtn.appendChild(removeBtn);
  parent.appendChild(tdBtn);

  removeBtn.addEventListener('click', removeCurrentBook);

  function removeCurrentBook() {
    const dataAttributeNum = Number(removeBtn.dataset.num);

    myLibrary = myLibrary.filter(book => book.data !== dataAttributeNum);
    parent.remove();
  }
}

const showFormBtn = document.querySelector('.show-form-btn');
const formContainer = document.querySelector('.form-container');
function showForm() {
  formContainer.style.display = 'block';
}

showFormBtn.addEventListener('click', showForm);

const form = document.querySelector('form');
const bookInput = document.querySelector('#book-input');
const authorInput = document.querySelector('#author-input');
const pagesInput = document.querySelector('#pages-input');
const readInput = document.querySelector('#read-status');

const addBookBtn = document.querySelector('.add-book-btn');

function submitBook(event) {
  event.preventDefault();

  if (!form.checkValidity()) {
    form.reportValidity();
    return;
  }

  let bookV = bookInput.value;
  let authorV = authorInput.value;
  let pagesV = pagesInput.value;
  let isRead = readInput.checked;
  let dataAttribute = myLibrary.length;

  addBookToLibrary(new Book(bookV, authorV, pagesV, isRead, dataAttribute));

  createTd(myLibrary[myLibrary.length - 1]);

  form.reset();
}

addBookBtn.addEventListener('click', submitBook);
