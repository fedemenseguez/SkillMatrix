const mongoose = require('mongoose');

const CategorySchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String },
    parentCategoryId: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' }, // Reference to the parent category
  });
  
  const Category = mongoose.model('Category', CategorySchema);
  
  module.exports = Category;
  