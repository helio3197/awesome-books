const bookSubmit = document.querySelector('#book-submit');
const title = document.querySelector('#title');
const author = document.querySelector('#author');
let library = [];
if (localStorage.getItem('library') != null) {
  library = JSON.parse(localStorage.getItem('library'));
}
const bookWrapper = document.querySelector('#book-wrapper');

class book {
  constructor (title, author, id) {
    this.title = title;
    this.author = author;
    this.id = id;
  }

  addBook (bookInstance) {
    library.push(bookInstance);
    localStorage.setItem('library', JSON.stringify(library));
  }

  removeBook (){
    library.forEach((e, i, lib) => {
      if(e.id === this.id){
        lib.splice(i, 1);
      }
    })
    createBooks();
  }

  /*
  removeBook (e) {
    const id = e.currentTarget.id
    library.splice(id - 1, 1);
    localStorage.setItem('library', JSON.stringify(library));
    bookWrapper.innerHTML = '';
    createBooks(this);  
  }*/
}

function createBooks() {

  bookWrapper.innerHTML = '';
  library.forEach((book, index) => {
    const div = document.createElement('div');
    div.id = `book-${book.id}`;
    div.innerHTML = `
    <h2>${book.title}</h2>
    <h3>${book.author}</h3>
    <button type="button" class="remove-book" id="${index + 1}">Remove</button>
    <hr>
    `;
    bookWrapper.appendChild(div);

    const buttons = document.getElementById(`${index + 1}`);
    buttons.addEventListener('click', book.removeBook);
  });
}

document.addEventListener('DOMContentLoaded', () => {

});

let bookId = 0;
if (library.length !== 0) {
  bookId = library[-1].id;
} 

bookSubmit.addEventListener('submit', (e) => {
  e.preventDefault();
  bookId = bookId + 1;
  let someBook = new book (title.value, author.value, bookId);

  someBook.addBook(someBook);
  createBooks();
});
