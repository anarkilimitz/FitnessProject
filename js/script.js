
// Назначение глобального обработчика событий DOMContentLoaded
// Назначаем его на window (так же можно на document)
window.addEventListener('DOMContentLoaded', () => {
//------------- ТАБЫ -----------------------------------------------------------------
// Получаем нужные элементы
    const tabs = document.querySelectorAll('.tabheader__item'),
          tabsContent = document.querySelectorAll('.tabcontent'),
          tabsParent = document.querySelector('.tabheader__items');
    
    // скрываем элементы на странице (скрываем табы со страницы)
    function hideTabContent() {
        // forEach перебирает все элементы
        tabsContent.forEach(item => {     // item - дали название каждому отдельному контенту
            item.classList.add('hide');
            item.classList.remove('show', 'fade');
        });
        // удаляем класс активности у каждого из элементов табов
        tabs.forEach(item => {
            item.classList.remove('tabheader__item_active'); // не ставим точку т.к итак работаем с классами 
        });
    }
    // создаем функцию, которая будет показывать нам табы
    function showTabContent(i = 0) {
        tabsContent[i].classList.add('show', 'fade');
        tabsContent[i].classList.remove('hide');
        // добавляем класс активности у каждого из элементов табов
        tabs[i].classList.add('tabheader__item_active');
    }

    hideTabContent();
    showTabContent();

    tabsParent.addEventListener('click', (event) => {
        const target = event.target;

        if (target && target.classList.contains('tabheader__item')) {
            tabs.forEach((item, i) => {
                if (target == item) {
                    hideTabContent();
                    showTabContent(i);
                }
            });
        }
    });
// ----------------- Таймер обратного отсчета ----------------------------

    const deadline = '2024-12-19';

    function getTimeRemaining(endtime) {
        let days, hours, minutes, seconds;
        //получаем разницу в миллисекундах
        const t = Date.parse(endtime) - Date.parse(new Date());
        // если дата прошла, то выводим все нули
        if (t <= 0) {
            days = 0;
            hours = 0;
            minutes = 0;
            seconds = 0;
        } else {
            days = Math.floor(t / (1000 * 60 * 60 * 24)), // дни
            hours = Math.floor((t / (1000 * 60 * 60) % 24)), // часы 
            minutes = Math.floor((t / 1000 / 60) % 60), // минуты
            seconds = Math.floor((t / 1000) % 60);  // секунды
        }
        
        return {
            'total': t,
            'days': days,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds

        };
    }

    function getZiro(num) {
        if (num >= 0 && num < 10) {
            return `0${num}`;
        } else {
            return num;
        }
    }

    function setClock(selector, endtime) {
        const timer = document.querySelector(selector),
              days = timer.querySelector('#days'),
              hours = timer.querySelector('#hours'),
              minutes = timer.querySelector('#minutes'),
              seconds = timer.querySelector('#seconds'),
              timeInterval = setInterval(updateClock, 1000);
        
        updateClock(); // запускаем вручную сразу, чтобы не ждать 1000мс, чтобы не мигало
        
        function updateClock() {
            const t = getTimeRemaining(endtime);

            days.innerHTML = getZiro(t.days);
            hours.innerHTML = getZiro(t.hours);
            minutes.innerHTML = getZiro(t.minutes);
            seconds.innerHTML = getZiro(t.seconds);

            if (t.total <= 0) { // если таймер равен нулю или меньше
                clearInterval(timeInterval); // останавливаем интервал
            }
        }
    }

    setClock('.timer', deadline);

//--------------Модальное окно--------------------------------------------
    
// получаем дата-атрибуты
    const modalTrigger = document.querySelectorAll('[data-modal]'),
          modal = document.querySelector('.modal'),
          modalCloseBtn = document.querySelector('[data-close]');
    
    function closeModal() {
        modal.classList.add('hide');
        modal.classList.remove('show');
        document.body.style.overflow = ''; // отменяем запрет прокрутки при выведении модального окна
    }
    
    modalTrigger.forEach(btn => {
        btn.addEventListener('click', openModal);
    });

    function openModal() {
        modal.classList.add('show'); // показываем окно
        modal.classList.remove('hide'); // прячем окно
        document.body.style.overflow = 'hidden'; // не позволяет прокручивать страницу при появлении модального окна
        clearInterval(modalTimerId); // если пользователь сам открыл модальное окно, то таймер в 3 секунды срабатывать уже не будет
    }

    modalCloseBtn.addEventListener('click', closeModal); // функция closeModal будет выполнена только после click

// чтобы пользователь мог закрыть модальное окно, кликая рядом с ним по области
    modal.addEventListener('click', (e) => { // e - объект события (event)
        if (e.target === modal) {
            closeModal(); // запускаем функцию после того как условие выполнено
        }
    });
// закрыть модальное окно по нажатии клавиши Esc
    document.addEventListener('keydown', (e) => {
        if (e.code === 'Escape' && modal.classList.contains('show')) { // событие по кливише Esc
            closeModal(); // вызвать функцию, она закрывает модальное окно
        }
    });
// всплытие модалки через 3 секунды автоматически
    // const modalTimerId = setTimeout(openModal, 3000);

// запускаем модалку при прокрутке страницы до конца
    function showModalByScroll() {
        if (window.scrollY + document.documentElement.clientHeight >= document.documentElement.scrollHeight -1) {
            openModal();
            window.removeEventListener('scroll', showModalByScroll); // удаляем запуск модалки после первого появления, чтобы второй раз не запускалась
        }
    }
    window.addEventListener('scroll', showModalByScroll);

    // Используем классы карточек
    
    class MenuCard {
        constructor(src, alt, title, descr, price) {
            this.src = src;
            this.alt = alt;
            this.title = title;
            this.descr = descr;
            this.price = price;
        }

    }

});

