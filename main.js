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

const book1 = new Book('Re:Zero', 'Tappei Nagatsuki', 240, true); 
const book2 = new Book('Re:Zero', 'Tappei Nagatsuki', 240, true); 

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

createTd(book1.title, book1.author, book1.pages, book1.read)