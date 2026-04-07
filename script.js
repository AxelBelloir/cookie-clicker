const image = document.getElementById('imgCouvreChef');

image.addEventListener('click', function() {
    alert("Vous avez cliqué sur l'image !");
    // Placez ici le reste de votre code
});






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


