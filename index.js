import { Book, createBooks } from './modules/book-functions.js';
import saveInputs from './modules/save-form-data.js';
import switchDisplay from './modules/switch-sections.js';

const bookSubmit = document.querySelector('#book-submit');
const title = document.querySelector('#title');
const author = document.querySelector('#author');
const bookList = document.getElementById('book-list');
const addBook = document.getElementById('add-book');
const contact = document.getElementById('contact');
const bookWrapper = document.querySelector('#book-wrapper');
let library = [];
if (localStorage.getItem('library') != null) {
  library = JSON.parse(localStorage.getItem('library'));
}

title.addEventListener('input', () => {
  saveInputs(title, author);
});

author.addEventListener('input', () => {
  saveInputs(title, author);
});

document.addEventListener('DOMContentLoaded', () => {
  createBooks(library, bookWrapper);
  if (localStorage.getItem('formBook')) {
    const formObj = JSON.parse(localStorage.getItem('formBook'));
    title.value = formObj.titleField;
    author.value = formObj.authorField;
  }
  switchDisplay(bookList, addBook, contact);
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
  someBook.addBook(library);
  createBooks(library, bookWrapper);
  title.value = '';
  author.value = '';
  saveInputs(title, author);
});

const bookListNav = document.querySelector('[href="#book-list"]');
const addBookNav = document.querySelector('[href="#add-book"]');
const contactNav = document.querySelector('[href="#contact"]');

bookListNav.addEventListener('click', () => {
  switchDisplay(bookList, addBook, contact);
  bookList.classList.remove('not-display');
});

addBookNav.addEventListener('click', () => {
  switchDisplay(bookList, addBook, contact);
  addBook.classList.remove('not-display');
});

contactNav.addEventListener('click', () => {
  switchDisplay(bookList, addBook, contact);
  contact.classList.remove('not-display');
});
