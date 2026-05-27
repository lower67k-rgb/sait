/* --- app.js (финальная, надежная версия) --- */

document.addEventListener('DOMContentLoaded', () => {
    console.log('скрипты подгружены, погнали!');

    const burger = document.querySelector('.burger-btn');
    const menu = document.querySelector('.mobile-menu');
    const body = document.querySelector('body');

    if (!burger || !menu) {
        console.error('не нашел элементы меню, проверь классы в html!');
        return;
    }

    // открывашка меню
    burger.addEventListener('click', () => {
        menu.classList.toggle('active');
        burger.classList.toggle('is-open');
        body.style.overflow = menu.classList.contains('active') ? 'hidden' : '';
    });

    // закрытие при клике по ссылке
    document.querySelectorAll('.nav-link, .mobile-link').forEach(link => {
        link.addEventListener('click', () => {
            menu.classList.remove('active');
            burger.classList.remove('is-open');
            body.style.overflow = '';
        });
    });

    // аккордеон faq
    document.querySelectorAll('.faq-trigger').forEach(trigger => {
        trigger.addEventListener('click', function() {
            const content = this.nextElementSibling;
            
            // закрываем остальные, если хочешь, чтобы открывался только один
            document.querySelectorAll('.faq-content').forEach(item => {
                if (item !== content) item.style.display = 'none';
            });

            this.classList.toggle('active');
            content.style.display = (content.style.display === 'block') ? 'none' : 'block';
        });
    });
});
