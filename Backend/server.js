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
    res.send({ message: 'Data saved successfully', id: result.insertId });
  });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
