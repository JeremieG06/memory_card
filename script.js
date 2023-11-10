// Sélectionne tous les éléments HTML avec la classe "card" et les stocke dans la variable cards.
const cards = document.querySelectorAll(".card");

// Initialise le compteur de paires de cartes correspondantes.
let matched = 0;

// Variables pour stocker les deux cartes retournées.
let cardOne, cardTwo;

// Variable qui indique si le deck est désactivé pour éviter des interactions non voulues pendant le traitement.
let disableDeck = false;

// Fonction pour retourner une carte lorsqu'elle est cliquée.
function flipCard({target: clickedCard}) {
    // Vérifie si la carte cliquée n'est pas la même que la première carte et si le deck n'est pas désactivé.
    if(cardOne !== clickedCard && !disableDeck) {
        // Ajoute la classe "flip" pour montrer la face avant de la carte.
        clickedCard.classList.add("flip");

        // Si aucune première carte n'est sélectionnée, assigne la carte cliquée à cardOne.
        if(!cardOne) {
            return cardOne = clickedCard;
        }

        // Si une première carte est déjà sélectionnée, assigne la carte cliquée à cardTwo.
        cardTwo = clickedCard;
        // Désactive le deck pour éviter d'autres interactions pendant le traitement.
        disableDeck = true;

        // Récupère les chemins des images des deux cartes.
        let cardOneImg = cardOne.querySelector(".back-view img").src,
        cardTwoImg = cardTwo.querySelector(".back-view img").src;

        // Appelle la fonction pour vérifier si les cartes correspondent.
        matchCards(cardOneImg, cardTwoImg);
    }
}

// Fonction pour vérifier si les cartes correspondent.
function matchCards(img1, img2) {
    // Si les chemins des images sont les mêmes, les cartes correspondent.
    if(img1 === img2) {
        // Incrémente le compteur de paires correspondantes.
        matched++;

        // Si toutes les paires sont trouvées, mélange les cartes après un délai de 1 seconde.
        if(matched == 8) {
            setTimeout(() => {
                return shuffleCard();
            }, 1000);
        }

        // Désactive les événements de clic pour les deux cartes correspondantes.
        cardOne.removeEventListener("click", flipCard);
        cardTwo.removeEventListener("click", flipCard);

        // Réinitialise les cartes et réactive le deck.
        cardOne = cardTwo = "";
        return disableDeck = false;
    }

    // Si les cartes ne correspondent pas, effectue une animation de secousse.
    setTimeout(() => {
        cardOne.classList.add("shake");
        cardTwo.classList.add("shake");
    }, 400);

    // Réinitialise les cartes après une courte pause, enlevant la classe "shake" et "flip".
    setTimeout(() => {
        cardOne.classList.remove("shake", "flip");
        cardTwo.classList.remove("shake", "flip");
        cardOne = cardTwo = "";
        disableDeck = false;
    }, 1200);
}

// Fonction pour mélanger les cartes.
function shuffleCard() {
    // Réinitialise le compteur de paires correspondantes et réactive le deck.
    matched = 0;
    disableDeck = false;
    cardOne = cardTwo = "";

    // Tableau contenant les indices des images à utiliser pour chaque carte.
    let arr = [1, 2, 3, 4, 5, 6, 7, 8, 1, 2, 3, 4, 5, 6, 7, 8];

    // Mélange le tableau d'indices en utilisant une fonction de tri aléatoire.
    arr.sort(() => Math.random() > 0.5 ? 1 : -1);

    // Applique les nouvelles images mélangées aux cartes et réactive les événements de clic.
    cards.forEach((card, i) => {
        card.classList.remove("flip");
        let imgTag = card.querySelector(".back-view img");
        imgTag.src = `images/img-${arr[i]}.png`;
        card.addEventListener("click", flipCard);
    });
}

// Appelle la fonction pour mélanger les cartes au chargement initial de la page.
shuffleCard();
    
// Ajoute un événement de clic à chaque carte pour activer la fonction flipCard.
cards.forEach(card => {
    card.addEventListener("click", flipCard);
});
