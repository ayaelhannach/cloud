const express = require('express');
const Teacher = require('../models/Teacher');
const verifyToken = require('../middleware/verifyToken');
const router = express.Router();

router.get('/all', verifyToken, async (req, res) => {
    const teachers = await Teacher.find();
    res.json(teachers);
});

router.post('/add', verifyToken, async (req, res) => {
    const newTeacher = new Teacher(req.body);
    await newTeacher.save();
    res.status(201).json(newTeacher);
});


router.post('/assign/:professeur_id/:cours_id', verifyToken, async (req, res) => {
    const teacher = await Teacher.findById(req.params.professeur_id);
    if (!teacher) return res.status(404).json({ error: 'Professeur non trouvé' });

    teacher.cours.push(req.params.cours_id);
    await teacher.save();
    res.json(teacher);
});

router.get('/enrolledStudents/:cours_id', verifyToken, async (req, res) => {
    const students = await Teacher.find({ cours: req.params.cours_id }).populate('cours');
    res.json(students);
});

module.exports = router;
