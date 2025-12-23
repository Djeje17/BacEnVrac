document.addEventListener("DOMContentLoaded", () => {

  // Bouton Profil (peut exister ou non selon la page)
  const btnProfil = document.getElementById("btn-profil");

  // ⚠️ ID corrigé : correspond à ton HTML
  const btnDeconnexion = document.getElementById("deconnexion");

  // Conteneur utilisateur (peut être absent)
  const userButtons = document.getElementById("user-buttons");

  const estConnecte = !!localStorage.getItem("connecte");


  // 👉 Si l'utilisateur est connecté
  if (estConnecte) {
    if (btnProfil) btnProfil.style.display = "inline-block";
    if (btnDeconnexion) btnDeconnexion.style.display = "inline-block";
    if (userButtons) userButtons.style.display = "block";
  }
  // 👉 Si l'utilisateur n'est PAS connecté
  else {
    if (btnProfil) btnProfil.style.display = "none";
    if (btnDeconnexion) btnDeconnexion.style.display = "none";
    if (userButtons) userButtons.style.display = "none";
  }

  // Gestion de la déconnexion UNIQUEMENT si le bouton existe
  if (btnDeconnexion) {
    btnDeconnexion.addEventListener("click", () => {
      localStorage.removeItem("connecte");
      window.location.href = "connexion.html";
    });
  }

});




