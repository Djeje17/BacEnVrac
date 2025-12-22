async function hashPassword(password) {
  const data = new TextEncoder().encode(password);
  const hash = await crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(hash))
    .map(b => b.toString(16).padStart(2, "0"))
    .join("");
}

document.getElementById("formInscription").addEventListener("submit", async e => {
  e.preventDefault();

  console.log("🟡 Étape 1 : submit détecté");

  const profilExistant = localStorage.getItem("profilUtilisateur");
  console.log("🟡 Étape 2 : profilExistant =", profilExistant);

  if (profilExistant !== null) {
    alert("Compte déjà existant");
    return;
  }

  const profil = {
    nom: nom.value.trim(),
    prenom: prenom.value.trim(),
    adresse: adresse.value.trim(),
    email: email.value.trim(),
    passwordHash: await hashPassword(motdepasse.value)
  };

  console.log("🟢 Étape 3 : profil à enregistrer =", profil);

  localStorage.setItem("profilUtilisateur", JSON.stringify(profil));
  localStorage.setItem("connecte", "true");

  console.log("🟢 Étape 4 : profil enregistré");

  window.location.href = "profil.html";
});




