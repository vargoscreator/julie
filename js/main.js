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
    
});
