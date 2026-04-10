const image = document.getElementById('imgCouvreChef');
let nmbCook = 0;
let cookForClick = 1;
let nmbCookSec = 0;
let machine = [["pates",1,50]];
let displayCook = 0;

image.addEventListener('click', function() {
    this.classList.add('img-reduite');
    nmbCook = nmbCook + cookForClick;
    setTimeout(() => {
        this.classList.remove('img-reduite');
    }, 100);
});

setInterval(() => {
    nmbCook += nmbCookSec;
}, 1000);

setInterval(() => {
    nmbCook += nmbCookSec / 10;
}, 100);

function updateDisplay() {
    let diff = nmbCook - displayCook;

    // Si l'écart est significatif, on fait bouger l'affichage
    if (Math.abs(diff) > 0.1) {
        // On se rapproche de la cible par petits pas (10% de la distance)
        displayCook += diff * 0.1;
    } else {
        // Si on est très proche, on égalise pile-poil
        displayCook = nmbCook;
    }

    // --- TON CODE DE FORMATAGE ---
    let scoreToFormat = Math.floor(displayCook);
    // ... (le reste de ton code de formatage reste identique)
    
    document.getElementById('compteur').innerText = scoreToFormat + unite + " Cook";
    document.getElementById('compteurSec').innerText = nmbCookSec.toFixed(1) + " Cook/s";

    requestAnimationFrame(updateDisplay);
}

// On lance la boucle d'affichage
updateDisplay();

window.machineBuy = function(machineChoose){
    let TRUEFALSE = false;
    for(let i =0; i < machine.length;++i){
        if(machine[i][0] == machineChoose){
            machineChoose = machine[i];
            TRUEFALSE = true;
            break;
        }
    }
    if(!TRUEFALSE){
        console.log("Machine : "+ machineChoose + " : inconnue");
        return;
    }
    if( nmbCook < machineChoose[2] ){
        console.log("Vous n'avez pas asser d'argent" + nmbCook + " < " + machineChoose[2]);
        return;
    }
    nmbCook = nmbCook - machineChoose[2];
    nmbCookSec = nmbCookSec + machineChoose[1];
    for(let i =0; i < machine.length;++i){
        if(machine[i][0] == machineChoose[0]){
            machine[i][2] = Math.ceil(machine[i][2] * 1.15);
            machine[i][1] = machine[i][1] + 1;
            UPDATE([[String(machine[i][1] - 1) + " Posseder", String(machine[i][2]) + " Cook"]]);
            break;
        }
    }
    return;
}
function UPDATE(updater){
    const machineId = [["patesCompt","patesPrix"]];
    for(let i = 0; i < machineId.length;++i){
        for(let a = 0; a < machineId[i].length;++a){
            document.getElementById(machineId[i][a]).innerText = updater[i][a];
        }
    }
    return;
}



/* ==================== API ==================== */

const API_URL = "https://cookie-clicker-l255.onrender.com/api";

async function callAPI(body = {},endpoint){
  try {
        const response = await fetch(`${API_URL}/${endpoint}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body)
        });
        return await response.json();
    } catch (e) {
        console.error(`Erreur sur ${endpoint}:`, e);
        notifier("Erreur de connexion au serveur");
        return { message: "Erreur", logs: [] };
    }
}


