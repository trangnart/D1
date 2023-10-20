import "./style.css";
import { setupCounter, counter, decreaseCounter } from "./counter.ts";

const app: HTMLDivElement = document.querySelector("#app")!;

app.innerHTML = `
<div>
    <h1>Licky Pop</h1>
    <div class="card">
        <button id="counterButton" type="button" class="main-button">🍭</button>
        <button id="purchaseButton1" type="button">Purchase 🍭 (cost 10 Licks). +0.1 units/sec</button>
        <button id="purchaseButton2" type="button">Purchase 🍬 (cost 100 Licks). +2.0 units/sec</button>
        <button id="purchaseButton3" type="button">Purchase 🍡 (cost 1000 Licks). +50 units/sec</button>
        <button id="purchaseButton4" type="button">Purchase 🍦 (cost 2000 Licks). +100 units/sec</button>
        <button id="purchaseButton5" type="button">Purchase 🧁 (cost 3000 Licks). +200 units/sec</button>
        <button id="countDisplay" type="button">The current growth rate: 0 /
                                                🍭 count: 0
                                                🍬 count: 0
                                                🍡 count: 0
                                                🍦 count: 0
                                                🧁 count: 0</button>
    </div>
</div>
`;

const gameName = "Licky Pop";
document.title = gameName;

const header = document.createElement("h1");
header.innerHTML = gameName;

interface Item {
  name: string;
  cost: number;
  rate: number;
  description: string;
}

const availableItems: Item[] = [
  { name: "lollipop", cost: 10, rate: 0.1, description: "A colorful lollipop creates intensive licking!" },
  { name: "candy", cost: 100, rate: 2, description: "A sweet candy to sastify your sweet tooth!" },
  { name: "dango", cost: 1000, rate: 50, description: "A dango skewer imported from Japan!" },
  { name: "iceCream", cost: 2000, rate: 100, description: "A soft serve ice cream that melt your tongue!" },
  { name: "cupCake", cost: 3000, rate: 200, description: "A small cupcake for a special treat!"},
];

const counts = availableItems.map(() => 0);
let newCosts = availableItems.map((item) => item.cost);
export let currentGrowthRate = 0;

setupCounter(
  document.querySelector<HTMLButtonElement>("#counterButton")!,
  (counter) => {
    const counterButton =
      document.querySelector<HTMLButtonElement>("#counterButton")!;

    counterButton.innerHTML = `Licking pop ${counter.toFixed(2)} Licks`;

    const countDisplay =
      document.querySelector<HTMLButtonElement>("#countDisplay")!;
    countDisplay.innerHTML = `The current growth rate: ${currentGrowthRate.toFixed(
      2,
    )} / ${availableItems.map(
      (item, index) => `
            ${item.name} count: ${counts[index]}`,
    )}`;

    availableItems.forEach((item, index) => {
      if (counter >= item.cost) purchaseButtons[index].disabled = false;
    });

  },
);

const purchaseButtons = [
  document.querySelector<HTMLButtonElement>("#purchaseButton1")!,
  document.querySelector<HTMLButtonElement>("#purchaseButton2")!,
  document.querySelector<HTMLButtonElement>("#purchaseButton3")!,
  document.querySelector<HTMLButtonElement>("#purchaseButton4")!,
  document.querySelector<HTMLButtonElement>("#purchaseButton5")!,
];

const purchaseUpgrade = (index: number) => {
  if (counter >= newCosts[index]) {
    const selectedItem = availableItems[index];
    newCosts[index] = selectedItem.cost * Math.pow(1.15, counts[index] + 1);
    decreaseCounter(selectedItem.cost);
    counts[index]++;
    currentGrowthRate += selectedItem.rate;
    const purchaseButton = purchaseButtons[index];
    purchaseButton.innerHTML = `Purchase ${selectedItem.name} (cost ${newCosts[
      index
    ].toFixed(2)} Licks). +${selectedItem.rate} units/sec`;
  }
  const counterButton = document.querySelector<HTMLButtonElement>("#counterButton")!;
  counterButton.innerHTML = `Licking Pop ${counter.toFixed(2)}x`;

  availableItems.forEach((item, i) => {
    if (counter >= item.cost) purchaseButtons[i].disabled = false;
    else purchaseButtons[i].disabled = true;
  });
};

purchaseButtons.forEach((button, index) => {
  button.addEventListener("click", () => purchaseUpgrade(index));
  button.disabled = true;
});