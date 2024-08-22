const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: process.env.DB_HOST,         // Database host
  user: process.env.DB_USER,         // Database user
  password: process.env.DB_PASSWORD, // Database password
  database: process.env.DB_NAME      // Database name
});

db.connect((err) => {
  if (err) throw err;
  console.log(`Connected to database at ${process.env.DB_HOST}`);
});

app.get('/users', (req, res) => {
  db.query('SELECT * FROM users', (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

app.post('/users', (req, res) => {
  const { name, email } = req.body;
  db.query('INSERT INTO users (name, email) VALUES (?, ?)', [name, email], (err, results) => {
    if (err) throw err;
    res.status(201).json({ id: results.insertId, name, email });
  });
});

app.listen(port, () => {
  console.log(`Service 1 listening at http://localhost:${port}`);
});
