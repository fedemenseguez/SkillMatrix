const express = require('express');
const router = express.Router();
const Category = require('../models/category');

// Create Category
router.post('/', async (req, res) => {
  const { name, description, parentCategoryId } = req.body;
  try {
    const category = new Category({ name, description, parentCategoryId });
    await category.save();
    res.status(201).json(category);
  } catch (error) {
    res.status(500).json({ error: 'Error creating category' });
  }
});

// Get All Categories
router.get('/', async (req, res) => {
  try {
    const categories = await Category.find();
    res.json(categories);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching categories' });
  }
});

// Get Category by ID
router.get('/:id', async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category) {
      return res.status(404).json({ error: 'Category not found' });
    }
    res.json(category);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching category' });
  }
});

// Update Category
router.put('/:id', async (req, res) => {
  const { name, description } = req.body;
  try {
    const category = await Category.findByIdAndUpdate(req.params.id, { name, description }, { new: true });
    if (!category) {
      return res.status(404).json({ error: 'Category not found' });
    }
    res.json(category);
  } catch (error) {
    res.status(500).json({ error: 'Error updating category' });
  }
});

// Delete Category
router.delete('/:id', async (req, res) => {
  try {
    const category = await Category.findByIdAndDelete(req.params.id);
    if (!category) {
      return res.status(404).json({ error: 'Category not found' });
    }
    res.json({ message: 'Category deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Error deleting category' });
  }
});

module.exports = router;
