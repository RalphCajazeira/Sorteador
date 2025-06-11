const right = document.querySelector(".right:not(.result)");
const rightResult = document.querySelector(".result");
const sorter = document.querySelector("#sorter");
const sorterAgain = document.querySelector("#sorter-again");
const form = document.querySelector("form");

const amount = document.getElementById("amount");
const amountStart = document.getElementById("amount-start");
const amountEnd = document.getElementById("amount-end");
const listResult = document.querySelector("#list-result");
const noRepeat = document.getElementById("no-repeat");

let currentAnimation = null;
let timeouts = [];
let floatElements = [];

// Cancelamento de animação ativa
function cancelCurrentAnimation() {
  if (currentAnimation) {
    currentAnimation.cancel();
    currentAnimation = null;
  }
  timeouts.forEach(clearTimeout);
  timeouts = [];
  floatElements.forEach((el) => el.remove());
  floatElements = [];
}

// Evento botão "Sortear"
form.addEventListener("submit", (event) => {
  event.preventDefault();
  const numbers = getInputNumbers();
  createList(numbers);
  right.style.display = "none";
  rightResult.style.display = "flex";
});

// Evento botão "Sortear novamente"
sorterAgain.addEventListener("click", (event) => {
  event.preventDefault();
  const numbers = getInputNumbers();
  createList(numbers);
});

// Obter valores dos inputs
function getInputNumbers() {
  const amountValue = Number(amount.value);
  const amountStartValue = Number(amountStart.value);
  const amountEndValue = Number(amountEnd.value);
  return sortNumbers(
    amountValue,
    amountStartValue,
    amountEndValue,
    noRepeat.checked
  );
}

// Criar lista animada
function createList(numbers) {
  cancelCurrentAnimation();
  listResult.innerHTML = "";

  const wrapper = document.querySelector(".animation-wrapper");
  const numberEl = wrapper.querySelector(".number-display");
  const image = wrapper.querySelector(".rotate-img");

  wrapper.style.display = "block";
  let index = 0;
  let rotation = 0;
  let isCancelled = false;

  currentAnimation = {
    cancel: () => {
      isCancelled = true;
      wrapper.style.display = "none";
      numberEl.textContent = "";
      numberEl.style.opacity = 0;
      image.style.transform = "rotate(0deg)";
    },
  };

  function animateNext() {
    if (isCancelled || index >= numbers.length) {
      wrapper.style.display = "none";
      return;
    }

    const currentNumber = numbers[index];

    // Gira imagem imediatamente
    rotation += 180;
    image.style.transition = "transform 2s ease-in-out";
    image.style.transform = `rotate(${rotation}deg)`;

    // Reset número
    numberEl.textContent = "";
    numberEl.style.opacity = "0";
    numberEl.style.fontSize = "4rem";
    numberEl.style.transform = "translate(-50%, -50%) scale(1)";

    const showNumberTimeout = setTimeout(() => {
      if (isCancelled) return;
      numberEl.textContent = currentNumber;
      numberEl.style.opacity = "1";

      const moveTimeout = setTimeout(() => {
        if (isCancelled) return;

        const numberRect = numberEl.getBoundingClientRect();
        const li = document.createElement("li");
        li.textContent = currentNumber;
        li.style.opacity = "0";
        listResult.appendChild(li);
        const liRect = li.getBoundingClientRect();

        const float = numberEl.cloneNode(true);
        float.style.position = "fixed";
        float.style.zIndex = 1000;
        float.style.margin = 0;
        float.style.opacity = 1;
        float.style.fontSize = "4rem";
        float.style.transform = "translate(-50%, -50%) scale(1)";
        float.style.left = `${numberRect.left + numberRect.width / 2}px`;
        float.style.top = `${numberRect.top + numberRect.height / 2}px`;
        float.style.transition = "all 0.6s ease-in-out, font-size 0.6s ease";
        document.body.appendChild(float);
        floatElements.push(float);

        requestAnimationFrame(() => {
          float.style.left = `${liRect.left + liRect.width / 2}px`;
          float.style.top = `${liRect.top + liRect.height / 2}px`;
          float.style.opacity = 0;
          float.style.transform = "translate(-50%, -50%) scale(0.75)";
          float.style.fontSize = "3rem";
        });

        const finalizeTimeout = setTimeout(() => {
          if (isCancelled) {
            float.remove();
            return;
          }
          float.remove();
          li.style.opacity = 1;
          index++;
          animateNext();
        }, 700);
        timeouts.push(finalizeTimeout);
      }, 1000);
      timeouts.push(moveTimeout);
    }, 1000);

    timeouts.push(showNumberTimeout);
  }

  // Inicia com giro imediato e depois a animação
  rotation += 180;
  image.style.transition = "transform 2s ease-in-out";
  image.style.transform = `rotate(${rotation}deg)`;

  timeouts.push(
    setTimeout(() => {
      if (!isCancelled) animateNext();
    }, 0)
  );
}

// Gera números aleatórios
function sortNumbers(amountValue, start, end, noRepeat = false) {
  const result = [];
  while (result.length < amountValue) {
    const number = Math.floor(Math.random() * (end - start + 1)) + start;
    if (noRepeat && !result.includes(number)) {
      result.push(number);
    } else if (!noRepeat) {
      result.push(number);
    }
  }
  return result;
}
