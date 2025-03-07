const mongoose = require('mongoose');

const StudentSchema = new mongoose.Schema({
    id: String,
    nom: String,
    email: { type: String, unique: true },
    cours: [String]  // Liste des IDs de cours
});

module.exports = mongoose.model('Student', StudentSchema);
