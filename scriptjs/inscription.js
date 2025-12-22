/***************************************************
 * FONCTION DE HASH DU MOT DE PASSE
 ***************************************************/

// Fonction asynchrone qui prend un mot de passe en clair
// et retourne son hash SHA-256 sous forme de texte hexadécimal
async function hashPassword(password) {

  // Transforme le mot de passe (string) en données binaires
  // car l’API crypto ne travaille pas avec des strings
  const data = new TextEncoder().encode(password);

  // Calcule le hash SHA-256 (opération asynchrone)
  const hash = await crypto.subtle.digest("SHA-256", data);

  // Convertit le résultat binaire en tableau d’octets,
  // puis chaque octet en hexadécimal sur 2 caractères
  return Array.from(new Uint8Array(hash))
    .map(b => b.toString(16).padStart(2, "0"))
    .join("");
}


/***************************************************
 * GESTION DE L’INSCRIPTION
 ***************************************************/

// On écoute la soumission du formulaire d’inscription
document.getElementById("formInscription").addEventListener("submit", async e => {

  // Empêche le rechargement automatique de la page
  e.preventDefault();

  // Récupère la liste des utilisateurs déjà enregistrés
  // Si elle n’existe pas encore, on crée un tableau vide
  const utilisateurs = JSON.parse(localStorage.getItem("utilisateurs")) || [];

  // Vérifie si l’email saisi existe déjà dans la liste
  // some() renvoie true si AU MOINS un utilisateur a le même email
  const emailExiste = utilisateurs.some(
    utilisateur => utilisateur.email === email.value.trim()
  );

  // Si l’email existe déjà, on bloque l’inscription
  if (emailExiste) {
    alert("Un compte avec cet email existe déjà");
    return; // arrêt du script
  }

  // Création de l’objet représentant le nouvel utilisateur
  const nouvelUtilisateur = {

    // Récupération des valeurs des champs du formulaire
    // trim() enlève les espaces inutiles
    nom: nom.value.trim(),
    prenom: prenom.value.trim(),
    adresse: adresse.value.trim(),
    email: email.value.trim(),

    // Le mot de passe n’est JAMAIS stocké en clair
    // On stocke uniquement son hash
    passwordHash: await hashPassword(motdepasse.value)
  };

  // Ajoute le nouvel utilisateur au tableau existant
  utilisateurs.push(nouvelUtilisateur);

  // Sauvegarde la liste complète des utilisateurs dans le localStorage
  // JSON.stringify est nécessaire car le localStorage ne stocke que du texte
  localStorage.setItem("utilisateurs", JSON.stringify(utilisateurs));

  // Stocke l’email de l’utilisateur connecté
  // (permet de savoir qui est connecté sur les autres pages)
  localStorage.setItem("connecte", email.value.trim());

  // Redirige l’utilisateur vers sa page de profil
  window.location.href = "profil.html";
});





