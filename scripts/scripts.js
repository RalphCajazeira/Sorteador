const right = document.querySelector(".right:not(.result)");
const rightResult = document.querySelector(".result");
const sorter = document.querySelector("#sorter");
const sorterAgain = document.querySelector("#sorter-again");
const form = document.querySelector("form");

const amount = document.getElementById("amount");
const amountStart = document.getElementById("amount-start");
const amountEnd = document.getElementById("amount-end");
const listResult = document.querySelector("#list-result");

// Adiciona um evento de clique ao botão "Sortear"
form.addEventListener("submit", (event) => {
  event.preventDefault();
  let amountValue = Number(amount.value);
  let amountStartValue = Number(amountStart.value);
  let amountEndValue = Number(amountEnd.value);

  const numbers = sortNumbers(amountValue, amountStartValue, amountEndValue);
  createList(numbers);

  // Escode o formulário e exibe o resultado
  right.style.display = "none";
  rightResult.style.display = "flex";
});

// Adiciona um evento de clique ao botão "Sortear novamente" o mesmo formulário
sorterAgain.addEventListener("click", (event) => {
  event.preventDefault();
  let amountValue = Number(amount.value);
  let amountStartValue = Number(amountStart.value);
  let amountEndValue = Number(amountEnd.value);

  // Gera os números aleatórios
  const numbers = sortNumbers(amountValue, amountStartValue, amountEndValue);
  createList(numbers);
});

// Adiciona um evento de clique ao botão "Sortear novamente"
// sorterAgain.addEventListener("click", (event) => {
//   event.preventDefault();
//   right.style.display = "flex";
//   rightResult.style.display = "none";
// });

// Função para criar a lista de números
function createList(numbers) {
  // Limpa o conteúdo da lista antes de adicionar os novos números
  listResult.innerHTML = "";

  //Cria o li e aciona os números nele, depois adiciona a li na ul
  for (const number of numbers) {
    const li = document.createElement("li");
    li.textContent = number;
    listResult.appendChild(li);
  }
}

// Função para gerar os números aleatórios
function sortNumbers(amountValue, amountStartValue, amountEndValue) {
  const numbers = Array.from(
    { length: amountValue },
    () =>
      Math.floor(Math.random() * (amountEndValue - amountStartValue + 1)) +
      amountStartValue
  );
  return numbers;
}
