const electron = require('electron');

const curwindow = electron.remote.getCurrentWindow();
const woorden = curwindow.woorden;
const correct = [];
let currentIndex = Math.floor(Math.random() * woorden.length);
let currentWoord = curwindow.woorden[currentIndex];

const app = new Vue({
    el: '.container',
    data: {
        woorden,
        correct,
        currentWoord,
        currentIndex
    }
})

show();

function handleForm() {
    const form = document.querySelector('form');
    const nom = form.querySelector('label').innerText;
    const { gen, vert, geslacht } = form;
    if (checkWord({ nom: nom, gen: gen.value, vert: vert.value, geslacht: geslacht.value })) {
        app.correct.push(app.woorden.splice(app.currentIndex, 1)[0]);
    } else {
        const resp = document.querySelector('#response');
        resp.className = 'wrong';
        resp.innerHTML = `<p>${app.currentWoord.nom}, ${app.currentWoord.gen}: ${app.currentWoord.vert} (${app.currentWoord.geslacht})</p>`;
    }
    setTimeout(() => {
        updateWoord();
        show();
    }, 2500);
}

function updateWoord() {
    if (app.woorden.length != 0) {
        app.currentIndex = Math.floor(Math.random() * app.woorden.length);
        app.currentWoord = app.woorden[app.currentIndex];
    } else {
        curwindow.close();
    }
}

function show() {
    document.querySelector('#response').className = 'hiding';
    const form = document.querySelector('form');
    form.gen.value = '';
    form.vert.value = '';
    form.geslacht.value = 'm';
}

function checkWord(word) {
    const currentWoord = app.currentWoord;
    return currentWoord.gen == word.gen && currentWoord.geslacht == word.geslacht && currentWoord.vert.find(v => v == word.vert);
}