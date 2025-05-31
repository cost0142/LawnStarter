process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

const express = require('express');
const mysql = require('mysql2');
const fetch = require('node-fetch'); // certifique-se que está instalado
const bodyParser = require('body-parser');
const cors = require('cors'); 
const app = express();
const PORT = 3001;


app.use(bodyParser.json());
app.use(cors());

// Conexão com o banco
const db = mysql.createConnection({
  host: 'mysql',
  user: 'root',
  password: 'vicecity',
  database: 'swstarterdb',
});

db.connect(err => {
  if (err) {
    console.error('Erro ao conectar no MySQL:', err);
    return;
  }
  console.log('✅ Conectado ao MySQL!');
});

// 🔹 ROTA DE TESTE (recrie-a se não estiver lá)
app.get('/api/people', async (req, res) => {
  const search = req.query.search;
  if (!search) {
    return res.status(400).json({ error: 'Missing search query' });
  }

  try {
    const fetch = (await import('node-fetch')).default;
    const response = await fetch(`https://swapi.dev/api/people/?search=${search}`);
    const data = await response.json();
    res.json(data);
  } catch (err) {
    console.error('Erro ao buscar na SWAPI:', err);
    res.status(500).json({ error: 'Erro ao buscar na SWAPI' });
  }
});

app.get('/api/people/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const fetch = (await import('node-fetch')).default;
    const response = await fetch(`https://swapi.dev/api/people/${id}/`);
    const data = await response.json();
    res.json(data);
  } catch (err) {
    console.error('Erro ao buscar detalhes da pessoa:', err);
    res.status(500).json({ error: 'Erro ao buscar detalhes da pessoa' });
  }
});



// 🔹 ROTA DE MÉTRICA
app.post('/api/metrics', (req, res) => {
  const { metric_type, metric_data } = req.body;
  db.query(
    'INSERT INTO metrics (metric_type, metric_data) VALUES (?, ?)',
    [metric_type, metric_data],
    (err) => {
      if (err) {
        console.error('Erro ao salvar métrica:', err);
        return res.status(500).json({ message: 'Erro interno' });
      }
      res.status(200).json({ message: 'Métrica salva com sucesso' });
    }
  );
});

app.listen(PORT, () => {
  console.log(`🚀 Servidor backend rodando em http://localhost:${PORT}`);
});
