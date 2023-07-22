let myLibrary = [];

function Book(title, author, pages,read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
};

function addBookToLibrary(newBook) {
  myLibrary.push(newBook);
};

const tableHeader = document.querySelector('.table-header')

function createTd(title, author, pages, read ){
  const tr =  document.createElement('tr');
  const cellData = [title, author, pages, read];

  cellData.forEach(data => {
    const td = document.createElement('td');
    td.textContent = data;
    tr.appendChild(td);
  }); 

  tableHeader.insertAdjacentElement('afterend', tr);
}



const showFormBtn = document.querySelector('.show-form-btn');
const formContainer = document.querySelector('.form-container');
function showForm(){
 formContainer.style.display = 'block'; 
}

showFormBtn.addEventListener('click', showForm);

const form = document.querySelector('form')
const bookInput = document.querySelector('#book-input');
const authorInput = document.querySelector('#author-input');
const pagesInput = document.querySelector('#pages-input');
const readInput = document.querySelector('#read-status');

const addBookBtn = document.querySelector('.add-book-btn');

let indexOfArray = 0;
let currentBook = myLibrary[indexOfArray];

function submitBook(event) {
  event.preventDefault(); 

  if (!form.checkValidity()) {
    form.reportValidity();
    return;
  }

  let bookV = bookInput.value;
  let authorV = authorInput.value;
  let pagesV = pagesInput.value;
  let isRead = readInput.checked ? true : false;

  addBookToLibrary(new Book(bookV, authorV, pagesV, isRead));

  currentBook = myLibrary[indexOfArray];
  createTd(currentBook.title, currentBook.author, 
    currentBook.pages, currentBook.read ? 'READ': 'NOT READ');

  ++indexOfArray;
  form.reset()
}



addBookBtn.addEventListener('click', submitBook);