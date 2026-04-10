const image = document.getElementById('imgCouvreChef');
let nmbCook = 0;
let cookForClick = 1;
let nmbCookSec = 0;
let machine = [["pates",1,50]];

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
    let displayCook = nmbCook;
    let unite = "";
    let uniteNames = ["", " million", " billion", " trillion", " quadrillion"];
    if (nmbCook > 999999) {
        let i = 0;
        let tempCook = nmbCook;
        
        while (tempCook >= 1000000 && i < uniteNames.length - 1) {
            tempCook = Math.floor(tempCook / 1000000); // Division entière
            i++;
        }
        displayCook = tempCook;
        unite = uniteNames[i];
    }

    document.getElementById('compteur').innerText = displayCook + unite + " Cook";
    document.getElementById('compteurSec').innerText = nmbCookSec + " Cook/s";
}, 100);

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
            UPDATE([[String(machine[i][1] - 1) + "Posseder", String(machine[i][2]) + "Cook"]]);
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


