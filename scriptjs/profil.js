// Récupère l’état de connexion depuis le localStorage
const estConnecte = localStorage.getItem("connecte");

// Récupère le profil utilisateur stocké
const profilStocke = localStorage.getItem("profilUtilisateur");

// Si l’utilisateur n’est pas connecté ou si aucun profil n’existe,
// on le redirige vers la page de connexion
if (!estConnecte || !profilStocke) {
  window.location.href = "connexion.html";
}

// Transforme le profil stocké (JSON) en objet JavaScript
const profil = JSON.parse(profilStocke);

// Affiche un message de bienvenue avec le prénom de l’utilisateur
document.getElementById("bonjourPrenom").textContent = profil.prenom;

// Préremplit les champs du formulaire avec les données du profil
document.getElementById("nom").value = profil.nom;
document.getElementById("prenom").value = profil.prenom;
document.getElementById("adresse").value = profil.adresse;
document.getElementById("email").value = profil.email;

// Gestion du bouton de déconnexion
document.getElementById("deconnexion").addEventListener("click", () => {
  // Supprime l’état de connexion
  localStorage.removeItem("connecte");

  // Redirige vers la page de connexion
  window.location.href = "connexion.html";
});

// Gestion du bouton de suppression de compte
document.getElementById("supprimerCompte").addEventListener("click", () => {

  // Affiche une boîte de confirmation pour éviter une suppression accidentelle
  const confirmation = confirm(
    "Êtes-vous sûr de vouloir supprimer votre compte ? Cette action est irréversible."
  );

  // Si l’utilisateur confirme la suppression
  if (confirmation) {
    // Supprime l’état de connexion
    localStorage.removeItem("connecte");

    // Supprime définitivement le profil utilisateur
    localStorage.removeItem("profilUtilisateur");

    // Redirige vers la page d’accueil
    window.location.href = "index.html";
  }
});






