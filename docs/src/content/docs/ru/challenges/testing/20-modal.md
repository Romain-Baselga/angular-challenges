---
title: 🟠 Модальное окно
description: Задача 20 посвящена тестированию Модальных окн
author: thomas-laforge
contributors:
  - Dinozavvvr
challengeNumber: 20
command: testing-modal
sidebar:
  order: 111
---

## Информация

В этом небольшом приложении у вас есть поле ввода, в котором вы должны ввести имя, и кнопка **Confirm** для отправки формы.
Если вы вводите имя, появится модальное окно подтверждения; в противном случае будет отображено модальное окно с ошибкой.
В модальном окне подтверждения, если пользователь нажимает кнопку **Confirm**, появится сообщение с подтверждением отправки формы. Если пользователь нажимает **Cancel**, будет отображено сообщение об ошибке.

Цель этой задачи - протестировать модальные окна внутри вашего приложения. Для этого мы будем тестировать всё приложение, как это делает end-to-end тест. Это означает, что мы будем тестировать `AppComponent` как черный ящик и реагировать на события на странице. <b>Не следует тестировать внутренние детали</b>. Разница между e2e тестом и интеграционным тестом заключается в том, что мы будем подделывать все вызовы API. _(Все http-запросы фальсифицированы внутри этого приложения и отличаются от тех что присутствуют в реальном корпоративном приложении.)_

Вы можете поиграть с этим, запустив: `npx nx serve testing-modal`.

Файл с именем `app.component.spec.ts` позволит вам тестировать ваше приложение с использованием библиотеки Testing Library. Чтобы запустить наборы тестов, вы должны выполнить команду `npx nx test testing-modal`. Вы также можете установить [Jest Runner](https://marketplace.visualstudio.com/items?itemName=firsttris.vscode-jest-runner), чтобы выполнять тесты, щелкая на кнопку `Run` над каждым блоком `describe` или `it`.

Для тестирования с использованием Cypress вы будете выполнять свои тесты внутри файла `app.component.cy.ts` и запускать команду `npx nx component-test testing-modal` для выполнения наборов тестов. Вы можете добавить флаг `--watch`, чтобы выполнять ваши тесты в режиме наблюдения.

# Задание

Цель - протестировать несколько поведений приложения, описанных в каждом тестовом файле, с использованием библиотеки Testing Library и Cypress Component Testing.

:::note
Я создал несколько блоков `it`, но вы можете добавить больше тестов, если хотите.
:::
