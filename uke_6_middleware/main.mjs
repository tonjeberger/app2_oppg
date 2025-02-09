import { readSessionInfo } from "../modules/saveSessionInfo.mjs";

const sessionContainer = document.getElementById("sessionContainer");
const counterContainer = document.getElementById('counterContainer');
const counterBtn = document.getElementById('counterBtn');

let url = "http://localhost:8000";


let count = 0;
let btnClicked = false;

let theDiv = document.createElement('div');

counter();


function counter() {
    
    theDiv.innerHTML = `
    <h2>you clicked the buttons ${count} times</h2>
    <hr>
    `;
    btnClicked = true;
    count++;
    console.log(count);
    counterContainer.appendChild(theDiv);

}

counterBtn.addEventListener('click', () => {
    counter();
    saveClicks();
});

function saveClicks() {
    localStorage.setItem('clicks', count);
}

