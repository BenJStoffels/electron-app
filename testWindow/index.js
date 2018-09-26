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


function check(d, w) {
    console.log(d[w.gen].value == w.gen, d[w.gen].value, w.gen);
    console.log(w.vert.find(v => v == d[w.vert[0]].value), d[w.vert[0]].value, w.vert);
    console.log(d[w.nom].value == w.geslacht, d[w.nom].value, w.geslacht);

    return d[w.gen].value == w.gen && w.vert.find(v => v == d[w.vert[0]].value) && d[w.nom].value == w.geslacht;
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