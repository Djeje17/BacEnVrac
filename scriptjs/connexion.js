// Fonction asynchrone qui transforme un mot de passe en hash SHA-256
async function hashPassword(password) {
  // Convertit le mot de passe (texte) en données binaires
  const data = new TextEncoder().encode(password);

  // Applique l’algorithme de hachage SHA-256 sur les données binaires
  const hash = await crypto.subtle.digest("SHA-256", data);

  // Convertit le résultat binaire en chaîne hexadécimale lisible
  return Array.from(new Uint8Array(hash)) // transforme en tableau de nombres
    .map(b => b.toString(16).padStart(2, "0")) // convertit chaque nombre en hexadécimal
    .join(""); // assemble le tout en une seule chaîne
}

// Ajoute un écouteur sur la soumission du formulaire de connexion
document.getElementById("formConnexion").addEventListener("submit", async e => {
  // Empêche le rechargement de la page
  e.preventDefault();

  // Récupère le profil utilisateur stocké dans le localStorage
  const profilStocke = localStorage.getItem("profilUtilisateur");

  // Si aucun profil n’est trouvé, affiche une erreur
  if (!profilStocke) {
    message.textContent = "Aucun compte trouvé";
    return; // arrête le script
  }

  // Convertit le JSON stocké en objet JavaScript
  const profil = JSON.parse(profilStocke);

  // Hache le mot de passe saisi par l’utilisateur
  const hash = await hashPassword(motdepasse.value);

  // Vérifie si l’email et le mot de passe correspondent
  if (email.value === profil.email && hash === profil.passwordHash) {
    // Marque l’utilisateur comme connecté
    localStorage.setItem("connecte", "true");

    // Redirige vers la page profil
    window.location.href = "profil.html";
  } else {
    // Affiche un message d’erreur si les infos sont incorrectes
    message.textContent = "Email ou mot de passe incorrect";
  }
});




