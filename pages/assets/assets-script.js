import Swiper from 'swiper';
import {Navigation, Pagination, Controller, EffectFade, Autoplay, Thumbs} from 'swiper/modules';

Swiper.use([Navigation, Pagination, Controller, EffectFade, Autoplay, Thumbs]);

document.addEventListener('DOMContentLoaded', () => {
    function createSlider(sliderSelector, navPrevSelector, navNextSelector, paggerSelector) {
        const sliderEl = document.querySelector(sliderSelector);

        if (!sliderEl) return null;

        const slides = sliderEl.querySelectorAll('.swiper-slide');
        const slidesCount = slides.length;

        // Базовые значения
        let slidesPerView = 3;
        let loop = true;
        let mobileSlides = 2;
        let desktopSlides = 3;

        // Настройки в зависимости от количества слайдов
        if (slidesCount === 1) {
            mobileSlides = 1;
            desktopSlides = 1;
            slidesPerView = 1;
            loop = false;
            sliderEl.classList.add('is-one-slide');
        }
        else if (slidesCount === 2) {
            desktopSlides = 2;
            slidesPerView = 2;
            loop = false;
            sliderEl.classList.add('is-two-slides');
        }
        else if (slidesCount === 3) {
            desktopSlides = 3;
            slidesPerView = 3;
            loop = false;
            sliderEl.classList.add('is-three-slides');
        }

        return new Swiper(sliderSelector, {
            slidesPerView,
            spaceBetween: 16,
            loop,
            navigation: {
                nextEl: navNextSelector,
                prevEl: navPrevSelector,
            },
            pagination: {
                el: paggerSelector,
                clickable: true
            },
            breakpoints: {
                0: {
                    slidesPerView: mobileSlides,
                    spaceBetween: 8,
                },
                600: {
                    slidesPerView: desktopSlides,
                    spaceBetween: 16,
                },
                768: {
                    slidesPerView,
                    spaceBetween: 16,
                },
            }
        });
    }

    const assetsVideosSlider = createSlider(
        '.assets__videos_slider',
        '.assets__videos_prev',
        '.assets__videos_next',
        '.assets__videos_slider-pagger'
    );

    const assetsGallerySlider = createSlider(
        '.assets__gallery_slider',
        '.assets__gallery_prev',
        '.assets__gallery_next',
        '.assets__gallery_slider-pagger'
    );

    //галерея
    const gallery = document.querySelector('.js-assets-gallery');

    if (!gallery) return;

    const links = gallery.querySelectorAll('a');

    if (links.length > 6) {
        for (let i = 6; i < links.length; i++) {
            links[i].remove();
        }
    }

    // слайдер с продуктами
    const assetsProductSlider = new Swiper('.assets__products_slider .swiper', {
        slidesPerView: 4,
        spaceBetween: 16,
        loop: true,
        navigation: {
            nextEl: '.assets__products_next',
            prevEl: '.assets__products_prev',
        },
        breakpoints: {
            0: {
                slidesPerView: 1.5,
                spaceBetween: 8,
            },
            600: {
                slidesPerView: 2,
                spaceBetween: 16,
            },
            768: {
                slidesPerView: 2.5,
                spaceBetween: 16,
            },
            900: {
                slidesPerView: 3,
                spaceBetween: 16,
            },
            1200: {
                slidesPerView: 4,
                spaceBetween: 16,
            },  
            1550: {
                slidesPerView: 3,
                spaceBetween: 16,
            }, 
            1860: {
                slidesPerView: 4,
                spaceBetween: 16,
            }, 
        }
    });
})

