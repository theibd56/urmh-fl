import Swiper from 'swiper';
import {Navigation, Pagination, Controller, EffectFade, Autoplay, Thumbs} from 'swiper/modules';

Swiper.use([Navigation, Pagination, Controller, EffectFade, Autoplay, Thumbs]);


document.querySelectorAll('.basket-list_product').forEach(product => { 
    const quantityInput = product.querySelector('.basket__quantity-input');
    const quantityMinusBtn = product.querySelector('.basket__quantity-btn--minus');
    const quantityPlusBtn = product.querySelector('.basket__quantity-btn--plus');

            if (quantityInput && quantityMinusBtn && quantityPlusBtn) {
                // Функция обновления состояния кнопок
                const updateButtonsState = () => {
                    const currentValue = parseInt(quantityInput.value, 10) || 1;
                    if (currentValue <= 1) {
                        quantityMinusBtn.disabled = true;
                        quantityMinusBtn.classList.add('basket__quantity-btn--disabled');
                    } else {
                        quantityMinusBtn.disabled = false;
                        quantityMinusBtn.classList.remove('basket__quantity-btn--disabled');
                    }
                };

                // Функция обновления значения
                const updateQuantity = (value) => {
                    const numValue = parseInt(value, 10);
                    if (isNaN(numValue) || numValue < 1) {
                        quantityInput.value = 1;
                    } else {
                        quantityInput.value = numValue;
                    }
                    updateButtonsState();
                };

                const activeItem = product.querySelector('.basket__availability-item[aria-selected="true"]');

                if (activeItem) {
                    updateAvailabilityBadge(
                        {
                            amount: parseInt(activeItem.dataset.amount, 10),
                            status: activeItem.dataset.status,
                            quantity: parseInt(quantityInput.value, 10)
                        },
                        product.querySelector('.basket__availability-toggle .basket__status')
                    );
                }

                quantityPlusBtn.addEventListener('click', () => {
                    const currentValue = parseInt(quantityInput.value, 10) || 1;
                    const newValue = currentValue + 1;

                    updateQuantity(newValue);
                    refreshAvailabilityFromQuantity(product, newValue);
                    refreshAllAvailabilityItems(product, newValue);
                });


                quantityMinusBtn.addEventListener('click', () => {
                    const currentValue = parseInt(quantityInput.value, 10) || 1;
                    if (currentValue > 1) {
                        const newValue = currentValue - 1;

                        updateQuantity(newValue);
                        refreshAvailabilityFromQuantity(product, newValue);
                        refreshAllAvailabilityItems(product, newValue);
                    }
                });

                quantityInput.addEventListener('change', () => {
                    const value = parseInt(quantityInput.value, 10) || 1;

                    updateQuantity(value);
                    refreshAvailabilityFromQuantity(value);
                    refreshAllAvailabilityItems(value);
                });

                // Обработчик ввода в input (валидация в реальном времени)
                quantityInput.addEventListener('input', () => {
                    const value = quantityInput.value;
                    if (value === '' || value === '0') {
                        updateButtonsState();
                        return; // Разрешаем пустое значение или 0 во время ввода
                    }
                    const numValue = parseInt(value, 10);
                    if (!isNaN(numValue) && numValue < 1) {
                        quantityInput.value = '';
                    }
                    updateButtonsState();
                });

                // Обработчик потери фокуса - устанавливаем минимум 1
                quantityInput.addEventListener('blur', () => {
                    const value = quantityInput.value;
                    if (value === '' || parseInt(value, 10) < 1) {
                        quantityInput.value = 1;
                    }
                    updateButtonsState();
                });

                // Инициализация состояния кнопок при загрузке
                updateButtonsState();
            }

        function updateAvailabilityBadge({ amount, status, quantity }, container) {
            container.innerHTML = '';

            // expected — ничего не добавляем
            if (status === 'expected') {
                const badge = document.createElement('div');
                badge.className = 'basket__status-badge basket__status-badge--expected';
                badge.innerHTML = '<span>Ожидается к поступлению</span>';
                container.appendChild(badge);
                return;
            }

            // количество 1 — оставляем "как есть"
            if (quantity <= 1 && amount > 0) {
                const badge = document.createElement('div');
                badge.className = 'basket__status-badge basket__status-badge--in-stock';
                badge.innerHTML = '<span>В наличии</span>';
                container.appendChild(badge);
                return;
            }

            // data-amount = 0 → всё под заказ
            if (amount === 0) {
                const badge = document.createElement('div');
                badge.className = 'basket__status-badge basket__status-badge--order';
                badge.innerHTML = `<span>Под заказ ${quantity} шт</span>`;
                container.appendChild(badge);
                return;
            }

            // хватает на складе
            if (quantity <= amount) {
                const badge = document.createElement('div');
                badge.className = 'basket__status-badge basket__status-badge--in-stock';
                badge.innerHTML = `<span>В наличии ${quantity} шт</span>`;
                container.appendChild(badge);
                return;
            }

            // не хватает — делим
            const inStockQty = amount;
            const orderQty = quantity - amount;

            const inStockBadge = document.createElement('div');
            inStockBadge.className = 'basket__status-badge basket__status-badge--in-stock';
            inStockBadge.innerHTML = `<span>В наличии ${inStockQty} шт</span>`;

            const orderBadge = document.createElement('div');
            orderBadge.className = 'basket__status-badge basket__status-badge--order';
            orderBadge.innerHTML = `<span>Под заказ ${orderQty} шт</span>`;

            container.append(inStockBadge, orderBadge);
        }

        function refreshAvailabilityFromQuantity(product, quantity) {
            const activeItem = product.querySelector('.basket__availability-item[aria-selected="true"]');
            const statusContainer = product.querySelector('.basket__availability-toggle .basket__status');

            if (!activeItem || !statusContainer) return;

            updateAvailabilityBadge(
                {
                    amount: parseInt(activeItem.dataset.amount, 10),
                    status: activeItem.dataset.status,
                    quantity
                },
                statusContainer
            );
        }

        function updateAvailabilityItemBadge(item, quantity) {
            const status = item.dataset.status;
            const amount = parseInt(item.dataset.amount, 10);
            const statusContainer = item.querySelector('.basket__status');

            if (!statusContainer) return;

            updateAvailabilityBadge(
                {
                    amount,
                    status,
                    quantity
                },
                statusContainer
            );
        }

            function refreshAllAvailabilityItems(product, quantity) {
                product.querySelectorAll('.basket__availability-item').forEach(item => {
                    updateAvailabilityItemBadge(item, quantity);
                });
            }
        product.querySelectorAll('.basket__availability').forEach(container => {
            const toggle = container.querySelector('.basket__availability-toggle');
            const dropdown = container.querySelector('.basket__availability-dropdown');
            const items = container.querySelectorAll('.basket__availability-item');

            if (!toggle || !dropdown) return;

            toggle.addEventListener('click', (e) => {
                e.stopPropagation();

                const isExpanded = container.getAttribute('aria-expanded') === 'true';

                container.setAttribute('aria-expanded', String(!isExpanded));
                toggle.setAttribute('aria-expanded', String(!isExpanded));
            });

            items.forEach(item => {
                item.addEventListener('click', () => {
                    const city = item.dataset.city;
                    const currentQuantity = parseInt(quantityInput.value, 10) || 1;
                    const amount = parseInt(item.dataset.amount, 10);
                    const status = item.dataset.status;

                    const selectedCity = toggle.querySelector('.basket__city');
                    const selectedStatusWrapper = toggle.querySelector('.basket__status');

                    updateAvailabilityBadge(
                        {
                            amount,
                            status,
                            quantity: currentQuantity
                        },
                        selectedStatusWrapper
                    );

                    selectedCity.textContent = city;

                    items.forEach(i => i.setAttribute('aria-selected', 'false'));
                    item.setAttribute('aria-selected', 'true');

                    container.setAttribute('aria-expanded', 'false');
                    toggle.setAttribute('aria-expanded', 'false');
                });
            });

            document.addEventListener('click', (e) => {
                if (!container.contains(e.target)) {
                    container.setAttribute('aria-expanded', 'false');
                    toggle.setAttribute('aria-expanded', 'false');
                }
            });

            if (items.length > 0) {
                items[0].setAttribute('aria-selected', 'true');
            }
        });
    });

    //slider__related
    const relatedProductSwiper = new Swiper('.basket__related-slider', {
        slidesPerView: 3,
        spaceBetween: 16,

        navigation: {
            nextEl: '.basket__related-nav-btn--next',
            prevEl: '.basket__related-nav-btn--prev',
        },
        breakpoints:{
            0:{
                slidesPerView: 'auto',
                spaceBetween: 8
            },
            320: {
                slidesPerView: 1.8,
                spaceBetween: 8,
            },
            500: {
                slidesPerView: 2,
                spaceBetween: 8,
            },
            768: {
                slidesPerView: 3,
                spaceBetween: 8,
            },
            1400: {
                slidesPerView: 5,
                spaceBetween: 16,
            }
        }
    })

const relatedBtns = document.querySelectorAll('.basket__related-btn');

relatedBtns.forEach(btn => {
    btn.addEventListener('click', function() {
        const relatedItem = this.closest('.basket__related-item');
        const actionsContainer = relatedItem.querySelector('.basket__related-actions');

        if (!actionsContainer) return;

        // Скрываем кнопку и показываем контейнер с счетчиком и корзиной
        this.style.display = 'none';
        actionsContainer.style.display = 'flex';
    });
});

// Делегирование событий для счетчика
document.addEventListener('click', function(e) {
    if (e.target.closest('.basket__related-counter-btn--minus')) {
        const counter = e.target.closest('.basket__related-counter');
        const counterValue = counter.querySelector('.basket__related-counter-value');
        let value = parseInt(counterValue.textContent, 10);
        if (value > 1) {
            value--;
            counterValue.textContent = value;
        }
    }

    if (e.target.closest('.basket__related-counter-btn--plus')) {
        const counter = e.target.closest('.basket__related-counter');
        const counterValue = counter.querySelector('.basket__related-counter-value');
        let value = parseInt(counterValue.textContent, 10);
        value++;
        counterValue.textContent = value;
    }

    if (e.target.closest('.basket__related-cart-icon')) {
        const cartIcon = e.target.closest('.basket__related-cart-icon');
        cartIcon.classList.toggle('active');
    }
});


//slider__product
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