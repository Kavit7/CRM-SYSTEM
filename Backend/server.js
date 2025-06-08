const express = require('express');
const multer = require('multer');
const mysql = require('mysql');
const path = require('path');
const app = express();
const port = 4000;
const cors = require('cors');
app.use(cors());

app.use(express.json());
app.use('/uploads', express.static('uploads'));

// MySQL Connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'crm'
});

db.connect(err => {
  if (err) throw err;
  console.log('MySQL connected');
});

// Create products table if it doesn't exist
db.query(`
  CREATE TABLE IF NOT EXISTS products (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    amount DECIMAL(10, 2),
    status ENUM('Sold', 'Not sold') DEFAULT 'Not sold',
    image_path VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  )
`, (err) => {
  if (err) console.error('Error creating table:', err);
  else console.log('Products table ready');
});

// Multer Setup - store in uploads/ folder
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname))
});
const upload = multer({ storage: storage });

// Route to handle image + form data
app.post('/upload', upload.single('image'), (req, res) => {
  const { title, description, amount, status } = req.body;
  const imagePath = req.file ? req.file.path : null;

  if (!imagePath) return res.status(400).send('Image upload failed');

  const sql = 'INSERT INTO products (title, description, amount, status, image_path) VALUES (?, ?, ?, ?, ?)';
  db.query(sql, [title, description, amount, status, imagePath], (err, result) => {
    if (err) return res.status(500).send({error:'Database error'});
    res.send({ message: 'Data saved successfully'});
  });
});

// Route to get all products
app.get('/products', (req, res) => {
  db.query('SELECT * FROM products ORDER BY id DESC', (err, results) => {
    if (err) {
      console.error('Database error:', err);
      return res.status(500).json({ error: 'Failed to fetch products' });
    }
    res.json(results);
  });
});

// Route to update product status (mark as sold)
app.put('/products/:id', (req, res) => {
  const { status } = req.body;
  const sql = 'UPDATE products SET status = ? WHERE id = ?';
  const values = [status, req.params.id];

  db.query(sql, values, (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'Status updated successfully' });
  });
});

// Route to update product details (edit functionality)
app.put('/products/edit/:id', (req, res) => {
  const { title, description, amount, status } = req.body;
  const sql = 'UPDATE products SET title = ?, description = ?, amount = ?, status = ? WHERE id = ?';
  const values = [title, description, amount, status, req.params.id];

  db.query(sql, values, (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'Product updated successfully' });
  });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});