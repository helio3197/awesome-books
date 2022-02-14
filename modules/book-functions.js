class Book {
  constructor(title, author, id) {
    this.title = title;
    this.author = author;
    this.id = id;
  }

  addBook(library) {
    library.push(this);
    localStorage.setItem('library', JSON.stringify(library));
  }

  removeBook(library) {
    library.forEach((e, i, lib) => {
      if (e.id === this.id) {
        lib.splice(i, 1);
      }
    });
    localStorage.setItem('library', JSON.stringify(library));
  }
}

function createBooks(library, bookWrapper) {
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
      book.removeBook(library);
      createBooks(library, bookWrapper);
    });
  });
}

export { Book, createBooks };
