const electron = require('electron');

const curwindow = electron.remote.getCurrentWindow();
curwindow.response = curwindow.woorden;
const checkBox = document.querySelector('input');

const specialWords = [];

checkBox.onchange = function() {
    if (checkBox.checked && specialWords.length != 0) {
        drawFromList(specialWords);
        curwindow.response = specialWords;
    } else {
        checkBox.checked = false;
        drawFromList(curwindow.woorden);
        curwindow.response = curwindow.woorden;
    }
}


if (curwindow.woorden) {
    drawFromList(curwindow.woorden);
}

function drawFromList(list) {
    const woordenDiv = document.querySelector('.woorden');
    woordenDiv.innerHTML = '';


    list.forEach(elt => {
        let newdiv = document.createElement('div');
        newdiv.className = 'woordDiv';
        let star = document.createElement('span');
        star.innerHTML = specialWords.findIndex(element => element == elt) != -1 ? '&#9733' : '&#9734';
        star.className = 'star';
        newdiv.appendChild(star);
        newdiv.onclick = () => {
            const index = specialWords.findIndex(element => element == elt);
            if (index != -1) {
                specialWords.splice(index, 1);
                star.innerHTML = '&#9734';
            } else {
                specialWords.push(elt);
                star.innerHTML = '&#9733';
            }
        }
        let wordText = document.createElement('p');
        wordText.innerText = `${elt.nom}, ${elt.gen}: ${elt.vert} (${elt.geslacht})`;
        newdiv.appendChild(wordText);
        woordenDiv.appendChild(newdiv);
    });
}