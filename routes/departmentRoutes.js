const express = require('express');
const router = express.Router();
const Department = require('../models/department');

// @route   POST /departments
// @desc    Create a new department
router.post('/', async (req, res) => {
  const { name, description } = req.body;
  try {
    const department = new Department({ name, description });
    await department.save();
    res.status(201).json(department);
  } catch (error) {
    res.status(500).json({ error: 'Error creating department' });
  }
});

// @route   GET /departments
// @desc    Get all departments
router.get('/', async (req, res) => {
  try {
    const departments = await Department.find();
    res.json(departments);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching departments' });
  }
});

// @route   GET /departments/:id
// @desc    Get a department by ID
router.get('/:id', async (req, res) => {
  try {
    const department = await Department.findById(req.params.id);
    if (!department) {
      return res.status(404).json({ error: 'Department not found' });
    }
    res.json(department);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching department' });
  }
});

// @route   PUT /departments/:id
// @desc    Update a department by ID
router.put('/:id', async (req, res) => {
  const { name, description } = req.body;
  try {
    const department = await Department.findByIdAndUpdate(req.params.id, { name, description }, { new: true });
    if (!department) {
      return res.status(404).json({ error: 'Department not found' });
    }
    res.json(department);
  } catch (error) {
    res.status(500).json({ error: 'Error updating department' });
  }
});

// @route   DELETE /departments/:id
// @desc    Delete a department by ID
router.delete('/:id', async (req, res) => {
  try {
    const department = await Department.findByIdAndDelete(req.params.id);
    if (!department) {
      return res.status(404).json({ error: 'Department not found' });
    }
    res.json({ message: 'Department deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Error deleting department' });
  }
});

module.exports = router;
