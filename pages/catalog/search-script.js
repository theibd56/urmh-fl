document.addEventListener('DOMContentLoaded', () => {
document.querySelectorAll('.search-filter__item_header').forEach(header => {
    header.addEventListener('click', () => {
        header.closest('.search-filter__item')?.classList.toggle('active');
    });
});

const products = document.querySelector('.search__products');
const btnGrid = document.querySelector('.js-search-view-grid');
const btnRow = document.querySelector('.js-search-view-row');

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

    const openBtn = document.querySelector('.search-filter__mobile-toggle');
    const closeBtn = document.querySelector('.js-filter-modal-close');
    const aside = document.querySelector('.search-aside');
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
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') close();
    });
    aside.addEventListener('click', (e) => {
        if (e.target === aside) {
            close();
        }
    });

document.querySelectorAll('.js-search-sort').forEach(sort => {
const current = sort.querySelector('.search-sort__current');
const value = sort.querySelector('.search-sort__value');
const optionsWrap = sort.querySelector('.search-sort__options');

let selectedOption = optionsWrap.querySelector('.search-sort__option');

value.textContent = selectedOption.textContent;
selectedOption.remove();

current.addEventListener('click', () => {
    sort.classList.toggle('active');
});

optionsWrap.addEventListener('click', e => {
    const option = e.target.closest('.search-sort__option');
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
});
})
