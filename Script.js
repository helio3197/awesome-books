const bookSubmit = document.querySelector('#book-submit');
const title = document.querySelector('#title');
const author = document.querySelector('#author');
const library = [];

function addBook(e) {
  e.preventDefault();

  const book = {
    name: title.value,
    author: author.value,
  };

  library.push(book);
}

bookSubmit.addEventListener('submit', addBook);
