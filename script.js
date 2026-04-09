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

function machineBuy(let machineChoose){
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
    if( cook < machine ){
        console.log("Vous n'avez pas asser d'argent" + cook + " < " + machineChoose[2]);
        return;
    }
    cook = cook - machineChoose[2];
    nmbCookSec = nmbCookSec + machineChoose[1];
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


