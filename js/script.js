function handleScroll() {
    let header = document.querySelector('.header-animate');
    if (window.scrollY > 20) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
}
window.addEventListener('scroll', handleScroll);
window.addEventListener('resize', handleScroll);
window.addEventListener('load', handleScroll);
const body = document.querySelector('.body');
const burger = document.querySelector('.header__burger');
const headerMenu = document.querySelector('.header__menu');
burger.addEventListener('click', function() {
    headerOpened()
});
function headerOpened(){
    headerMenu.classList.toggle('active');
    burger.classList.toggle('active');
    if (headerMenu.classList.contains('active')) {
        body.style.overflow = 'hidden';
    } else {
        body.style.overflow = '';
    }
}
window.addEventListener('load', checkScreenWidth);
window.addEventListener('resize', checkScreenWidth);
function checkScreenWidth() {
    if (window.innerWidth > 999 && headerMenu.classList.contains('active')) {
        document.body.style.overflow = '';
        headerMenu.classList.remove('active');
        burger.classList.remove('active');
    }
}
const headerLink = document.querySelectorAll('.header__link, .header__btn');
headerLink.forEach(element => {
    element.addEventListener('click', function() {
        if (window.innerWidth < 1000 && headerMenu.classList.contains('active')) {
            headerOpened()
        }
    });
});
const submitForm = document.querySelector('.submitForm');
const formSentMessage = document.querySelector('.footer__form-sent');
const formSentMessageError = document.querySelector('.footer__form-sent-error');
submitForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    try {
        const response = await fetch(event.target.action, {
            method: 'POST',
            body: new FormData(event.target),
        });

        if (!response.ok) {
            throw new Error(`Error: ${response.status}`);
        }    
        const contentType = response.headers.get('content-type');
        if (!contentType || !contentType.includes('application/json')) {
            throw new Error('Error.');
        }    
        const json = await response.json();
        if (json.result === "success") {
            submitForm.reset();
            formSentMessage.classList.add('show');
            setTimeout(() => {
                formSentMessage.classList.remove('show');
            }, 2000);
        } else {
            formSentMessageError.classList.add('show');
            setTimeout(() => {
                formSentMessageError.classList.remove('show');
            }, 2000);
        }
    } catch (error) {
        alert(error.message);
    }
});