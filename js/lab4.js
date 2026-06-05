"use strict";

/*
  Лабораторна робота №4.
  Виконуються завдання для парного номера студента та варіант №2.
*/

function showLab4Result(taskNumber, value) {
  const output = document.getElementById(`lab4-result-${taskNumber}`);
  if (!output) return;

  output.hidden = false;
  output.textContent = typeof value === "string"
    ? value
    : JSON.stringify(value, null, 2);
}

// Завдання №1. Визначити чверть години за введеним часом.
function runLab4Task1() {
  const hour = prompt("Введіть час у форматі год:хв, наприклад 10:30");

  if (hour === null || hour.trim() === "") {
    alert("Введення скасовано або значення порожнє.");
    return;
  }

  const match = hour.trim().match(/^(\d{1,2}):(\d{2})$/);
  if (!match) {
    alert("Некоректний формат. Використовуйте формат год:хв.");
    return;
  }

  const hours = Number(match[1]);
  const minutes = Number(match[2]);

  if (hours < 0 || hours > 23 || minutes < 0 || minutes > 59) {
    alert("Некоректний час.");
    return;
  }

  let quarter;
  if (minutes < 15) quarter = "перша чверть години";
  else if (minutes < 30) quarter = "друга чверть години";
  else if (minutes < 45) quarter = "третя чверть години";
  else quarter = "четверта чверть години";

  const message = `Введений час: ${hour.trim()}. Це ${quarter}.`;
  console.log(message);
  alert(quarter[0].toUpperCase() + quarter.slice(1));
  showLab4Result(1, message);
}

// Завдання №2. Визначити день тижня через switch-case.
function runLab4Task2() {
  const day = prompt("Введіть номер дня тижня від 1 до 7");
  let finish;

  switch (day) {
    case "1": finish = "понеділок"; break;
    case "2": finish = "вівторок"; break;
    case "3": finish = "середа"; break;
    case "4": finish = "четвер"; break;
    case "5": finish = "п’ятниця"; break;
    case "6": finish = "субота"; break;
    case "7": finish = "неділя"; break;
    default: finish = "Некоректне значення";
  }

  console.log(`Результат: ${finish}`);
  alert(finish);
  showLab4Result(2, `Введено: ${day ?? "Cancel"}\nРезультат: ${finish}`);
}

// Завдання №3. Авторизація User1, User2, User3.
function runLab4Task3() {
  const users = {
    User1: "pass1",
    User2: "pass2",
    User3: "pass3"
  };

  let login;
  do {
    login = prompt("Введіть логін: User1, User2 або User3");
  } while (login !== null && login.trim() === "");

  if (login === null) {
    alert("Cancelled");
    showLab4Result(3, "Авторизацію скасовано.");
    return;
  }

  login = login.trim();
  console.log(`Введений логін: ${login}`);

  if (!Object.hasOwn(users, login)) {
    alert("I don't know you");
    showLab4Result(3, `Невідомий користувач: ${login}`);
    return;
  }

  const password = prompt(`Введіть пароль для ${login}`);
  const message = password === users[login]
    ? `Hello, ${login}`
    : "Wrong password";

  alert(message);
  console.log(message);
  showLab4Result(3, message);
}

// Завдання №4. Повідомлення про вартість доставки.
function getShippingMessage(country, price, deliveryFee) {
  const totalPrice = price + deliveryFee;
  return `Shipping to ${country} will cost ${totalPrice} credits`;
}

function runLab4Task4() {
  const results = [
    getShippingMessage("Australia", 120, 50),
    getShippingMessage("Germany", 80, 20),
    getShippingMessage("Ukraine", 100, 15)
  ];
  results.forEach(result => console.log(result));
  showLab4Result(4, results.join("\n"));
}

// Завдання №5. Перевірка достатності коштів для придбання дроїдів.
function makeTransaction(quantity, pricePerDroid, customerCredits) {
  const totalPrice = quantity * pricePerDroid;

  if (totalPrice > customerCredits) {
    return "Insufficient funds!";
  }

  return `You ordered ${quantity} droids worth ${totalPrice} credits!`;
}

function runLab4Task5() {
  const results = [
    makeTransaction(5, 3000, 23000),
    makeTransaction(3, 1000, 15000),
    makeTransaction(10, 5000, 8000)
  ];
  results.forEach(result => console.log(result));
  showLab4Result(5, results.join("\n"));
}

// Завдання №6. Об'єднати масиви та обмежити довжину результату.
function makeArray(firstArray, secondArray, maxLength) {
  const newArray = firstArray.concat(secondArray);
  return newArray.length > maxLength
    ? newArray.slice(0, maxLength)
    : newArray;
}

function runLab4Task6() {
  const results = [
    makeArray(["Mango", "Poly"], ["Ajax", "Chelsea"], 3),
    makeArray(["Mango", "Poly", "Houston"], ["Ajax", "Chelsea"], 4),
    makeArray(["Earth", "Jupiter"], ["Neptune", "Uranus"], 6)
  ];
  results.forEach(result => console.log(result));
  showLab4Result(6, results);
}

// Завдання №7, варіант 2.
function analyzeArrayVariant2(numbers) {
  const evenIndexSum = numbers.reduce(
    (sum, value, index) => index % 2 === 0 ? sum + value : sum,
    0
  );

  const maxValue = Math.max(...numbers);
  const maxIndex = numbers.indexOf(maxValue);

  const oddIndexItems = numbers
    .map((value, index) => ({ value, index }))
    .filter(item => item.index % 2 !== 0);

  const minOddIndexItem = oddIndexItems.reduce(
    (min, item) => item.value < min.value ? item : min,
    oddIndexItems[0]
  );

  return {
    evenIndexSum,
    maxValue,
    maxIndex,
    minAmongOddIndexes: minOddIndexItem.value,
    minOddIndex: minOddIndexItem.index
  };
}

function sortAscending(numbers) {
  return [...numbers].sort((a, b) => a - b);
}

function runLab4Task7() {
  const raw = prompt("Введіть цілі числа через пробіл", "8 3 14 -2 7 5 10 1");
  if (raw === null) return;

  const numbers = raw.trim().split(/\s+/).map(Number);
  if (numbers.length < 2 || numbers.some(Number.isNaN)) {
    alert("Потрібно ввести щонайменше два коректні числа.");
    return;
  }

  const analysis = analyzeArrayVariant2(numbers);
  const sorted = sortAscending(numbers);
  const result = {
    inputArray: numbers,
    ...analysis,
    sortedArray: sorted
  };

  console.log("Завдання №7, вхідний масив:", numbers);
  console.table(analysis);
  console.log("Вихідний масив:", sorted);
  showLab4Result(7, result);
}

// Завдання №8. Двовимірний масив, перший/останній елементи та вставка 25.
function createRandomMatrix(rows = 3, columns = 4, min = -20, max = 20) {
  return Array.from({ length: rows }, () =>
    Array.from({ length: columns }, () =>
      Math.floor(Math.random() * (max - min + 1)) + min
    )
  );
}

function runLab4Task8() {
  const matrix = createRandomMatrix();
  const flatArray = matrix.flat();
  const firstElement = flatArray[0];
  const lastElement = flatArray.at(-1);
  const changedArray = [...flatArray];
  changedArray.splice(2, 0, 25);

  const result = {
    matrix,
    firstElement,
    lastElement,
    arrayAfterInsert: changedArray
  };

  console.log("Двовимірний масив:");
  console.table(matrix);
  console.log(`Перший елемент: ${firstElement}; останній елемент: ${lastElement}`);
  console.log("Після вставки 25 після другого елемента:", changedArray);
  showLab4Result(8, result);
}

// Завдання №9, варіант 2. Динамічне багаторівневе меню зі статичного масиву.
const dynamicMenuItems = [
  { label: "Головна", href: "index.html" },
  {
    label: "Лабораторні роботи",
    children: [
      { label: "Лабораторна №1", href: "index.html#lab1" },
      { label: "Лабораторна №2", href: "index.html#lab2" },
      { label: "Лабораторна №4", href: "index.html#lab4" }
    ]
  },
  {
    label: "Завдання ЛР №4",
    children: [
      { label: "Завдання №1", href: "index.html#lab4-task1" },
      { label: "Завдання №7", href: "index.html#lab4-task7" },
      { label: "Завдання №9", href: "index.html#lab4-task9" }
    ]
  }
];

function createDynamicMenu(items, level = 0) {
  const list = document.createElement("ul");
  list.className = level === 0 ? "dynamic-menu" : "dynamic-submenu";

  items.forEach(item => {
    const listItem = document.createElement("li");
    const link = document.createElement("a");
    link.textContent = item.label;
    link.href = item.href || "#";
    listItem.append(link);

    if (item.children) {
      link.setAttribute("aria-haspopup", "true");
      listItem.append(createDynamicMenu(item.children, level + 1));
    }

    list.append(listItem);
  });

  return list;
}

function runLab4Task9() {
  const container = document.getElementById("lab4-dynamic-menu-demo");
  if (!container) return;

  container.replaceChildren(createDynamicMenu(dynamicMenuItems));
  console.log("Динамічне меню створено зі статичного масиву:", dynamicMenuItems);
  showLab4Result(9, "Динамічне багаторівневе меню успішно сформовано.");
}

window.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll("[data-run-lab4]").forEach(button => {
    button.addEventListener("click", () => {
      const taskNumber = button.dataset.runLab4;
      const runner = window[`runLab4Task${taskNumber}`];
      if (typeof runner === "function") runner();
    });
  });
});
