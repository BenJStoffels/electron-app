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
    const nom = form.querySelector('label').innerText;
    const { gen, vert, geslacht } = form;
    if (checkWord({ nom: nom, gen: gen.value, vert: vert.value, geslacht: geslacht.value })) {
        const resp = document.querySelector('#response');
        resp.classList.remove('hiding');
        resp.classList.add('correct');
        resp.querySelector('div').innerText = `${nom}, ${gen.value}: ${vert.value} (${geslacht.value})`;
        correct.push(woorden.splice(currentIndex, 1));
    } else {
        const resp = document.querySelector('#response');
        resp.classList.remove('hiding');
        resp.classList.add('wrong');
        resp.querySelector('div').innerHTML = `<p>${currentWoord.nom}, ${currentWoord.gen}: ${currentWoord.vert} (${currentWoord.geslacht})</p>`;
    }
    setTimeout(updateWoord, 2500);
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
    document.querySelector('#response').className = 'hiding';
    const form = document.querySelector('form');
    form.className = 'woord';
    const label = form.querySelector('label');
    label.innerText = `${currentWoord.nom}, `;
    form.gen.value = '';
    form.vert.value = '';
    form.geslacht.value = 'm';
}

function checkWord(word) {
    return currentWoord.gen == word.gen && currentWoord.geslacht == word.geslacht && currentWoord.vert.find(v => v == word.vert);
}