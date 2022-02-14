function saveInputs(title, author) {
  const formObj = {
    titleField: title.value,
    authorField: author.value,
  };

  localStorage.setItem('formBook', JSON.stringify(formObj));
}

export { saveInputs as default };