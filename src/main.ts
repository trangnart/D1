import "./style.css";
import { setupCounter, counter, decreaseCounter } from "./counter.ts";

const app: HTMLDivElement = document.querySelector("#app")!;
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
  { name: "🍭", cost: 10, rate: 0.1, description: "A colorful lollipop creates intensive licking!" },
  { name: "🍬", cost: 100, rate: 2, description: "A sweet candy to sastify your sweet tooth!" },
  { name: "🍡", cost: 1000, rate: 50, description: "A dango skewer imported from Japan!" },
  { name: "🍦", cost: 2000, rate: 100, description: "A soft serve ice cream that melt your tongue!" },
  { name: "🧁", cost: 3000, rate: 200, description: "A small cupcake for a special treat!"},
];

const counts = availableItems.map(() => 0);
let newCosts = availableItems.map((item) => item.cost);
export let currentGrowthRate = 0;

app.innerHTML = `
<div>
    <h1>${gameName}</h1>
    <div class="card">
        <button id="counterButton" type="button" class="main-button">👅 Pop 0 Licks</button>
        ${availableItems
          .map(
            (item, index) =>
              `<button id="purchaseButton${index + 1}" type="button">Purchase ${
                item.name
              } (cost ${item.cost} Licks). +${item.rate} units/sec</button>`,
          )
          .join("")}
        <button id="countDisplay" type="button">The current growth rate: 0 /
                                                ${availableItems
                                                  .map(
                                                    (item, index) =>
                                                      ` ${item.name} count: ${counts[index]}`,
                                                  )
                                                  .join("")}
        </button>
    </div>
</div>
`;

const purchaseButtons = availableItems.map((_, index) => {
  const button = document.querySelector<HTMLButtonElement>(
    `#purchaseButton${index + 1}`,
  )!;
  button.addEventListener("click", () => purchaseUpgrade(index));
  button.disabled = true;
  return button;
});

const counterButton = document.querySelector<HTMLButtonElement>("#counterButton")!;

setupCounter(
  document.querySelector<HTMLButtonElement>("#counterButton")!,
  (counter) => {
    counterButton.innerHTML = `👅 pop ${counter.toFixed(2)} Licks`;

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
  counterButton.innerHTML = `👅 Pop ${counter.toFixed(2)}x`;

  availableItems.forEach((item, i) => {
    if (counter >= item.cost) purchaseButtons[i].disabled = false;
    else purchaseButtons[i].disabled = true;
  });
};
