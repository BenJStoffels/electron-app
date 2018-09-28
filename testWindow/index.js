const electron = require('electron');
const curwindow = electron.remote.getCurrentWindow();
const words = curwindow.woorden;

const newWords = [];
if (words.length > 10) {
    for (let i = 0; i < 10; i++) {
        const index = Math.floor(Math.random() * words.length);
        newWords.push(words.splice(index, 1)[0]);
    }
} else {
    while (words) {
        const index = Math.floor(Math.random() * words.length);
        newWords.push(words.splice(index, 1)[0]);
    }
}

newWords.forEach(word => {
    if (word.type == 'subs') {
        word.createHTML = function(base) {
            const div = document.createElement('div');
            div.className = 'woordDiv';
            div.innerHTML = `<span>${this.nom}, </span>
            <input type="text" name="${this.gen}">:
            <input type="text" name="${this.vert[0]}">
            <input type="radio" name="${this.nom}" value="m" checked> m
            <input type="radio" name="${this.nom}" value="v"> v
            <input type="radio" name="${this.nom}" value="o"> o`;

            base.appendChild(div);
        }
    }
});

const app = new Vue({
    el: '#woorden',
    data: {
        newWords
    }
});

start();

function check(form, currentWoord) {
    const gen = form[currentWoord.gen].value;
    const vert = form[currentWoord.vert[0]].value;
    const geslacht = form[currentWoord.nom].value;

    return currentWoord.check({ gen, vert, geslacht });
}

function handleForm() {
    const form = document.querySelector('form');
    let fouten = 0;
    form.querySelectorAll('div').forEach((ans, i) => {
        if (check(form, app.newWords[i])) {
            ans.className = 'correct';
        } else {
            ans.className = 'wrong';
            fouten++;
        }
    });
    console.log(fouten);
}

function start() {
    app.newWords.forEach(word => word.createHTML(document.querySelector('form.woord')));
    const form = document.querySelector('form.woord');
    const btn = document.createElement('input');
    btn.setAttribute('type', 'submit');
    btn.setAttribute('value', 'submit');
    form.appendChild(btn);
}