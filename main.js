class Book {
  constructor(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
  }
}

class Library {
  constructor() {
    this.myLibrary = [];
    this.bookList = document.querySelector('.book-list');
    this.showFormBtn = document.querySelector('.show-form-btn');
    this.formContainer = document.querySelector('.form-container');
    this.cancelFormBtn = document.querySelector('.cancel-form-btn');
    this.form = document.querySelector('form');
    this.bookInput = document.querySelector('#book-input');
    this.authorInput = document.querySelector('#author-input');
    this.pagesInput = document.querySelector('#pages-input');
    this.readInput = document.querySelector('#read-status');
    this.addBookBtn = document.querySelector('.add-book-btn');

    this.showFormBtn.addEventListener('click', this.showForm.bind(this));
    this.cancelFormBtn.addEventListener('click', this.cancelForm.bind(this));
    this.addBookBtn.addEventListener('click', this.submitBook.bind(this));
    this.bookList.addEventListener('click', this.handleBookActions.bind(this));
  }

  showForm() {
    this.formContainer.style.transform = 'scale(1.3)';
    this.formContainer.style.transition = 'transform .3s';
  }

  cancelForm(event) {
    event.preventDefault();
    this.formContainer.style.transform = 'scale(0)';
    this.form.reset();
  }

  addBookToLibrary(newBook) {
    this.myLibrary.push(newBook);
  }

  createTd(book) {
    const tr = document.createElement('tr');

    const cellData = [book.title, book.author, book.pages];
    cellData.forEach(data => {
      const td = document.createElement('td');
      td.textContent = data;
      tr.appendChild(td);
    });

    const readBtn = document.createElement('button');
    readBtn.textContent = book.read ? 'READ' : 'NOT READ';
    readBtn.style.backgroundColor = book.read ? 'green' : 'red';
    const readTd = document.createElement('td');
    readTd.appendChild(readBtn);
    tr.appendChild(readTd);

    this.createRemoveBtn(tr);

    this.bookList.appendChild(tr);
  }

  changeReadStatus(readBtn) {
    const tr = readBtn.parentElement.parentElement;
    const bookIndex = Array.from(this.bookList.children).indexOf(tr);

    if (bookIndex >= 0) {
      this.myLibrary[bookIndex].read = !this.myLibrary[bookIndex].read;
      readBtn.textContent = this.myLibrary[bookIndex].read ? 'READ' : 'NOT READ';
      readBtn.style.backgroundColor = this.myLibrary[bookIndex].read ? 'green' : 'red';
    }
  }

  createRemoveBtn(parent) {
    const tdBtn = document.createElement('td');
    const removeBtn = document.createElement('button');
    removeBtn.textContent = 'Remove';

    tdBtn.appendChild(removeBtn);
    parent.appendChild(tdBtn);
  }

  removeCurrentBook(bookIndex) {
    if (bookIndex >= 0 && bookIndex < this.myLibrary.length) {
      this.myLibrary.splice(bookIndex, 1);
      this.updateBookList();
    }
  }

  updateBookList() {
    this.bookList.innerHTML = '';
    this.myLibrary.forEach(book => {
      this.createTd(book);
    });
  }

  submitBook(event) {
    event.preventDefault();

    if (!this.form.checkValidity()) {
      this.form.reportValidity();
      return;
    }

    let bookV = this.bookInput.value;
    let authorV = this.authorInput.value;
    let pagesV = this.pagesInput.value;
    let isRead = this.readInput.checked;

    this.addBookToLibrary(new Book(bookV, authorV, pagesV, isRead));
    this.updateBookList();

    this.form.reset();
    this.cancelForm(event);
  }

  handleBookActions(event) {
    const target = event.target;
    if (target.tagName === 'BUTTON') {
      const isReadBtn = target.textContent === 'READ' || target.textContent === 'NOT READ';
      if (isReadBtn) {
        this.changeReadStatus(target);
      } else if (target.textContent === 'Remove') {
        const tr = target.parentElement.parentElement;
        const bookIndex = Array.from(this.bookList.children).indexOf(tr);
        this.removeCurrentBook(bookIndex);
      }
    }
  }
}

const myLibraryApp = new Library();

const defaultBook = new Book('Re:Zero', 'Tappei Nagatsuki', 240, true);
myLibraryApp.addBookToLibrary(defaultBook);
myLibraryApp.updateBookList();