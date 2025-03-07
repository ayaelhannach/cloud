const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const teacherRoutes = require('./routes/teacherRoutes');
const verifyToken = require('../auth-service/middleware/verifyToken');

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/teachers', teacherRoutes);


app.get('/', verifyToken, (req, res) => {
    res.send('Serveur Teacher Service en fonctionnement');
});


mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("MongoDB connecté"))
    .catch(err => console.log("Erreur de connexion MongoDB: ", err));

const PORT = process.env.PORT || 5003;
app.listen(PORT, () => {
    console.log(`Serveur Teacher Service démarré sur le port ${PORT}`);
});
