document.addEventListener('DOMContentLoaded', function() {
    const toggleContainer = document.getElementById('js-blog__toggle');
    const buttons = toggleContainer.querySelectorAll('button');

    buttons.forEach(button => {
        button.addEventListener('click', function() {
            buttons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
        });
    });
});