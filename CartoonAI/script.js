const uploadBtns = document.querySelectorAll('.modal-upload');
const inputFile = document.querySelector('.file');

uploadBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    inputFile.click();
  })
});

inputFile.addEventListener('change', (event) => {
  const files = event.target.files;
  if (files.length) {
    console.log('Выбранный файл:', files); // Вывод файла в консоль
  }
});