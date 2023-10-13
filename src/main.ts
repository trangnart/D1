import "./style.css";
import { setupCounter } from "./counter.ts";

const app: HTMLDivElement = document.querySelector("#app")!;

document.querySelector<HTMLDivElement>("#app")!.innerHTML = `
<div>
    <div class="card">
        <button id="counter" type="button">Licky 🍭</button>
    </div>
</div>
`;
const gameName = "Licky Pop";

document.title = gameName;

const header = document.createElement("h1");
header.innerHTML = gameName;
app.append(header);

setupCounter(document.querySelector<HTMLButtonElement>("#counter")!);
