const mongoose = require('mongoose');

const TeacherSchema = new mongoose.Schema({
    id: String,
    name: String,
    bio: String,
    cours: [String]  // Liste des IDs de cours attribués au professeur
});

module.exports = mongoose.model('Teacher', TeacherSchema);
