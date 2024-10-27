const btn = document.querySelector('.j-btn-test');
const icon = document.querySelector('.btn_icon');
btn.addEventListener('click', () => {
    document.querySelector('.bi-arrow-down-left-circle').classList.toggle('btn--magic');
    document.querySelector('.bi-arrow-up-left-circle').classList.toggle('btn--magic');
});

   