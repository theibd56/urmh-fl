import Swiper from 'swiper';
import {Navigation, Pagination, Controller, EffectFade, Autoplay, Thumbs} from 'swiper/modules';

Swiper.use([Navigation, Pagination, Controller, EffectFade, Autoplay, Thumbs]);


const items = document.querySelectorAll('.faq__category-item');

if (items.length) {
    items.forEach(item => {
        item.addEventListener('click', () => {
            const isActive = item.classList.contains('is-active');

            items.forEach(el => el.classList.remove('is-active'));

            if (!isActive) {
                item.classList.add('is-active');
            }
        });
    });
}

//form
const form = document.querySelector('.faq__feedback-form');
const inputs = form.querySelectorAll('.input-field');

if (form && inputs) {
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
}