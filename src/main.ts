import "./style.css";
import { setupCounter } from "./counter.ts";
import { setupPurchase } from "./purchase.ts";

const app: HTMLDivElement = document.querySelector("#app")!;

app.innerHTML = `
<div>
    <div class="card">
        <button id="counterButton" type="button">Licky 🍭</button>
        <button id="purchaseButton" type="button">Purchase 1 🍭 (5x lick)</button>
    </div>
</div>
`;

const gameName = "Licky Pop";
document.title = gameName;

const header = document.createElement("h1");
header.innerHTML = gameName;
app.append(header);

const item1 = 5;

setupCounter(
  document.querySelector<HTMLButtonElement>("#counterButton")!,
  (counter) => {
    const counterButton =
      document.querySelector<HTMLButtonElement>("#counterButton")!;
    const purchaseButton =
      document.querySelector<HTMLButtonElement>("#purchaseButton")!;

    counterButton.innerHTML = `Licking 🍭 ${counter.toFixed(2)}x`;

    if (counter >= item1) {
      purchaseButton.disabled = false;
    }
  },
);

setupPurchase(
  document.querySelector<HTMLButtonElement>("#counterButton")!,
  document.querySelector<HTMLButtonElement>("#purchaseButton")!,
  item1,
);
