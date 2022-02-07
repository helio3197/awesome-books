const bookSubmit = document.querySelector('#book-submit');
const title = document.querySelector('#title');
const author = document.querySelector('#author');
let library = [];

library = JSON.parse(localStorage.getItem('library'));

library.forEach((book, index) => {
  const bookWrapper = document.querySelector('#book-wrapper');
  const div = document.createElement('div');
  div.innerHTML = `
  <h2>${book.title}</h2>
  <h3>${book.author}</h3>
  <button type="button" class="remove-book" id="${index+1}">Remove</button>
  `;
  bookWrapper.appendChild(div);
});

function addBook(e) {
  e.preventDefault();

  const book = {
    title: title.value,
    author: author.value,
  };

  library.push(book);
  localStorage.setItem('library', JSON.stringify(library));

  library.forEach((book, index) => {
    const bookWrapper = document.querySelector('#book-wrapper');
    const div = document.createElement('div');
    div.innerHTML = `
    <h2>${book.title}</h2>
    <h3>${book.author}</h3>
    <button type="button" class="remove-book" id="${index+1}">Remove</button>
    `;
    bookWrapper.appendChild(div);
  });
}

bookSubmit.addEventListener('submit', addBook);

