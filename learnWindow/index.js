const electron = require('electron');

const curwindow = electron.remote.getCurrentWindow();

const woorden = curwindow.woorden;
const correct = [];
console.log(woorden);
let currentIndex = Math.floor(Math.random() * woorden.length);
let currentWoord = woorden[currentIndex];
show();

function handleForm() {
    const form = document.querySelector('form');
    // TODO: check if the word is correct;
    const nom = form.querySelector('label').innerText;
    const { gen, vert, geslacht } = form;
    if (checkWord({ nom: nom, gen: gen.value, vert: vert.value, geslacht: geslacht.value })) {
        document.querySelector('#response').innerText = 'Correct !!!';
        correct.push(woorden.splice(currentIndex, 1));
    } else {
        document.querySelector('#response').innerText = `Wrong !!! the correct answer was ${currentWoord.nom}, ${currentWoord.gen}: ${currentWoord.vert} (${currentWoord.geslacht})`;
    }
    updateWoord();
}

function updateWoord() {
    try {
        currentIndex = Math.floor(Math.random() * woorden.length);
        currentWoord = woorden[currentIndex];
        show();
    } catch (err) {
        curwindow.close();
    }
}

function show() {
    const form = document.querySelector('form');
    const label = form.querySelector('label');
    label.innerText = `${currentWoord.nom}, `;
    form.gen.value = '';
    form.vert.value = '';
    form.geslacht.value = 'm';
}

function checkWord(word) {
    return currentWoord.gen == word.gen && currentWoord.geslacht == word.geslacht && currentWoord.vert.find(v => v == word.vert);
}