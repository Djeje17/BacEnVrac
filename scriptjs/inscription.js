// ===============================
// Fonction asynchrone de hachage
// ===============================
async function hashPassword(password) {
  // Transforme le mot de passe texte en données binaires
  const data = new TextEncoder().encode(password);

  // Applique l’algorithme SHA-256
  const hash = await crypto.subtle.digest("SHA-256", data);

  // Convertit le résultat binaire en chaîne hexadécimale
  return Array.from(new Uint8Array(hash))
    .map(b => b.toString(16).padStart(2, "0"))
    .join("");
}

// =======================================
// Gestion de la soumission du formulaire
// =======================================
document.getElementById("formInscription").addEventListener("submit", async e => {
  e.preventDefault();

  // Récupération des utilisateurs existants
  let utilisateurs = JSON.parse(localStorage.getItem("utilisateurs")) || [];

  // Récupération et nettoyage de l’email
  const emailValue = email.value.trim().toLowerCase();

  // 🔎 Vérification : l’utilisateur existe déjà ?
  const utilisateurExiste = utilisateurs.find(u => u.email === emailValue);

  if (utilisateurExiste) {
    alert("❌ Un compte avec cet email existe déjà.");
    return;
  }

  // Création du profil utilisateur
  const profil = {
    nom: nom.value.trim(),
    prenom: prenom.value.trim(),
    adresse: adresse.value.trim(),
    email: emailValue,
    passwordHash: await hashPassword(motdepasse.value)
  };

  // Ajout du nouvel utilisateur à la liste
  utilisateurs.push(profil);

  // Sauvegarde de la liste complète
  localStorage.setItem("utilisateurs", JSON.stringify(utilisateurs));

  // Marque l’utilisateur comme connecté
  localStorage.setItem("utilisateurConnecte", JSON.stringify(profil));

  // Redirection vers le profil
  window.location.href = "profil.html";
});



