export function setupCounter(element: HTMLButtonElement) {
  let counter = 0;
  const setCounter = () => {
    element.innerHTML = `Lick ${counter++} 🍭`;
  };
  element.addEventListener("click", setCounter);
  setInterval(setCounter, 1000);
}
