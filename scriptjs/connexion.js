/***************************************************
 * CONNEXION UTILISATEUR (VERSION MULTI-COMPTES)
 ***************************************************/

// Fonction de hash (identique à l’inscription)
async function hashPassword(password) {
  const data = new TextEncoder().encode(password);
  const hash = await crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(hash))
    .map(b => b.toString(16).padStart(2, "0"))
    .join("");
}

// Soumission du formulaire de connexion
document.getElementById("formConnexion").addEventListener("submit", async e => {
  e.preventDefault();

  // Récupère tous les utilisateurs
  const utilisateurs = JSON.parse(localStorage.getItem("utilisateurs")) || [];

  // Recherche de l’utilisateur par email
  const utilisateur = utilisateurs.find(
    u => u.email === email.value.trim()
  );

  // Si l’email n’existe pas
  if (!utilisateur) {
    message.textContent = "Email inconnu";
    return;
  }

  // Hash du mot de passe saisi
  const hash = await hashPassword(motdepasse.value);

  // Vérification du mot de passe
  if (hash !== utilisateur.passwordHash) {
    message.textContent = "Mot de passe incorrect";
    return;
  }

  // ✅ Stocke L’EMAIL de l’utilisateur connecté
  localStorage.setItem("connecte", utilisateur.email);

  // Redirection vers le profil
  window.location.href = "profil.html";
});





