const express = require("express");
const app = express();
app.use(express.json());

let etudiants = [];
app.get("/etudiants", (req, res) => {
  res.json(etudiants);
});

app.post("/etudiants", (req, res) => {
  const etudiant = req.body;
  etudiants.push(etudiant);
  res.status(201).json(etudiant);
});

app.put("/etudiants/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const nouveauEtudiant = req.body;

  let etudiant = etudiants.find((i) => i.id === id);
  if (etudiant) {
    etudiant.prenom = nouveauEtudiant.prenom;
    etudiant.nom = nouveauEtudiant.nom;
    etudiant.age = nouveauEtudiant.age;
    res.json(etudiant);
  } else {
    res.status(404).json({ message: "étudiant non trouvé" });
  }
});

app.delete("/etudiants/:id", (req, res) => {
  const id = parseInt(req.params.id);
  etudiants = etudiants.filter((i) => i.id !== id);
  res.status(200).json({ message: "étudiant supprimé avec sucés" });
});

const PORT = 8000;
app.listen(PORT, () =>
  console.log(`l'application a démmarré avec le port ${PORT}`)
);
