const electron = require('electron');

const curwindow = electron.remote.getCurrentWindow();
const woorden = curwindow.woorden;
woorden.forEach(word => {
    if (word.type == 'subs') {
        word.createHTML = function(base) {
            const form = document.createElement('form');
            form.setAttribute('action', 'javascript:handleForm()');
            form.className = 'woord';
            form.innerHTML = `<span>${this.nom}</span>,
            <input type="text" name="gen">: 
            <input type="text" name="vert">
            <input type="radio" name="geslacht" value="m" checked> m
            <input type="radio" name="geslacht" value="v"> v
            <input type="radio" name="geslacht" value="o"> o
            <input type="submit" value="submit">`;

            base.innerHTML = '';
            base.appendChild(form);
        }
    }
});
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
    const nom = form.querySelector('span').innerText;
    const { gen, vert, geslacht } = form;
    if (app.currentWoord.check({ nom: nom, gen: gen.value, vert: vert.value, geslacht: geslacht.value })) {
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
    app.currentWoord.createHTML(document.querySelector('div.woord'));
}