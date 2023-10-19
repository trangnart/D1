import { currentGrowthRate } from "./main.ts";
export let counter = 0;

export function setupCounter(
  element: HTMLButtonElement,
  counterCallback: (counter: number) => void,
) {
  let lastTime = 0;
  let isStarted = false;

  const updateCounter = (currentTime: number) => {
    if (!isStarted) {
      isStarted = true;
      lastTime = currentTime;
    }
    const elapsed = currentTime - lastTime;
    let increment = (elapsed / 1000) + currentGrowthRate;
    counter += increment;
    lastTime = currentTime;
    counterCallback(counter);
    if (isStarted) {
      requestAnimationFrame(updateCounter);
    }
  };

  element.addEventListener("click", () => {
    if (!isStarted) {
      isStarted = false;
      requestAnimationFrame(updateCounter);
    }
  });
}

export function decreaseCounter(cost: number) {
  counter -= cost;
}
