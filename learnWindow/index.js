const electron = require('electron');

const curwindow = electron.remote.getCurrentWindow();

if (curwindow.woorden) {
    drawFromList(curwindow.woorden);
}

function drawFromList(list) {
    const woordenDiv = document.querySelector('.woorden');
    woordenDiv.innerHTML = '';


    list.forEach(elt => {
        let newdiv = document.createElement('div');
        newdiv.className = 'woordDiv';
        let wordText = document.createElement('p');
        wordText.innerText = `${elt.nom}, ${elt.gen}: ${elt.vert} (${elt.geslacht})`;
        newdiv.appendChild(wordText);
        woordenDiv.appendChild(newdiv);
    });
}