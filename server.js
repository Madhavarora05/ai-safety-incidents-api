const express = require('express');
const bodyParser = require('body-parser');
const { connectDatabase } = require('./config/database');
const incidentRoutes = require('./routes/incidents');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

connectDatabase();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/incidents', incidentRoutes);

app.get('/', (req, res) => {
  res.json({ message: 'Welcome to AI Safety Incident Log API' });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    message: 'Something went wrong!',
    error: process.env.NODE_ENV === 'development' ? err.message : 'Internal server error'
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});