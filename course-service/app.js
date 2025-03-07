const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const courseRoutes = require('./routes/courseRoutes');
const verifyToken = require('../auth-service/middleware/verifyToken');

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());


app.use('/courses', courseRoutes);


app.get('/', verifyToken, (req, res) => {
    res.send('Serveur Course Service en fonctionnement');
});


mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("MongoDB connecté"))
    .catch(err => console.log("Erreur de connexion MongoDB: ", err));

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
    console.log(`Serveur Course Service démarré sur le port ${PORT}`);
});
