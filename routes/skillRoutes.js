const express = require('express');
const router = express.Router();
const Skill = require('../models/skill');
const Category = require('../models/category');

// Crear una nueva habilidad
router.post('/', async (req, res) => {
  try {
    const newSkill = new Skill(req.body);
    console.log(newSkill);
    await newSkill.save();
    res.status(201).json(newSkill);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Obtener todas las habilidades
router.get('/', async (req, res) => {
  try {
    const skills = await Skill.find().populate('categoryId');
    res.status(200).json(skills);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// @route   GET /skills/:id
// @desc    Get a skill by ID
router.get('/:id', async (req, res) => {
  try {
    const skill = await Skill.findById(req.params.id).populate('categoryId', 'name');
    if (!skill) {
      return res.status(404).json({ error: 'Skill not found' });
    }
    res.json(skill);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching skill' });
  }
});

// @route   PUT /skills/:id
// @desc    Update a skill by ID
router.put('/:id', async (req, res) => {
  const { skillName, proficiencyLevel, categoryId } = req.body;

  try {
    const skill = await Skill.findById(req.params.id);
    if (!skill) {
      return res.status(404).json({ error: 'Skill not found' });
    }

    // Validate that the categoryId exists if it's being updated
    if (categoryId) {
      const category = await Category.findById(categoryId);
      if (!category) {
        return res.status(400).json({ error: 'Category not found' });
      }
    }

    // Update skill details
    skill.skillName = skillName || skill.skillName;
    skill.categoryId = categoryId || skill.categoryId;

    await skill.save();
    res.json(skill);
  } catch (error) {
    res.status(500).json({ error: 'Error updating skill' });
  }
});

// @route   DELETE /skills/:id
// @desc    Delete a skill by ID
router.delete('/:id', async (req, res) => {
  try {
    const skill = await Skill.findByIdAndDelete(req.params.id);
    if (!skill) {
      return res.status(404).json({ error: 'Skill not found' });
    }
    res.json({ message: 'Skill deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Error deleting skill' });
  }
});

module.exports = router;
