const express = require('express');
const Student = require('../models/Student');
const verifyToken = require('../middleware/verifyToken');
const router = express.Router();

router.get('/all', verifyToken, async (req, res) => {
    const students = await Student.find();
    res.json(students);
});

router.post('/add', verifyToken, async (req, res) => {
    const newStudent = new Student(req.body);
    await newStudent.save();
    res.status(201).json(newStudent);
});

router.post('/enroll/:etudiant_id/:cours_id', verifyToken, async (req, res) => {
    const student = await Student.findById(req.params.etudiant_id);
    if (!student) return res.status(404).json({ error: 'Étudiant non trouvé' });

    student.cours.push(req.params.cours_id);
    await student.save();
    res.json(student);
});

router.get('/enrolledCourses/:etudiant_id', verifyToken, async (req, res) => {
    const student = await Student.findById(req.params.etudiant_id);
    if (!student) return res.status(404).json({ error: 'Étudiant non trouvé' });

    res.json(student.cours);
});

module.exports = router;
