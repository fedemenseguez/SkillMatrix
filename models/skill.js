const mongoose = require('mongoose');

const SkillSchema = new mongoose.Schema({
    skillName: { type: String, required: true, unique: true},
    categoryId: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' }, // Reference to Category model
  });


const Skill = mongoose.model('Skill', SkillSchema);

module.exports = Skill;