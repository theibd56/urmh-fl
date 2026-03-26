import Swiper from 'swiper';
import {Navigation, Pagination, Controller, EffectFade, Autoplay, Thumbs} from 'swiper/modules';

Swiper.use([Navigation, Pagination, Controller, EffectFade, Autoplay, Thumbs]);

document.addEventListener('DOMContentLoaded', () => {
    
    const aboutProductSlider = new Swiper('.about__products_slider .swiper', {
        slidesPerView: 5,
        spaceBetween: 8,
        loop: true,
        navigation: {
            nextEl: '.slider__next',
            prevEl: '.slider__prev',
        },
        pagination: {
            el: '.about__products_slider-pagger',
            clickable: true,
        },
        breakpoints: {
            0: {
                slidesPerView: 1.34,
                spaceBetween: 8,
            },
            350: {
                slidesPerView: 1.65,
                spaceBetween: 8,
            },
            480: {
                slidesPerView: 2.16,
                spaceBetween: 8,
            },
            600: {
                slidesPerView: 3.1,
                spaceBetween: 8,
            },
            730: {
                slidesPerView: 3,
                spaceBetween: 8,
            },
            900: {
                slidesPerView: 3.5,
                spaceBetween: 16,
            },
            1024: {
                slidesPerView: 4,
                spaceBetween: 16,
            },
            1277: {
                slidesPerView: 5,
                spaceBetween: 16,
            },
            
        }
    });

    const VideosSlider = document.querySelector('.about__videos_slider');
    const VideosItem = sliderEl.querySelectorAll('.about__videos_item');

    const VideosNextBtn = document.querySelector('.about__videos_next');
    const VideosPrevBtn = document.querySelector('.about__videos_prev');

    if (slides.length <= 1) {
        sliderEl.classList.remove('swiper');
        slides.forEach(slide => slide.style.width = '100%');
        if (nextBtn) nextBtn.style.display = 'none';
        if (prevBtn) prevBtn.style.display = 'none';
    } else {
        new Swiper('.about__videos_slider', {
            slidesPerView: 1,
            spaceBetween: 8,
            loop: true,
            speed: 600,
            navigation: {
                nextEl: '.about__videos_next',
                prevEl: '.about__videos_prev',
            },
            pagination: {
                el: '.about__videos_slider-pagger',
                clickable: true,
            },
            breakpoints: {
                0: {
                    slidesPerView: 1,
                    spaceBetween: 8,
                },
                320: {
                    slidesPerView: 1.3,
                    spaceBetween: 8,
                },
                480: {
                    slidesPerView: 2,
                    spaceBetween: 8,
                },
                769: {
                    slidesPerView: 2,
                    spaceBetween: 16,
                },
            }
        });
    }


    const GallerySlider = document.querySelector('.about__gallery_slider');
    const GalleryItem = sliderEl.querySelectorAll('.about__gallery_item');

    const nextBtn = document.querySelector('.about__gallery_next');
    const prevBtn = document.querySelector('.about__gallery_prev');

    if (slides.length <= 1) {
        sliderEl.classList.remove('swiper');
        slides.forEach(slide => slide.style.width = '100%');
        if (nextBtn) nextBtn.style.display = 'none';
        if (prevBtn) prevBtn.style.display = 'none';
    } else {
        new Swiper('.about__gallery_slider', {
            slidesPerView: 1,
            spaceBetween: 8,
            loop: true,
            speed: 500,
            navigation: {
                nextEl: '.about__gallery_next',
                prevEl: '.about__gallery_prev',
            },
            pagination: {
                el: '.about__gallery_slider-pagger',
                clickable: true,
            },
            breakpoints: {
                0: {
                    slidesPerView: 1.34,
                    spaceBetween: 8,
                },
                350: {
                    slidesPerView: 1.5,
                    spaceBetween: 8,
                },
                425: {      
                    slidesPerView: 1.9,
                    spaceBetween: 8,
                },
                480: {
                    slidesPerView: 2.3,
                    spaceBetween: 8,
                },
                600: {
                    slidesPerView: 3,
                    spaceBetween: 8,
                },
                769: {
                    slidesPerView: 3,
                    spaceBetween: 16,
                },
                1024: {
                    slidesPerView: 4,
                    spaceBetween: 16,
                },
                1100: {
                    slidesPerView: 5,
                    spaceBetween: 16,
                },
                1742: {
                    slidesPerView: 7,
                    spaceBetween: 16,
                },
            }
        });
    }


    document.querySelectorAll('.js-about-sort').forEach(sort => {
        const current = sort.querySelector('.about-sort__current');
        const value = sort.querySelector('.about-sort__value');
        const optionsWrap = sort.querySelector('.about-sort__options');

        let selectedOption = optionsWrap.querySelector('.about-sort__option');

        value.textContent = selectedOption.textContent;
        selectedOption.remove();

        current.addEventListener('click', () => {
            sort.classList.toggle('active');
        });

        optionsWrap.addEventListener('click', e => {
            const option = e.target.closest('.about-sort__option');
            if (!option) return;
            optionsWrap.appendChild(selectedOption);
            selectedOption = option;
            value.textContent = option.textContent;
            option.remove();

            sort.classList.remove('active');
        });

        document.addEventListener('click', e => {
            if (!sort.contains(e.target)) {
                sort.classList.remove('active');
            }
        });
        optionsWrap.addEventListener('click', e => {
            const option = e.target.closest('.about-sort__option');
            if (!option) return;

            optionsWrap.appendChild(selectedOption);

            selectedOption = option;
            value.textContent = option.textContent;
            option.remove();

            sort.classList.remove('active');

            const country = option.dataset.value;
            const maps = document.querySelectorAll('.about__locations_map-item');

            maps.forEach(map => {
                map.classList.remove('active');

                if (map.dataset.map === country) {
                    map.classList.add('active');
                }
            });
        });
    });

});