const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs');

const app = express();
const PORT = 7700;

app.use(cors());
app.use(bodyParser.json());

// Rota para salvar personagem
app.post('/salvar', (req, res) => {
  const personagem = req.body;
  fs.writeFileSync(`./saves/${personagem.id || 'default'}.json`, JSON.stringify(personagem));
  res.json({ message: "Personagem salvo com sucesso!" });
});

// Rota para carregar personagem
app.get('/carregar/:id', (req, res) => {
  const id = req.params.id || 'default';
  const path = `./saves/${id}.json`;
  if (fs.existsSync(path)) {
    const dados = fs.readFileSync(path);
    res.json(JSON.parse(dados));
  } else {
    res.status(404).json({ message: "Personagem não encontrado." });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
