const electron = require('electron');

const curwindow = electron.remote.getCurrentWindow();
const checkBox = document.querySelector('input');

const specialWords = [];
const words = curwindow.woorden;

const app = new Vue({
    el: '#woorden',
    data: {
        curwords: words,
        specialWords: specialWords,
        words: words
    }
});

checkBox.onchange = function() {
    if (checkBox.checked && specialWords.length != 0) {
        app.curwords = app.specialWords;
        curwindow.woorden = specialWords;
    } else {
        checkBox.checked = false;
        app.curwords = app.words
        curwindow.woorden = words;
    }
}

function onClick(e) {
    const nom = e.querySelector('p').innerText.split(", ")[0];
    const gen = e.querySelector('p').innerText.split(", ")[1].split(": ")[0];
    const vert = e.querySelector('p').innerText.split(": ")[1].split(", (")[0].split(", ");
    const geslacht = e.querySelector('p').innerText.split(", (")[1].split(")")[0];
    const index = app.specialWords.findIndex(element => {
        return element.nom == nom && element.gen == gen;
    });
    if (index != -1) {
        app.specialWords.splice(index, 1);
    } else {
        app.specialWords.push({ nom, gen, vert, geslacht });
        console.log(app.specialWords);
    }
}