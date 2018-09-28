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

const app = new Vue({
    el: '#woorden',
    data: {
        newWords
    }
});


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