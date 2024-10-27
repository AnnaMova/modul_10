const button = document.querySelector('.button');

button.addEventListener('click', () => {
  const width = window.innerWidth;
  const height = window.innerHeight;
  alert(`Ширина экрана: ${width}px\nВысота экрана: ${height}px`);
});