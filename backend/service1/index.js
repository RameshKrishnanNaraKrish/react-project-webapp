const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: 'mydb-instance.c0fjqfmmz8l4.us-west-2.rds.amazonaws.com',
  user: 'admin',
  password: 'password',
  database: 'mydb'
});

db.connect((err) => {
  if (err) throw err;
  console.log('Connected to database');
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
