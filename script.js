const image = document.getElementById('imgCouvreChef');
let nmbCook = 999999;
let cookForClick = 1;
let nmbCookSec = 0;
let displayCook = 0;
let machine = [["pates", 1, 100, 0],["riz", 10, 1000, 0],["sauce", 100, 10000, 0],["salade", 1000, 100000, 0],["frite", 10000, 1000000, 0]]; // [Nom, Production de BASE, Prix, Nombre posseder]
const machineId = [["patesCompt", "patesPrix","patesDiv"],["rizCompt", "rizPrix","rizDiv"],["sauceCompt", "saucePrix","sauceDiv"],["saladeCompt", "saladePrix","saladeDiv"],["friteCompt", "fritePrix","friteDiv"]];
let skinNonDbloquer = [];
let SkinPosseder = [1];
const succesList = [
    [
        "Pro des pates",
        100,
        "divSuccesPates",
        "patesSkin"
    ],
    [
        "Pro du riz",
        100,
        "divSuccesRiz",
        "rizSkin"
    ],
    [
        "Pro des sauces",
        100,
        "divSuccesSauce",
        "sauceSkin"
    ],
    [
        "Pro des salades",
        100,
        "divSuccesSalade",
        "saladeSkin"
    ],
    [
        "Pro des frites",
        100,
        "divSuccesFrites",
        "friteSkin"
    ]
]


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

function clickChapeau(event) {
    // 1. Création de l'élément à partir de ton image existante
    const toque = document.createElement("img");
    toque.src = "Gemini_Generated_Image_k9cj3nk9cj3nk9cj-removebg-preview.png"; // On réutilise ton image
    toque.classList.add("toque-particule");

    // 2. Positionnement au niveau du clic
    // On centre la toque sur la souris (20px est la moitié de sa largeur)
    const x = event.pageX - 20;
    const y = event.pageY - 20;
    toque.style.left = x + "px";
    toque.style.top = y + "px";

    // 3. Calcul du hasard (Math.random)
    const dirX = (Math.random() - 0.5) * 200; // Entre -100px et +100px
    const rotMid = (Math.random() - 0.5) * 60; // Rotation au sommet
    const rotFin = (Math.random() - 0.5) * 360; // Rotation finale

    // 4. On envoie ces valeurs au CSS via les variables personnalisées
    toque.style.setProperty('--direction-x', dirX + "px");
    toque.style.setProperty('--rotation', rotMid + "deg");
    toque.style.setProperty('--rotation-fin', rotFin + "deg");

    // 5. Ajout au document et suppression automatique
    document.body.appendChild(toque);
    
    setTimeout(() => {
        toque.remove();
    }, 800); // On supprime après la fin de l'animation
}

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
        document.getElementById('compteur').innerText = out[0] + out[1] + " Cook";
    } else {
        document.getElementById('compteur').innerText = Math.floor(displayCook) + " Cook";
    }
    if(nmbCookSec >= 1000){
        out = unite(nmbCookSec);
    } else {
        out = [nmbCookSec,""];
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
        const divEL = document.getElementById(machineId[index][2]);
        divEL.classList.add('shake');
        setTimeout(() => divEL.classList.remove('shake'), 500);
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

function menuOn(div){
    document.getElementById(div).style.display = "block";
    document.getElementById("overplay").style.display = "block";
}
function menuOff(){
    document.getElementById("settings").style.display = "none";
    document.getElementById("succes").style.display = "none";
    document.getElementById("skins").style.display = "none";
    document.getElementById("overplay").style.display = "none";
}
function buySkin(skin){
    
}
function skinChange(newSkin, element){
    let bool = false;
    for (let i = 0;i < SkinPosseder.length;++i){
        if (newSkin == SkinPosseder[i]){
            bool = true;
            break;
        }
    }
    if (!bool){
        bool = false;
        for(let i = 0; i < skinNonDbloquer.length;++i){
            if (skinNonDbloquer[i] == newSkin){
                bool = true;
                break;
            }
            if (!bool){
                console.log("Ce skin n'existe pas");
                return;
            }
    
        }
    
    }
    const tousLesSkins = document.querySelectorAll('.butSkin');
    tousLesSkins.forEach(btn => btn.classList.remove('selected'));
    element.classList.add('selected');
}

function succes(suc){
    let bool = false;
    let index = 0;
    for(let i = 0;i< succesList.length; ++i){
        if(succesList[i][0] == suc[0]){
            bool = true;
            index = i;
        }
    }
    if(!bool){
        console.log("Ce succes n'existe pas");
        return;
    }
    if(suc[1] < succesList[index][1]){
        return;
    }
    document.getElementById(succesList[index][2]).style.display = "block";
    
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




// ================ CSS =============== //

// ----- Appel de fonction au demmarage ----- //

window.addEventListener('load', () => {
    setTimeout(() => {
    const skinParDefaut = document.getElementById('butObjet1');
    if (skinParDefaut) {
        skinChange(1, skinParDefaut);
    }
    }, 50);
});
