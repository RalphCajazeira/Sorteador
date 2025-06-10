const right = document.querySelector(".right:not(.result)");
const rightResult = document.querySelector(".result");
const sorter = document.querySelector("#sorter");
const sorterAgain = document.querySelector("#sorter-again");
const form = document.querySelector("form");

const amount = document.getElementById("amount");
const amountStart = document.getElementById("amount-start");
const amountEnd = document.getElementById("amount-end");

form.addEventListener("submit", (event) => {
  event.preventDefault();
  let amountValue = Number(amount.value);
  let amountStartValue = Number(amountStart.value);
  let amountEndValue = Number(amountEnd.value);

  const numbers = [];
  for (let i = 0; i < amountValue; i++) {
    const number =
      Math.floor(Math.random() * amountEndValue) + amountStartValue;
    numbers.push(number);
  }
  console.log(numbers);

  right.style.display = "none";
  rightResult.style.display = "flex";
});

sorterAgain.addEventListener("click", (event) => {
  event.preventDefault();
  let amountValue = Number(amount.value);
  let amountStartValue = Number(amountStart.value);
  let amountEndValue = Number(amountEnd.value);

  const numbers = [];
  for (let i = 0; i < amountValue; i++) {
    const number =
      Math.floor(Math.random() * amountEndValue) + amountStartValue;
    numbers.push(number);
  }
  console.log(numbers);
});
