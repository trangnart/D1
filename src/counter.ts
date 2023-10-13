export function setupCounter(element: HTMLButtonElement) {
  let counter = 0;
  let lastTime = performance.now();

  const updateCounter = (currentTime: number) => {
    const increment = (currentTime - lastTime) / 1000;
    counter += increment;
    element.innerHTML = `Licking 🍭 ${counter}x`;
    lastTime = currentTime;
    requestAnimationFrame(updateCounter);
  };
  element.addEventListener("click", () => requestAnimationFrame(updateCounter));
}
