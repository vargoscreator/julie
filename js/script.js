document.addEventListener("DOMContentLoaded", function () {
    let swiper = new Swiper(".collection__slider", {
        loop: false,
        spaceBetween: 12,
        initialSlide: 1,
        slidesPerView: 1,
        breakpoints: {
            768: {
                slidesPerView: 3,
            },
            1000: {
                slidesPerView: 4,
            },
        },
    });
    let testimonialsSwiper = new Swiper(".testimonials__slider", {
        loop: false,
        spaceBetween: 12,
        slidesPerView: 1,
        allowTouchMove: true,
        navigation: {
            nextEl: ".testimonials__slider-next",
            prevEl: ".testimonials__slider-prev",
        },
        breakpoints: {
            768: {
                allowTouchMove: false,
            },
        },
        on: {
            slideChange: function () {
                testimonialsSwiperImages.slideTo(this.activeIndex);
            },
        },
    });
    let testimonialsSwiperImages = new Swiper(".testimonials__slider-images", {
        loop: false,
        spaceBetween: 12,
        slidesPerView: 1,
        allowTouchMove: true,
        breakpoints: {
            768: {
                allowTouchMove: false,
            },
        },
        on: {
            slideChange: function () {
                testimonialsSwiper.slideTo(this.activeIndex);
            },
        },
    });
    const questionsItemsName = document.querySelectorAll('.questions__item-name');
    const questionsItems = document.querySelectorAll('.questions__item');
    questionsItemsName.forEach(item => {
        item.addEventListener('click', () => {
            const parentBlock = item.closest('.questions__item');
            if (parentBlock.classList.contains('active')) {
                parentBlock.classList.remove('active');
            } else {
                questionsItems.forEach(i => i.classList.remove('active'));
                parentBlock.classList.add('active');
            }
        });
    });
    function handleScroll() {
        let header = document.querySelector('header');
        
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
});
