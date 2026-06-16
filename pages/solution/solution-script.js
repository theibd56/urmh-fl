import Swiper from 'swiper';
import {Navigation, Pagination, Controller, EffectFade, Autoplay, Thumbs} from 'swiper/modules';

Swiper.use([Navigation, Pagination, Controller, EffectFade, Autoplay, Thumbs]);


// Thumb slider

document.addEventListener('DOMContentLoaded', () => {
    // основной
    const solutionThumbsSwiper = new Swiper('.solution__slider-thumbs', {
        spaceBetween: 16,
        slidesPerView: 7,
        breakpoints: {
            0: {
                spaceBetween: 8,
            },
            768: {
                spaceBetween: 16,
            },
        }
    })

// второстепенный
    const solutionMainSwiper = new Swiper(".solution__slider-main", {
        spaceBetween: 10,
        thumbs: {
            swiper: solutionThumbsSwiper,
        },
        navigation: {
            nextEl: ".slider__next",
            prevEl: ".slider__prev",
        },

    });

      const relatedSolutionSwiper = new Swiper('.solution__related-slider', {
        slidesPerView: 3,
        spaceBetween: 16,

        navigation: {
            nextEl: '.solution__slider-nav--next',
            prevEl: '.solution__slider-nav--prev',
        },
        breakpoints:{
            0:{
                slidesPerView: 'auto',
                spaceBetween: 8
            },
            768: {
                slidesPerView: 3,
                spaceBetween: 16,
            }
        }
    })

  const detailsContent = document.querySelector('.solution__details-content');
  const descriptionMoreBtn = document.querySelector('.solution__description-more');

  if (detailsContent && descriptionMoreBtn) {
      // Проверяем, нужно ли показывать кнопку
      const checkButtonVisibility = () => {
          // Временно убираем ограничение высоты для проверки реальной высоты
          const originalMaxHeight = detailsContent.style.maxHeight;
          detailsContent.style.maxHeight = 'none';
          const fullHeight = detailsContent.scrollHeight;
          detailsContent.style.maxHeight = originalMaxHeight;

          if (fullHeight <= 400) {
              detailsContent.classList.remove('solution__details-additional');
              descriptionMoreBtn.style.display = 'none';
          } else {
              detailsContent.classList.add('solution__details-additional');
              descriptionMoreBtn.style.display = 'block';
          }
      };

      descriptionMoreBtn.addEventListener('click', () => {
          const isExpanded = detailsContent.classList.contains('solution__details-content--expanded');

          if (isExpanded) {
              detailsContent.classList.remove('solution__details-content--expanded');
              descriptionMoreBtn.setAttribute('aria-expanded', 'false');
              descriptionMoreBtn.textContent = 'Показать полностью';
          } else {
              detailsContent.classList.add('solution__details-content--expanded');
              descriptionMoreBtn.setAttribute('aria-expanded', 'true');
              descriptionMoreBtn.textContent = 'Скрыть';
          }
      });

      // Проверяем при загрузке страницы (с небольшой задержкой для полной отрисовки)
      setTimeout(checkButtonVisibility, 100);
  }

  // Видео-слайдер
  const videosSliderEl = document.querySelector('.solution__videos-slider');
  const slidesCount = videosSliderEl.querySelectorAll('.swiper-slide').length;

  let slidesPerView = 3;
  let loop = true;

  let mobileSlides = 1.8;
  let desktopSlides = 3;

  if (slidesCount === 1) {
      mobileSlides = 1;
      desktopSlides = 1;
  }

  if (slidesCount === 2) {
      mobileSlides = 1.8;
      desktopSlides = 2;
  }

  if (slidesCount >= 3) {
      mobileSlides = 1.8;
      desktopSlides = 3;
  }

  if (slidesCount === 1) {
      slidesPerView = 1;
      loop = false;
      videosSliderEl.classList.add('is-one-slide');
  }

  if (slidesCount === 2) {
      slidesPerView = 2;
      loop = false;
      videosSliderEl.classList.add('is-two-slides');
  }

  if (slidesCount === 3) {
      slidesPerView = 3;
      loop = false;
      videosSliderEl.classList.add('is-three-slides');
  }

  const solutionVideosSlider = new Swiper('.solution__videos-slider', {
      slidesPerView,
      spaceBetween: 16,
      loop,
      navigation: {
          nextEl: '.solution__videos-next',
          prevEl: '.solution__videos-prev',
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

const cards = document.querySelectorAll('.product__card');

cards.forEach(card => {
  const closeBtn = card.querySelector('.product__card-close');
  const returnBtn = card.querySelector('.product__card-return');

  closeBtn?.addEventListener('click', e => {
    e.preventDefault();
    e.stopPropagation();

    card.classList.add('product__card_remote');
  });

  returnBtn?.addEventListener('click', e => {
    e.preventDefault();
    e.stopPropagation();

    card.classList.remove('product__card_remote');
  });
});

const cartBtns = document.querySelectorAll('.solution__info_buttons button');

cartBtns.forEach(btn => {
  const text = btn.querySelector('.solution__info_buttons-text');

  btn.addEventListener('click', () => {
    btn.classList.toggle('active');

    if (btn.classList.contains('active')) {
      text.textContent = 'Добавлено в корзину';
    } else {
      text.textContent = 'Добавить в корзину';
    }
  });
});
  });