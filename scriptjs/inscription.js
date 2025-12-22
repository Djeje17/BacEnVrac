// Fonction asynchrone qui transforme un mot de passe en hash SHA-256
async function hashPassword(password) {
  // Conversion du mot de passe (string) en données binaires
  const data = new TextEncoder().encode(password);

  // Calcul du hash SHA-256 (opération asynchrone)
  const hash = await crypto.subtle.digest("SHA-256", data);

  // Conversion du résultat binaire en chaîne hexadécimale lisible
  return Array.from(new Uint8Array(hash))
    .map(b => b.toString(16).padStart(2, "0"))
    .join("");
}

// Écoute de la soumission du formulaire d’inscription
document.getElementById("formInscription").addEventListener("submit", async e => {
  // Empêche le rechargement de la page
  e.preventDefault();

  console.log("🟡 Étape 1 : submit détecté");

  // Vérifie si un profil utilisateur existe déjà dans le localStorage
  const profilExistant = localStorage.getItem("profilUtilisateur");
  console.log("🟡 Étape 2 : profilExistant =", profilExistant);

  // Si un compte existe déjà, on bloque l’inscription
  if (profilExistant !== null) {
    alert("Compte déjà existant");
    return;
  }

  // Création de l’objet profil à partir des champs du formulaire
  const profil = {
    // Récupération et nettoyage des valeurs saisies
    nom: nom.value.trim(),
    prenom: prenom.value.trim(),
    adresse: adresse.value.trim(),
    email: email.value.trim(),

    // Le mot de passe n’est jamais stocké en clair mais sous forme de hash
    passwordHash: await hashPassword(motdepasse.value)
  };

  console.log("🟢 Étape 3 : profil à enregistrer =", profil);

  // Sauvegarde du profil dans le navigateur sous forme JSON
  localStorage.setItem("profilUtilisateur", JSON.stringify(profil));

  // Indique que l’utilisateur est considéré comme connecté
  localStorage.setItem("connecte", "true");

  console.log("🟢 Étape 4 : profil enregistré");

  // Redirection vers la page profil
  window.location.href = "profil.html";
});





