const toggleBtn = document.querySelector('.navbar_toggleBtn');
const menu = document.querySelector('.menu');

toggleBtn.addEventListener('click', function() {
    menu.classList.toggle('active');
});