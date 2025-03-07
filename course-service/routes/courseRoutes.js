const express = require('express');
const Course = require('../models/Course');
const verifyToken = require('../middleware/verifyToken');
const router = express.Router();

router.get('/all', verifyToken, async (req, res) => {
    const courses = await Course.find();
    res.json(courses);
});

router.post('/add', verifyToken, async (req, res) => {
    const newCourse = new Course(req.body);
    await newCourse.save();
    res.status(201).json(newCourse);
});

router.put('/update/:id', verifyToken, async (req, res) => {
    const updatedCourse = await Course.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedCourse);
});

router.delete('/delete/:id', verifyToken, async (req, res) => {
    await Course.findByIdAndDelete(req.params.id);
    res.json({ message: 'Cours supprimé' });
});

router.get('/search', verifyToken, async (req, res) => {
    const { query } = req.query;
    const courses = await Course.find({ titre: new RegExp(query, 'i') });
    res.json(courses);
});

module.exports = router;
