const bookSubmit = document.querySelector('#book-submit');
const title = document.querySelector('#title');
const author = document.querySelector('#author');
let library = [];
if (localStorage.getItem('library') != null) {
  library = JSON.parse(localStorage.getItem('library'));
}
const bookWrapper = document.querySelector('#book-wrapper');

class book {
  constructor (title, author) {
    this.title = title;
    this.author = author;
  }

  addBook () {
    library.push({title: this.title, author: this.author});
    localStorage.setItem('library', JSON.stringify(library));
  }
}

function removeBooks(e) {
  const { id } = e.currentTarget;
  library.splice(id - 1, 1);
  localStorage.setItem('library', JSON.stringify(library));
  bookWrapper.innerHTML = '';
  createBooks();
}

function createBooks() {
  library.forEach((book, index) => {
    const div = document.createElement('div');
    div.id = `book-${index + 1}`;
    div.innerHTML = `
  <h2>${book.title}</h2>
  <h3>${book.author}</h3>
  <button type="button" class="remove-book" id="${index + 1}">Remove</button>
  <hr>
  `;
    bookWrapper.appendChild(div);

    const buttons = document.getElementById(`${index + 1}`);
    buttons.addEventListener('click', removeBooks);
  });
}

document.addEventListener('DOMContentLoaded', createBooks);

function addBook(e) {
  e.preventDefault();

  const book = {
    title: title.value,
    author: author.value,
  };

  library.push(book);
  localStorage.setItem('library', JSON.stringify(library));

  bookWrapper.innerHTML = '';
  createBooks();

  title.value = '';
  author.value = '';
}

bookSubmit.addEventListener('submit', addBook);

bookSubmit.addEventListener('submit', () => {
  e.preventDefault();
  let someBook = new book (title.value, author.value);

  someBook.addbook();
  createBooks();
});
