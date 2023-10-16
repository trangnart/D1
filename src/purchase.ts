import { counter, decreaseCounter } from "./counter.ts";

export function setupPurchase(
  counterElement: HTMLButtonElement,
  purchaseElement: HTMLButtonElement,
  initialCost: number,
) {
  const purchaseUpgrade = () => {
    if (counter >= initialCost) {
      decreaseCounter(initialCost);
      counterElement.innerHTML = `Licking 🍭 ${counter.toFixed(2)}x`;
      if (counter <= initialCost) {
        purchaseElement.disabled = true;
      }
    }
  };
  purchaseElement.addEventListener("click", purchaseUpgrade);
  purchaseElement.disabled = true;
}
