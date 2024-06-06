# 8 домашняя работа школы программирования E-Soft
---
## Простой сервер на Express:

1. Данные хранятся в файле users.json, которые редактируются с помощью fs.
2. Роуты прописаны в отдельной файле routers.js.

### Пути роутера

1. #### /users
   Методы:
   - **GET**: Достаёт всех юзеров.
   - **POST**: Вставляет в конец файла нового пользователя из req.body с timestamp в качестве id.
     - **Тело запроса**: name, email, age (все поля обязательны)
2. #### /users/sorted
   Методы:
   - **GET**: Достаёт всех юзеров и сортирует по имени.
3. #### /users/:id
   Методы:
   - **GET**: Достаёт юзера с id из параметров.
   - **PUT**: Меняет описание юзера по id из параметров.
     - **Тело запроса**: name, email, age (все поля обязательны)
   - **DELETE**: Удаляет юзера по id из параметров.
4. #### /users/age/:age
   Методы:
   - **GET**: Достаёт всех юзеров с возрастом большим, чем age в параметрах.
5. #### /users/domain/:domain
   Методы:
   - **GET**: Достаёт всех юзеров, у которых в email есть строка `@${domain}`, а domain в параметрах :)

---

После каждого метода /users, /users/age, /users/domain возвращается **весь список юзеров**

Я просто переписал условие из домашки? Оч похоже(



