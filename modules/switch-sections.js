function switchDisplay(bookList, addBook, contact) {
  bookList.classList.add('not-display');
  addBook.classList.add('not-display');
  contact.classList.add('not-display');
}

export { switchDisplay as default };