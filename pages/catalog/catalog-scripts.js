import Swiper from 'swiper';
import {Navigation, Pagination, Controller, EffectFade, Autoplay, Thumbs} from 'swiper/modules';

Swiper.use([Navigation, Pagination, Controller, EffectFade, Autoplay, Thumbs]);

document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.product__card-swiper').forEach((slider) => {
        const container = slider.closest('.product__card-slider');

        new Swiper(slider, {
            slidesPerView: 'auto',
            spaceBetween: 16,
            loop: true,
            navigation: {
                nextEl: container.querySelector('.product__card-next'),
                prevEl: container.querySelector('.product__card-prev'),
            },
            breakpoints: {
                0: { spaceBetween: 8 },
                768: { spaceBetween: 16 }
            }
        });
    });

    const catalogTopSlider = new Swiper('.catalog-top__slider', {
        slidesPerView: 'auto',
        spaceBetween: 12,
    })
});

document.addEventListener('DOMContentLoaded', () => {
    const compareBtns = document.querySelectorAll('.product__card-compare');
    const favoriteBtns = document.querySelectorAll('.product__card-favorite');
    const addToCartBtns = document.querySelectorAll('.product__card-cart');

    compareBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            btn.classList.toggle('active');
        })
    })

    favoriteBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            btn.classList.toggle('active');
        })
    })

    addToCartBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            btn.classList.toggle('active');
        })
    })
})

document.addEventListener('DOMContentLoaded', () => {
    const openBtn = document.querySelector('.catalog-filter__mobile-toggle');
    const closeBtn = document.querySelector('.js-filter-modal-close');
    const aside = document.querySelector('.catalog-aside');
    const html = document.documentElement


    if (!openBtn || !closeBtn || !aside) return;

    const open = () => {
        aside.classList.add('active');
        html.classList.add('lock');
    };

    const close = () => {
        aside.classList.remove('active');
        html.classList.remove('lock');
    };

    openBtn.addEventListener('click', open);
    closeBtn.addEventListener('click', close);

    // ESC — по-людски
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') close();
    });

    // Клик по фону (через ::after)
    aside.addEventListener('click', (e) => {
        if (e.target === aside) {
            close();
        }
    });
})

document.addEventListener('DOMContentLoaded', () => {
    const items = document.querySelectorAll('.catalog-faq__item');

    items.forEach(item => {
        item.addEventListener('click', () => {
            const isActive = item.classList.contains('is-active');

            items.forEach(el => el.classList.remove('is-active'));

            if (!isActive) {
                item.classList.add('is-active');
            }
        });
    });
});

document.querySelectorAll('.js-collapsible').forEach(block => {
    const content = block.querySelector('.catalog-categories__content');
    const button = block.querySelector('.catalog-categories__toggle');

    button.addEventListener('click', () => {
        const isOpen = content.classList.toggle('is-open');

        button.textContent = isOpen
            ? 'Скрыть'
            : 'Показать полностью';
    });
});

document.querySelectorAll('.catalog-filter__item_header').forEach(header => {
    header.addEventListener('click', () => {
        header.closest('.catalog-filter__item')?.classList.toggle('active');
    });
});


document.addEventListener('DOMContentLoaded', () => {
    const products = document.querySelector('.catalog-wrapper__products');
    const btnGrid = document.querySelector('.js-catalog-view-grid');
    const btnRow = document.querySelector('.js-catalog-view-row');

    if (products && btnGrid && btnRow) {
        btnGrid.addEventListener('click', () => {
            products.classList.add('grid');
            products.classList.remove('row');

            btnGrid.classList.add('active');
            btnRow.classList.remove('active');
        });

        btnRow.addEventListener('click', () => {
            products.classList.add('row');
            products.classList.remove('grid');

            btnRow.classList.add('active');
            btnGrid.classList.remove('active');
        });
    }
})

document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.js-catalog-sort').forEach(sort => {
        const current = sort.querySelector('.catalog-sort__current');
        const value = sort.querySelector('.catalog-sort__value');
        const optionsWrap = sort.querySelector('.catalog-sort__options');

        let selectedOption = optionsWrap.querySelector('.catalog-sort__option');

        // инициализация
        value.textContent = selectedOption.textContent;
        selectedOption.remove();

        current.addEventListener('click', () => {
            sort.classList.toggle('active');
        });

        optionsWrap.addEventListener('click', e => {
            const option = e.target.closest('.catalog-sort__option');
            if (!option) return;

            // возвращаем предыдущий выбранный пункт
            optionsWrap.appendChild(selectedOption);

            // новый выбранный
            selectedOption = option;
            value.textContent = option.textContent;
            option.remove();

            sort.classList.remove('active');

            // option.dataset.value — тут можно дергать сортировку
        });

        document.addEventListener('click', e => {
            if (!sort.contains(e.target)) {
                sort.classList.remove('active');
            }
        });
    });

})