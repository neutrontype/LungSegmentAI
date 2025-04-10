document.addEventListener('DOMContentLoaded', () => {

    // --- Мобильное меню ---
    const mobileNavToggle = document.querySelector('.mobile-nav-toggle');
    const primaryNavigation = document.querySelector('#primary-navigation');

    if (mobileNavToggle && primaryNavigation) {
        mobileNavToggle.addEventListener('click', () => {
            const isVisible = primaryNavigation.getAttribute('data-visible') === 'true';

            primaryNavigation.setAttribute('data-visible', !isVisible);
            mobileNavToggle.setAttribute('aria-expanded', !isVisible);

            // Меняем иконку кнопки
            const icon = mobileNavToggle.querySelector('i');
            if (!isVisible) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times'); // Иконка крестика
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars'); // Иконка бургера
            }
        });

        // Закрытие меню при клике на ссылку (для одностраничника)
        primaryNavigation.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                if (primaryNavigation.getAttribute('data-visible') === "true") {
                    primaryNavigation.setAttribute('data-visible', false);
                    mobileNavToggle.setAttribute('aria-expanded', false);
                    const icon = mobileNavToggle.querySelector('i');
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                }
            });
        });
    }

    // --- Плавная прокрутка ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = anchor.getAttribute('href');
            // Проверяем, что это действительно якорь, а не просто #
            if (href.length > 1 && href.startsWith('#')) {
                const targetElement = document.querySelector(href);
                if (targetElement) {
                    e.preventDefault(); // Отменяем стандартный переход только если элемент найден

                    const headerOffset = document.querySelector('.main-header.sticky') ? document.querySelector('.main-header.sticky').offsetHeight : 0;
                    const elementPosition = targetElement.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - headerOffset - 15; // Доп. отступ 15px

                    window.scrollTo({
                        top: offsetPosition,
                        behavior: "smooth"
                    });
                }
            }
        });
    });

    // --- Анимация при прокрутке (Intersection Observer) ---
    const animatedElements = document.querySelectorAll('.animate-fade-in, .animate-fade-in-up, .animate-fade-in-left, .animate-fade-in-right');

    if ("IntersectionObserver" in window) {
        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target); // Отключаем наблюдение после анимации
                }
            });
        }, {
            threshold: 0.1 // Элемент считается видимым при появлении на 10%
        });

        animatedElements.forEach(el => {
            observer.observe(el);
        });
    } else {
        // Fallback для старых браузеров (просто показать элементы)
        animatedElements.forEach(el => {
            el.classList.add('visible');
        });
    }


    // --- Обновление года в футере ---
    const currentYearSpan = document.getElementById('current-year');
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }

    // --- "Липкая" шапка ---
    const header = document.querySelector('.main-header');
    if(header) {
        const stickyPoint = header.offsetTop + 50; // Точка, после которой шапка станет "липкой"

        window.addEventListener('scroll', () => {
            if (window.pageYOffset > stickyPoint) {
                header.classList.add('sticky');
            } else {
                header.classList.remove('sticky');
            }
        });
    }

}); // Конец DOMContentLoaded