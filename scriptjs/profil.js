/***************************************************
 * CHARGEMENT DU PROFIL DE L’UTILISATEUR CONNECTÉ
 ***************************************************/

// Récupère l’email de l’utilisateur connecté
const emailConnecte = localStorage.getItem("connecte");

// Si personne n’est connecté → redirection
if (!emailConnecte) {
  window.location.href = "connexion.html";
}

// Récupère la liste complète des utilisateurs
const utilisateurs = JSON.parse(localStorage.getItem("utilisateurs")) || [];

// Recherche l’utilisateur correspondant à l’email connecté
const profil = utilisateurs.find(
  utilisateur => utilisateur.email === emailConnecte
);

// Si l’utilisateur n’existe pas (sécurité)
if (!profil) {
  alert("Utilisateur introuvable");
  localStorage.removeItem("connecte");
  window.location.href = "connexion.html";
}

/***************************************************
 * AFFICHAGE DES INFORMATIONS DU PROFIL
 ***************************************************/

// Message de bienvenue
document.getElementById("bonjourPrenom").textContent = profil.prenom;

// Préremplissage du formulaire
document.getElementById("nom").value = profil.nom;
document.getElementById("prenom").value = profil.prenom;
document.getElementById("adresse").value = profil.adresse;
document.getElementById("email").value = profil.email;

/***************************************************
 * DÉCONNEXION
 ***************************************************/

document.getElementById("deconnexion").addEventListener("click", () => {
  localStorage.removeItem("connecte");
  window.location.href = "connexion.html";
});

/***************************************************
 * SUPPRESSION DU COMPTE
 ***************************************************/

document.getElementById("supprimerCompte").addEventListener("click", () => {

  const confirmation = confirm(
    "Êtes-vous sûr de vouloir supprimer votre compte ? Cette action est irréversible."
  );

  if (confirmation) {

    // Supprime l’utilisateur du tableau
    const utilisateursFiltres = utilisateurs.filter(
      utilisateur => utilisateur.email !== emailConnecte
    );

    // Sauvegarde le tableau mis à jour
    localStorage.setItem("utilisateurs", JSON.stringify(utilisateursFiltres));

    // Supprime l’état de connexion
    localStorage.removeItem("connecte");

    // Redirection
    window.location.href = "index.html";
  }
});







