const image = document.getElementById('imgCouvreChef');
let nmbCook = 0;
let cookForClick = 1;
let nmbCookSec = 0;

image.addEventListener('click', function() {
    this.classList.add('img-reduite');
    nmbCook = nmbCook + cookForClick;
    setTimeout(() => {
        this.classList.remove('img-reduite');
    }, 500);
});

setInterval(() => {
    nmbCook += nmbCookSec;
}, 1000);
setInterval(() => {
    document.getElementById('compteur').innerText = nmbCook + " Cook";
    document.getElementById('compteurSec').innerText = nmbCookSec + " Cook/s";
}, 0);






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


