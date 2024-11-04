const hamburger = document.querySelector('.hamburger');
const navLink = document.querySelector('.menu-bar-link');
hamburger.addEventListener('click', () => {  
    navLink.classList.toggle('hide');
    hamburger.classList.toggle('active');
});

navLink.addEventListener('click', () => {  
    navLink.classList.toggle('hide');
    hamburger.classList.toggle('active');
});

window.onresize = function(){
    if(window.innerWidth > 600){
        navLink.classList.remove('hide');
        hamburger.classList.add('active');
    }
}