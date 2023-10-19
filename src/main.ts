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

let lollipopCost = 10;
let candyCost = 100;
let dangoCost = 1000;

let newPopCost = 0;
let newCandyCost = 0;
let newDangoCost = 0;

export let currentGrowthRate = 0;
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

    if (counter >= lollipopCost) purchaseButtons[0].disabled = false;
    if (counter >= candyCost) purchaseButtons[1].disabled = false;
    if (counter >= dangoCost) purchaseButtons[2].disabled = false;
  }
);

const purchaseButtons = [
  document.querySelector<HTMLButtonElement>("#purchaseButton1")!,
  document.querySelector<HTMLButtonElement>("#purchaseButton2")!,
  document.querySelector<HTMLButtonElement>("#purchaseButton3")!,
];

const purchaseUpgrade = (index: number) => {
  if (index === 0 && counter >= lollipopCost) {
    newPopCost = lollipopCost * Math.pow(1.15, lollipopCount+1);
    decreaseCounter(lollipopCost);
    lollipopCount++;
    currentGrowthRate += growthRates[0];
    lollipopCost = newPopCost;
    const purchaseButton1 = document.querySelector<HTMLButtonElement>("#purchaseButton1")!;
    purchaseButton1.innerHTML = `Purchase 1 🍭 (cost ${newPopCost.toFixed(2)}x lick). Provides 0.1 units/sec`;
  }
  if (index === 1 && counter >= candyCost) {
    newCandyCost = candyCost * Math.pow(1.15, candyCount+1);
    decreaseCounter(candyCost);
    candyCount++;
    currentGrowthRate += growthRates[1];
    candyCost = newCandyCost;
    const purchaseButton2 = document.querySelector<HTMLButtonElement>("#purchaseButton2")!;
    purchaseButton2.innerHTML = `Purchase 1 🍬 (cost ${newCandyCost.toFixed(2)}x lick). Provides 2.0 units/sec`;
  }
  if (index === 2 && counter >= dangoCost) {
    newDangoCost = dangoCost * Math.pow(1.15, dangoCount+1);
    decreaseCounter(dangoCost);
    dangoCount++;
    currentGrowthRate += growthRates[2];
    dangoCost = newDangoCost;
    const purchaseButton3 = document.querySelector<HTMLButtonElement>("#purchaseButton3")!;
    purchaseButton3.innerHTML = `Purchase 1 🍡 (cost ${newDangoCost.toFixed(2)}x lick). Provides 50 units/sec`;
  }
  const counterButton = document.querySelector<HTMLButtonElement>("#counterButton")!;
  counterButton.innerHTML = `Licking Pop ${counter.toFixed(2)}x`;

  if (counter >= lollipopCost) purchaseButtons[0].disabled = false;
  else purchaseButtons[0].disabled = true;

  if (counter >= candyCost) purchaseButtons[1].disabled = false;
  else purchaseButtons[1].disabled = true;

  if (counter >= dangoCost) purchaseButtons[2].disabled = false;
  else purchaseButtons[2].disabled = true;
};

purchaseButtons.forEach((button, index) => {
  button.addEventListener("click", () => purchaseUpgrade(index));
  button.disabled = true;
});