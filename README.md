# Проект: Messenger

## Описание:

Этот проект представляет собой мессенджер, который позволяет пользователям регистрироваться, входить в систему, просматривать список чатов и отправлять сообщения.
Это учебный проект для развития навыков.

## Используемые технологии:

- Vite
- Handlebars
- Express.js
- SCSS
- TS

## Спринты:

- ### [1 спринт](https://github.com/TokmakDA/middle.messenger.praktikum.yandex/tree/sprint_1):

  - Верстка экранов:
    - Авторизация (/signin)
    - Регистрация (/signup)
    - Список чатов (/chats)
    - Профиль (/profile)
    - Страница 404 (/404)
    - Страница 500 (/500)
  - Настройка сборки проекта при помощи `Vite`
  - Выбор препроцессор для сборки CSS:
    - `SCSS`
    - вынесены константы переменных
  - Подключен шаблонизатор `Hаndlebars` к проекту
  - Настроен Express-сервер с раздачей статики — файла `index.html` на `3000` порту
  - Настроен `Netlify`:
    - подключен репозиторий
    - настроен автодеплой из ветки `deploy`
  - Подключен и настпроен `ESLint + Pretter`
  - защищена ветка `sprint_1` от изменений

- ### [2 спринт](https://github.com/TokmakDA/middle.messenger.praktikum.yandex/tree/sprint_2):

  - [x] Создание ветки в Git для выполнения заданий второго спринта.
  - [x] Внедрение TypeScript
  - [x] Добавление компонентов в проект.
  - [x] Реализация сбора данных из формы и добавление валидации на все формы.
  - [x] Генерация страниц на стороне клиента
  - [x] Bспользование Vite для сборки.
  - [x] Структурирование проекта в соответствии с советами по архитектуре.
  - [ ] Настройка правильных экспортов и импортов, декомпозиция и минимизация связности.
  - [ ] Реализация MVC-приложения и настройка взаимодействия сервисов и вьюшек через контроллеры.
  - [x] Добавление работы с запросами, использование Promise и XHR.
  - [x] Настройка ESLint, настройка editorconfig и статических анализаторов.
  - [x] Добавление Stylelint и обновление README.md.
  - [ ] Проверка и сдача проектной работы после выполнения всех заданий.

  <details><summary>Основные задания:</summary>

  1.  Создайте в Git ветку sprint_2. Не меняйте её название, в ней вы будете выполнять задания этого спринта.
  2.  Внедрите `TypeScript`.
  3.  Сделайте страницу со списком чатов и лентой переписки. Не забудьте, что поле ввода сообщения должно называться `message`.
  4.  Добавьте компонентный подход в проект:

      - Используйте реализацию блока (Block) и Event Bus;
      - Разделите проект на папки с компонентами и страницами (components и blocks или pages).

      > 💡 Вы сами решаете, насколько сильно декомпозировать проект. Мы настоятельно рекомендуем хотя бы часть повторяющихся элементов вынести в отдельные компоненты. Это могут быть, например, инпуты, формы, кнопки, сообщение в чате. Так вы сможете их переиспользовать и не дублировать логику.

  5.  Сделайте сбор данных из формы. В `console.log` должен выводиться объект со всеми заполненными полями формы.
  6.  Добавьте валидацию на все формы. Валидация должна работать по `blur`-событиям и второй раз проверяться при нажатии на `submit`. Используйте регулярные выражения. У валидации должен быть единый механизм:

      - авторизация,
      - регистрация,
      - отправка сообщения (например, недопустимые символы),
      - настройки пользователя.
      - Должны быть следующие проверки (**добавлять дополнительные правила валидации не нужно**):
        - `first_name`, `second_name` — латиница или кириллица, первая буква должна быть заглавной, без пробелов и без цифр, нет спецсимволов (допустим только дефис).
        - `login` — от 3 до 20 символов, латиница, может содержать цифры, но не состоять из них, без пробелов, без спецсимволов (допустимы дефис и нижнее подчёркивание).
        - `email` — латиница, может включать цифры и спецсимволы вроде дефиса и подчёркивания, обязательно должна быть «собака» (@) и точка после неё, но перед точкой обязательно должны быть буквы.
        - `password` — от 8 до 40 символов, обязательно хотя бы одна заглавная буква и цифра.
        - `phone` — от 10 до 15 символов, состоит из цифр, может начинается с плюса.
        - `message` — не должно быть пустым.

  7.  Генерация страниц должна происходить на стороне клиента;
  8.  Сборка должна быть при помощи Vite;
  9.  Структурируйте проект в соответствии с советами по архитектуре:

      - Разбейте на папки единым образом. Например, если у вас в папке Button лежит `Button.ts`, `index.ts`, `Button.css`, `types.ts`, то в папке `Input` не должен быть просто `Input.ts`. Как минимум там тоже должен быть свой `index.ts`;

      > 💡 Нет понятия «идеальная файловая структура». В вашей структуре должны быть логика, единообразие и декомпозиция. Представьте себя на месте другого разработчика, который открыл ваш проект. Сколько времени потребуется, чтобы понять, что где лежит? А если нужно добавить новый компонент или что-то исправить в коде? Чем понятнее будет структура, тем лучше.

      - Настройте правильные экспорты и импорты;
      - Декомпозируйте и максимально уменьшите связность.
      - Проверьте, что ваше приложения соответствует шаблону MVC (тема «Паттерны», урок "MV\*?").
        > 💡 Реализация MVC-приложения:
        >
        > - Шаг 1. Создаём базовый класс (он же View в MVC);
        > - Шаг 2. Наследуем от него страницы — "Chats" и т. д.;
        > - Шаг 3. Внутри описываем отображение определённой части приложения;
        > - Шаг 4. Содержимое генерируем с помощью шаблонизатора;
        > - Шаг 5. Создаём сервисы и модули для управления бизнес-логикой работы с данными;
        > - Шаг 6. Настраиваем взаимодействие сервисов и вьюшек через контроллеры. Например, через паттерн «Медиатор».

  10. В следующем спринте вы напишете свой роутер и добавите его в проект, использовать `express.Router()` нельзя. Сейчас для перехода между страницами можете применить, например, ссылки в тегах `<a>`.
  11. Добавьте класс для работы с запросами:

      - `Fetch`, `axios` и подобные инструменты использовать нельзя. Только `Promise` и `XHR`;
      - Реализуйте методы `GET`, `POST`, `PUT`, `DELETE`;
      - Добавьте работу с `query string` в GET-запросе и с `body` для других методов.

      > 💡 Вам поможет пример HTTPTransport из урока «Реализация fetch» (тема про API) или напишите свою реализацию. `Fetch`, `axios` и другие подобные инструменты вы сможете использовать во втором модуле.

  12. Добавьте `ESLint`:

      - Опишите свои правила или наследуйтесь от уже готовых наборов: например, `Airbnb` или `Google`;
      - Настройте `editorconfig` и другие статические анализаторы и инструменты для кода;
      - Весь код должен проходить проверку типов, линтинг и тесты.

      > 💡 В готовых наборах очень много правил. Может возникнуть желание отключить часть из них. Настраивайте конфигурацию под себя, но не забывайте, что эти правила были добавлены не просто так. Не отключайте правила просто потому, что с ними долго или сложно править ошибки.

  13. Добавьте `Stylelint`.
  14. Обновите `README.md`, а именно информацию о функциональности и использованных инструментах.15. Проверьте, что pull request из прошлого спринта «смёрджен» после того, как его принял ревьюер. Если да, после выполнения всех заданий этого спринта откройте pull request из ветки `sprint_2` в ветку `main`. Назовите его “Sprint 2”. В PR должны входить только те изменения, которые были сделаны в рамках конкретного спринта.
  15. Когда будете готовы к сдаче проектной работы, отправьте ссылку на пул-реквест, открытый из ветки `sprint-2`, через форму в интерфейсе Практикума.

</details>

- ### [3 спринт](https://github.com/TokmakDA/middle.messenger.praktikum.yandex/tree/sprint_3):

  - [x] Создание ветки в Git для выполнения заданий третьего спринта.
  - [x] Добавьте роутинг в проект:
    - Реализуйте роутер для регистрации роутов согласно сигнатуре в уроках.
    - У всех страниц должен быть собственный роут:
    - `/ — страница входа`,
    - `/sign-up — страница регистрации`,
    - `/settings — настройки профиля пользователя`,
    - `/messenger — чат`.
    - В DOM может быть активна только одна страница (при переходе на новую страницу не забудьте проверить, что старая была удалена из него).
    - При обновлении страницы с определённым URL должна отображаться та же самая страница. То есть если пользователь зашел, например, на страницу регистрации и обновил её, она загрузится снова.
    - Должны работать переходы по страницам через нажатие на кнопки в интерфейсе приложения. Если, например, на странице с настройками пользователя есть кнопка «Вернуться», по нажатию на неё должна загрузиться страница с чатами.
    - Должны работать переходы «Назад» и «Вперёд», как через интерфейс браузера, так и через роутер.
  - [x] Внедрите HTTP API чатов, авторизации и пользователей. Описание API найдёте по ссылке. После регистрации пользователь должен попадать сразу на страницу чата. Также в уроках этого спринта описаны «ручки» и как делать к ним запросы. Нужно добавить:
    - авторизацию в полном объеме (регистрация, авторизация, выход из системы);
    - работу с информацией пользователя (изменять данные пользователя, изменять аватар, изменять пароль);
    - работу с чатами (список чатов пользователя, создать новый чат, добавить пользователя в чат, удалить пользователя из чата).
    - ` Попробуйте добавить в роутер хотя бы самую простую проверку авторизации пользователя. Нужно, чтобы он перенаправлял неавторизованного пользователя на страницу логина.`
  - [x] Подключите WebSocket для работы с real-time сообщениями..
  - [x] Сборка должна быть при помощи Vite.
  - [x] Обновите README.md, а именно информацию о функциональности и использованных инструментах.
  - [x] Проверьте, что pull request из прошлого спринта «смёрджен» после того, как его принял ревьюер. Если да, после выполнения всех заданий этого спринта откройте pull request из ветки sprint_3 в ветку main. Назовите его "Sprint 3". В PR должны входить только те изменения, которые были сделаны в рамках конкретного спринта
  - [x] Подключен стор
  - [x] Подключен HOC
  - [x] Добавлены контроллеры

- ### [4 спринт](https://github.com/TokmakDA/middle.messenger.praktikum.yandex/tree/sprint_4):

  #### Основные задания

  - [ ] Напишите тесты для шаблонизатора, роутера, компонента, модуля отправки запросов. Файлы с тестами необходимо хранить рядом с тестируемыми элементами. Например, тесты для роутера должны лежать в той же папке, что и файл с кодом роутера. Используйте `Mocha` и `Chai`. С Jest вы будете работать в следующем модуле.
  - [ ] Настройте `precommit` на проект.
  - [ ] Проведите аудит пакетов, обновите их и приведите в актуальное и безопасное состояние.
  - [ ] Обновите `README.md` проекта. Обновите описание функциональности и использованных технологий, проверьте актуальность информации о том, как собрать ваш проект. Также укажите, как именно можно запустить тесты.
  - [ ] Проверьте, что pull request из прошлого спринта «смёрджен» после того, как его принял ревьюер. Если да, после выполнения всех заданий этого спринта откройте pull request из ветки `sprint_4` в ветку `main`. Назовите его "Sprint 4". В PR должны входить только те изменения, которые были сделаны в рамках конкретного спринта.
  - [ ] Когда будете готовы к сдаче проектной работы, отправьте ссылку на пул-реквест, открытый из ветки `sprint_4`, через форму в интерфейсе Практикума.

  #### Дополнительные задания:

  - Усовершенствуйте сборку:
    - Добавьте проверку кода (`TypeScript`, `ESlint`, `Stylelint`) прямо во время сборки: `vite-plugin-checker`,
    - Напишите собственный плагин.

## Команды:

- `npm i` - установка пакетов
- `npm run dev` — запуск проекта в режиме разработки,
- `npm run build` — сборка стабильной версии,
- `npm run preview` — локальный просмотр продакшен-сборки,
- `npm run start` - сборка и запуск проекта,

## Муршруты на свёрстанные страницы:

- Авторизация (`/`)
- Регистрация (`/signup`)
- Список чатов (`/messenger`)
- Профиль (`/settings`)
- Страница 404 (`/404`)
- Страница 500 (`/500`)

## Ссылки:

- [GitHub](https://github.com/TokmakDA/middle.messenger.praktikum.yandex)
- [Figma Макет](https://www.figma.com/file/c9YiqkWCMqjtdqIDItpCAG/messenger?type=design&node-id=0%3A1&mode=design&t=KKmiJiRISH8hpqlx-1)
- [Deploy Netlify](https://tokmak-da-messenger.netlify.app/)

## Автор:

[Dmitry Tokmak](https://github.com/TokmakDA)
