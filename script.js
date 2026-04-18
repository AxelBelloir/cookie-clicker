const image = document.getElementById('imgCouvreChef');
let nmbCook = 10000000000;
let cookForClick = 1;
let nmbCookSec = 0;
let displayCook = 0;
let machine = [["pates", 1, 100, 0],["riz", 10, 1000, 0],["sauce", 100, 10000, 0],["salade", 1000, 100000, 0],["frite", 10000, 1000000, 0]]; // [Nom, Production de BASE, Prix, Nombre posseder]
const machineId = [["patesCompt", "patesPrix"],["rizCompt", "rizPrix"],["sauceCompt", "saucePrix"],["saladeCompt", "saladePrix"],["friteCompt", "fritePrix"]];

image.addEventListener('click', function() {
    this.classList.add('img-reduite');
    nmbCook += cookForClick;
    setTimeout(() => this.classList.remove('img-reduite'), 100);
});

// Production automatique (toutes les secondes pour rester simple)
setInterval(() => {
    nmbCook += nmbCookSec;
    for(let i = 0;i < machine.length;++i){
        if(machine[i][2] <= nmbCook*2){
            document.getElementById(machine[i][0] + "Div").style.display = "block";
        }
    }
}, 1000);

function unite(incook){
    let cook = incook;
    let unite = "";
    let uniteNames = ["", " k", " million", " billion", " trillion", " quadrillion"];
    
    if (cook >= 1000) {
        let i = 0;
        let tempCook = cook;
        while (tempCook >= 1000 && i < uniteNames.length - 1) {
            tempCook = tempCook / 1000;

            i++;
        }
        cook = tempCook;
        unite = uniteNames[i];
        return [cook.toFixed(3),unite];
    }
}
function updateDisplay() {
    // Calcul de la différence pour l'animation fluide
    let diff = nmbCook - displayCook;
    let out;
    // On gère la montée ET la descente
    if (Math.abs(diff) > 0.5) {
        displayCook += diff * 0.1;
    } else {
        displayCook = nmbCook;
    }
    if(displayCook >= 1000){
        out = unite(displayCook);
    } else {
        out = [displayCook,""];
    }

    document.getElementById('compteur').innerText = out[0] + out[1] + " Cook";
    if(nmbCookSec >= 1000){
        out = unite(displayCook);
    } else {
        out = [displayCook,""];
    }
    document.getElementById('compteurSec').innerText = out[0] + out[1] + " Cook/s";

    requestAnimationFrame(updateDisplay);
}

updateDisplay();

window.machineBuy = function(machineChoose) {
    let index = -1;
    for (let i = 0; i < machine.length; i++) {
        if (machine[i][0] === machineChoose) {
            index = i;
            break;
        }
    }

    if (index === -1) return;

    let prixActuel = machine[index][2];
    let prodDeLaMachine = machine[index][1];

    if (nmbCook < prixActuel) {
        console.log("Pas assez d'argent !");
        return;
    }
    nmbCook -= prixActuel;
    nmbCookSec += prodDeLaMachine;
    machine[index][2] = Math.ceil(prixActuel * 1.15);
    machine[index][3] += 1;
    UPDATE([[machine[index][3], machine[index][2]]],[true,index]); 
};

function UPDATE(updater,n) {
    if (n[0]){
        let out;
        if(updater[0][0] >= 1000){
            out = unite(updater[0][0]);
        } else {
            out = [updater[0][0],""];
        }
        document.getElementById(machineId[n[1]][0]).innerText = out[0] + out[1] + " Posseder";
        if(updater[0][1] >= 1000){
            out = unite(updater[0][1]);
        } else {
            out = [updater[0][1],""];
        }
        document.getElementById(machineId[n[1]][1]).innerText = out[0] + out[1] + " Cook";
        return;
    }

    for (let i = 0; i < machineId.length; ++i) {
        for (let a = 0; a < machineId[i].length; ++a) {
            let el = document.getElementById(machineId[i][a]);
            if (el) el.innerText = updater[i][a];
        }
    }
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
