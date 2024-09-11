const express = require('express');
const router = express.Router();
const EmployeeSkill = require('../models/employeeSkill');

// Crear una relación entre empleado y habilidad
router.post('/', async (req, res) => {
  try {
    const employeeSkill = new EmployeeSkill(req.body);
    await employeeSkill.save();
    res.status(201).json(employeeSkill);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Obtener todas las habilidades de un empleado
router.get('/:employeeId', async (req, res) => {
  try {
    const employeeSkills = await EmployeeSkill.find({ employeeId: req.params.employeeId })
      .populate('skillId');
    res.status(200).json(employeeSkills);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
