require('dotenv').config();
const express = require('express');
const cors = require('cors');
const sosRoutes = require('./routes/sosRoutes');


const app = express();

// Allow only your frontend origin and enable credentials
app.use(cors({
  origin: ['http://localhost:5500', 'http://127.0.0.1:5500'], // Allow both origins
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());

app.use('/api/sos', sosRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});