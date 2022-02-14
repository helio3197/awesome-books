const bookSubmit = document.querySelector('#book-submit');
const title = document.querySelector('#title');
const author = document.querySelector('#author');
const bookList = document.getElementById('book-list');
const addBook = document.getElementById('add-book');
const contact = document.getElementById('contact');
let library = [];
if (localStorage.getItem('library') != null) {
  library = JSON.parse(localStorage.getItem('library'));
}
const bookWrapper = document.querySelector('#book-wrapper');

function saveInputs() {
  const formObj = {
    titleField: title.value,
    authorField: author.value,
  };

  localStorage.setItem('formBook', JSON.stringify(formObj));
}

title.addEventListener('input', saveInputs);

author.addEventListener('input', saveInputs);

class Book {
  constructor(title, author, id) {
    this.title = title;
    this.author = author;
    this.id = id;
  }

  addBook() {
    library.push(this);
    localStorage.setItem('library', JSON.stringify(library));
  }

  removeBook() {
    library.forEach((e, i, lib) => {
      if (e.id === this.id) {
        lib.splice(i, 1);
      }
    });
    localStorage.setItem('library', JSON.stringify(library));
    createBooks(); // eslint-disable-line
  }
}

function createBooks() {
  const bookCollection = library.map((bookData) => new Book(
    bookData.title, bookData.author, bookData.id,
  ));

  let number = 0;

  bookWrapper.innerHTML = '';
  bookCollection.forEach((book) => {
    const div = document.createElement('div');
    if (number % 2 === 0) {
      div.className = 'background';
    }
    number += 1;
    div.id = `book-${book.id}`;
    div.innerHTML = `
    <h2>${book.title}</h2>
    <p>by</p>
    <h3>${book.author}</h3>
    <button type="button" class="remove-book">Remove</button>
    `;
    bookWrapper.appendChild(div);

    const buttons = document.querySelector(`#book-${book.id} button`);
    buttons.addEventListener('click', () => {
      book.removeBook();
    });
  });
}

function switchDisplay() {
  bookList.classList.add('not-display');
  addBook.classList.add('not-display');
  contact.classList.add('not-display');
}

document.addEventListener('DOMContentLoaded', () => {
  createBooks();
  if (localStorage.getItem('formBook')) {
    const formObj = JSON.parse(localStorage.getItem('formBook'));
    title.value = formObj.titleField;
    author.value = formObj.authorField;
  }
  switchDisplay();
  bookList.classList.remove('not-display');
});

let bookId = 0;
if (library.length !== 0) {
  bookId = library.at(-1).id;
}

bookSubmit.addEventListener('submit', (e) => {
  e.preventDefault();
  bookId += 1;
  const someBook = new Book(title.value, author.value, bookId);
  someBook.addBook();
  createBooks();
  title.value = '';
  author.value = '';
  saveInputs();
});

const bookListNav = document.querySelector('[href="#book-list"]');
const addBookNav = document.querySelector('[href="#add-book"]');
const contactNav = document.querySelector('[href="#contact"]');

bookListNav.addEventListener('click', () => {
  switchDisplay();
  bookList.classList.remove('not-display');
});

addBookNav.addEventListener('click', () => {
  switchDisplay();
  addBook.classList.remove('not-display');
});

contactNav.addEventListener('click', () => {
  switchDisplay();
  contact.classList.remove('not-display');
});
