import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;

document.querySelector<HTMLDivElement>("#app")!.innerHTML = `
<div>
    <div class="card">
        <button id="counter" type="button">Click 🍭</button>
    </div>
</div>
`;
const gameName = "Clicky Pop";

document.title = gameName;

const header = document.createElement("h1");
header.innerHTML = gameName;
app.append(header);
