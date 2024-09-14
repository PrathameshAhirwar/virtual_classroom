const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3002;

// MySQL database connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Ahirwar@2000',
  database: 'virtual_classroom',  // Replace with your database name
});

db.connect((err) => {
  if (err) {
    console.error('Database connection failed:', err);
  } else {
    console.log('Connected to MySQL');
  }
});

app.use(cors());
app.use(bodyParser.json());

// Sample route for student signup
app.post('/students/signup', (req, res) => {
  const { name, email, password } = req.body;
  const query = 'INSERT INTO students (name, email, password) VALUES (?, ?, ?)';
  
  db.query(query, [name, email, password], (err, result) => {
    if (err) {
      return res.status(500).json({ message: 'Failed to sign up' });
    }
    res.status(201).json({ message: 'Signup successful' });
  });
});

// More routes can be added here

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
