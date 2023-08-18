# Frontend-проект: "Movies-Explorer"

## Описание проекта

Интерактивный сервис, с помощью которого пользователи могут искать фильмы по ключевым словам и добавлять их в избранное. Бэкэнд часть проекта находится [тут](https://github.com/DayensCode/movies-explorer-api).

![image](https://github.com/DayensCode/movies-explorer-frontend/blob/main/shot-for-readme.png)

### Ссылка на макет

https://disk.yandex.ru/d/zszVRnWO75Yj9w

### Ссылка на проект

https://mymovies.nomoreparties.sbs

## Используемые языки

[HTML](https://ru.wikipedia.org/wiki/HTML)
[CSS](https://ru.wikipedia.org/wiki/CSS)
[JS](https://ru.wikipedia.org/wiki/JavaScript)
[React](https://ru.wikipedia.org/wiki/React)

## Запуск приложения

- _npm ci_ - устанавливает и обновляет зависимости
- _npm run start_ - запускает приложение

## Процесс создания

Была осуществлена верстка всех необходимых компонентов и их элементов, написан соответсвующий функционал.

## Функционал

- Роуты защищены авторизацией (пользователю необходимо пройти регистрацию и логин для того, чтобы перейти к поиску фильмов)
- Все поля форм валидируются с помощью регулярных выражений
- Используются собственные хуки
- Получение фильмов со стороннего API
- Реализовано сохранение/удаление фильмов
- Возможность фильтрации найденных фильмов по длительности
- Поиск фильмов на русском и английском языках
- Запоминание состояния полей ввода (в форме поиска фильмов), фильтра и найденных фильмов (при обновлении страницы данные не будут утеряны)
- Реализовано модальное окно для демонтрации ошибок сервера
- При загрузке данных рендерится прелоадер, по окончанию загрузки он перестает отображаться
- Адаптивная верстка для всех популярных разрешений экрана
- Бургерное меню для мобильной и планшетной версии
- Переход к показу трейлера фильма при нажатии на постер
- Cвёрстано в соответствии BEM nested, соблюдается семантичность
- На странице поиска фильмов по клику на кнопку "Ещё" - показываются дополнительные фильмы (на странице с сохранёнными фильмами показываются сразу все фильмы)
- Редактирование данных пользователя (почты и имени)
- Запоминание состояния входа пользователя (при обновлении страницы будет выполнен автоматический вход)
- Анимация всех ссылок и кнопок
- Для создания сеток используются flex и grid

## Планы по улучшению

- Сохранять токен в cookie
