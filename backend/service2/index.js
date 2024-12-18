require('dotenv').config();  // Load environment variables from .env
const express = require('express');
const mysql = require('mysql');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3002;

app.use(cors());
app.use(express.json());
//Just adding comment
// MySQL database connection
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

// Connect to the database with error handling
db.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err);
    process.exit(1); // Exit process on connection error
  }
  console.log(`Connected to database at ${process.env.DB_HOST}`);
});

// Get all products
app.get('/products', (req, res) => {
  db.query('SELECT * FROM products', (err, results) => {
    if (err) {
      console.error('Error fetching products:', err);
      return res.status(500).json({ error: 'Database query error' });
    }
    res.json(results);
  });
});

// Add a new product
app.post('/products', (req, res) => {
  const { name, price } = req.body;

  // Simple validation
  if (!name || price == null) {
    return res.status(400).json({ error: 'Name and price are required' });
  }

  db.query('INSERT INTO products (name, price) VALUES (?, ?)', [name, price], (err, results) => {
    if (err) {
      console.error('Error adding product:', err);
      return res.status(500).json({ error: 'Database insertion error' });
    }
    res.status(201).json({ id: results.insertId, name, price });
  });
});

// Handle unknown routes
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// Start the server
app.listen(port, () => {
  console.log(`Service 2 listening at http://localhost:${port}`);
});
