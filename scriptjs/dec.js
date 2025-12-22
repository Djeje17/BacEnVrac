// Récupère le bouton "Profil" depuis le HTML grâce à son id
const btnProfil = document.getElementById("btn-profil");

// Récupère le bouton "Déconnexion"
const btnDeconnexion = document.getElementById("btn-deconnexion");

// Récupère le conteneur qui contient les boutons utilisateur
const userButtons = document.getElementById("user-buttons");

// Vérifie que tous les éléments HTML existent pour éviter les erreurs
if (!btnProfil || !btnDeconnexion || !userButtons) {
    console.error("Un élément HTML est manquant dans la page");
}

// Vérifie si l'utilisateur est connecté (info stockée dans le localStorage)
if (localStorage.getItem("connecte") === "true") {
    afficherConnecte(); // utilisateur connecté → on affiche les boutons
} else {
    afficherDeconnecte(); // utilisateur non connecté → on cache les boutons
}

// Fonction appelée quand l'utilisateur est connecté
function afficherConnecte() {
    btnProfil.style.display = "inline-block";     // affiche le bouton Profil
    btnDeconnexion.style.display = "inline-block"; // affiche le bouton Déconnexion
    userButtons.style.display = "block";           // affiche le bloc utilisateur
}

// Fonction appelée quand l'utilisateur n'est pas connecté
function afficherDeconnecte() {
    btnProfil.style.display = "none";      // cache le bouton Profil
    btnDeconnexion.style.display = "none"; // cache le bouton Déconnexion
    userButtons.style.display = "none";    // cache le bloc utilisateur
}

// Écoute le clic sur le bouton Déconnexion
btnDeconnexion.addEventListener("click", () => {
    localStorage.removeItem("connecte"); // supprime l'état de connexion
    afficherDeconnecte();                // met à jour l'affichage
});



