# Traveler's Map

Traveler's Map — это интерактивная карта для путешественников, где пользователи могут:

- Создавать заметки о прошлых путешествиях
- Делать пометки о будущих мечтах
- Публиковать и просматривать путешествия других пользователей
- Получать визуальную аналитику своих перемещений.

## Установка и запуска проекта

npm install
npm run dev - Проект запускается одновременно с frontend и backend с помощью concurrently.

## Структура проекта

travelers-map/
│
├── backend/ # Серверная часть (Node.js, Express, MongoDB)
│ ├── app.js
│ ├── routes/
│ └── models/
│
├── frontend/ # Клиентская часть (React)
│ ├── src/
│ └── public/
│
└── package.json # Основной скрипт запуска: npm run dev

## Технологии

Backend:

Node.js
Express
MongoDB + Mongoose
JWT (аутентификация)
Bcrypt (хэширование паролей)
Validator
Cookie-parser
Dotenv

Frontend:

React 18
Redux + Redux Thunk
React Router DOM
Styled-components
Recharts (визуализация аналитики)
React Hook Form + Yup (валидация форм)
Yandex Maps API (@pbe/react-yandex-maps)
Prettier + ESLint

Dev-инструменты:

concurrently — одновременный запуск frontend и backend
nodemon — автоперезапуск сервера при изменениях

## Основной функционал:

Добавление воспоминаний: отметка на карте с фото, текстом и датой.
Создание мечты: запись о будущем путешествии.
Аналитика: количество стран, городов, графики посещений.
Публикация: возможность делиться своими маршрутами с другими.

## Автор: esina034@gmail.com
