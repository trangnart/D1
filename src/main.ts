import "./style.css";
import { setupCounter, counter, decreaseCounter } from "./counter.ts";

const app: HTMLDivElement = document.querySelector("#app")!;

app.innerHTML = `
<div>
    <div class="card">
        <button id="counterButton" type="button">Licky Pop</button>
        <button id="purchaseButton1" type="button">Purchase 1 🍭 (cost 10x lick). Provides 0.1 units/sec</button>
        <button id="purchaseButton2" type="button">Purchase 1 🍬 (cost 100x lick). Provides 2.0 units/sec</button>
        <button id="purchaseButton3" type="button">Purchase 1 🍡 (cost 1000x lick). Provides 50 units/sec</button>
        <button id="countDisplay" type="button">The current growth rate: 0
                                                🍭 count: 0
                                                🍬 count: 0
                                                🍡 count: 0</button>
    </div>
</div>
`;

const gameName = "Licky Pop";
document.title = gameName;

const header = document.createElement("h1");
header.innerHTML = gameName;
app.append(header);

let lollipopCount = 0;
let candyCount = 0;
let dangoCount = 0;
export let currentGrowthRate = 0;

const itemCost = { L: 10, C: 100, D: 1000 };
const growthRates = [0.1, 2.0, 50];

setupCounter(
  document.querySelector<HTMLButtonElement>("#counterButton")!,
  (counter) => {
    const counterButton = document.querySelector<HTMLButtonElement>("#counterButton")!;

    counterButton.innerHTML = `Licking pop ${counter.toFixed(2)}x`;

    const countDisplay = document.querySelector<HTMLButtonElement>("#countDisplay")!;
    countDisplay.innerHTML = `The current growth rate: ${currentGrowthRate.toFixed(
      2,
    )}
            🍭 count: ${lollipopCount}
            🍬 count: ${candyCount}
            🍡 count: ${dangoCount}`;

    if (counter >= itemCost.L) purchaseButtons[0].disabled = false;
    if (counter >= itemCost.C) purchaseButtons[1].disabled = false;
    if (counter >= itemCost.D) purchaseButtons[2].disabled = false;
  }
);

const purchaseButtons = [
  document.querySelector<HTMLButtonElement>("#purchaseButton1")!,
  document.querySelector<HTMLButtonElement>("#purchaseButton2")!,
  document.querySelector<HTMLButtonElement>("#purchaseButton3")!,
];

const purchaseUpgrade = (index: number) => {
  if (index === 0 && counter >= itemCost.L) {
    decreaseCounter(itemCost.L);
    lollipopCount++;
    currentGrowthRate += growthRates[0];
  }
  if (index === 1 && counter >= itemCost.C) {
    decreaseCounter(itemCost.C);
    candyCount++;
    currentGrowthRate += growthRates[1];
  }
  if (index === 2 && counter >= itemCost.D) {
    decreaseCounter(itemCost.D);
    dangoCount++;
    currentGrowthRate += growthRates[2];
  }
  const counterButton = document.querySelector<HTMLButtonElement>("#counterButton")!;
  counterButton.innerHTML = `Licking 🍭 ${counter.toFixed(2)}x`;

  if (counter >= itemCost.L) purchaseButtons[0].disabled = false;
  else purchaseButtons[0].disabled = true;

  if (counter >= itemCost.C) purchaseButtons[1].disabled = false;
  else purchaseButtons[1].disabled = true;

  if (counter >= itemCost.D) purchaseButtons[2].disabled = false;
  else purchaseButtons[2].disabled = true;
};

purchaseButtons.forEach((button, index) => {
  button.addEventListener("click", () => purchaseUpgrade(index));
  button.disabled = true;
});