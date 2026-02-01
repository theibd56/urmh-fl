import Swiper from 'swiper';
import {Navigation, Pagination, Controller, EffectFade, Autoplay, Thumbs} from 'swiper/modules';

Swiper.use([Navigation, Pagination, Controller, EffectFade, Autoplay, Thumbs]);

//FAQ
    const items = document.querySelectorAll('.leasing-faq__item');

    items.forEach(item => {
        item.addEventListener('click', () => {
            const isActive = item.classList.contains('is-active');

            items.forEach(el => el.classList.remove('is-active'));

            if (!isActive) {
                item.classList.add('is-active');
            }
        });
    });

//slider
  const leasingProductSlider = new Swiper('.leasing__products_slider .swiper', {
      slidesPerView: 4,
      spaceBetween: 8,
      loop: true,
      navigation: {
          nextEl: '.leasing__products_next',
          prevEl: '.leasing__products_prev',
      },
      breakpoints: {
          0: {
              slidesPerView: 1.5,
              spaceBetween: 8,
          },
          480: {
              slidesPerView: 2.3,
              spaceBetween: 8,
          },
          600: {
              slidesPerView: 2.7,
              spaceBetween: 8,
          },
          768: {
              slidesPerView: 3,
              spaceBetween: 8,
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

//partners slider
const partnersSwiper = new Swiper(".leasing__partners_slider", {
    slidesPerView: 5,
    spaceBetween: 8,
    loop: true,
    breakpoints: {
      0: {
        enabled: true,
        slidesPerView: 1,
      },
      200: {
        slidesPerView: 1,
      },
      360: {
        slidesPerView: 1.5,
      },
      480: {
        slidesPerView: 2.2,
      },
      600: {
        slidesPerView: 2.9,
      },
      768: {
        slidesPerView: 2.9,
      },
      900: {
        slidesPerView: 3.5,
        spaceBetween: 16,
      },
      1024: {
        enabled: false,
        spaceBetween: 16, 
      },
    },
});
window.addEventListener("resize", initPartnersSwiper);
window.addEventListener("load", initPartnersSwiper);


//form
const form = document.querySelector('.leasing__request-form');
const inputs = form.querySelectorAll('.input-field');

form.addEventListener('submit', (e) => {
  let hasError = false;

  inputs.forEach(input => {
    const errorEl = input.nextElementSibling;

    if (input.value.trim() === '') {
      errorEl.textContent = 'Заполните это поле';
      input.classList.add('error');
      hasError = true;
    } else {
      errorEl.textContent = '';
      input.classList.remove('error');
    }
  });

  if (hasError) {
    e.preventDefault();
  }
});