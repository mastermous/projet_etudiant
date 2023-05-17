const express = require("express");
const app = express();
app.use(express.json());

let etudiantArray = [];
app.get("/etudiant", (req, res) => {
  res.status(200).json(etudiantArray);
});

app.post("/etudiant", (req, res) => {
  etudiantArray.push(req.body);
  res.status(201).json(req.body);
});

app.put("/etudiant/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const nouveauEtudiant = req.body;
  let etudiant = etudiantArray.find((i) => i.id === id);
  if (etudiant) {
    etudiant.prenom = nouveauEtudiant.prenom;
    etudiant.nom = nouveauEtudiant.nom;
    etudiant.age = nouveauEtudiant.age;
    res.status(200).json(etudiant);
  } else {
    res.status(404).json({ message: "non trouvé" });
  }
});

app.delete("/etudiant/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const etudiant = etudiantArray.find((i) => i.id === id);

  if (etudiant) {
    etudiantArray = etudiantArray.filter((i) => i.id !== id);
    res.status(200).json({ message: "étudiant supprimé avec succès" });
  } else {
    res.status(404).json({ message: "non trouvé" });
  }
});

app.listen(8000), () => console.log("Server running on port 8000");
