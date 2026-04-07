const image = document.getElementById('imgCouvreChef');
let nmbCook = 0;
let cookForClick = 1;
let nmbCookSec = 0;

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


