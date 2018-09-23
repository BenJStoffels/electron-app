const electron = require('electron');

const curwindow = electron.remote.getCurrentWindow();

const woorden = shuffle(curwindow.woorden);
console.log(woorden);
let currentIndex = 0;
let currentWoord = woorden[currentIndex];
show();

function shuffle(array) {
    let newarray = new Array(array.length);
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        newarray[i] = array[j];
        newarray[j] = array[i];
    }
    return newarray;
}

function handleForm() {
    const form = document.querySelector('form');
    // TODO: check if the word is correct;
    updateWoord();
}

function updateWoord() {
    currentIndex++;
    currentWoord = woorden[currentIndex];
    show();
}

function show() {
    const form = document.querySelector('form');
    const label = form.querySelector('label');
    label.innerText = `${currentWoord.nom}, `;
    form.gen.value = '';
    form.vert.value = '';
    form.geslacht.value = 'm';
}