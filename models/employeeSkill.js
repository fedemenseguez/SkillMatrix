const mongoose = require('mongoose');

const EmployeeSkillSchema = new mongoose.Schema({
  employeeId: { type: mongoose.Schema.Types.ObjectId, ref: 'Employee', required: true },
  skillId: { type: mongoose.Schema.Types.ObjectId, ref: 'Skill', required: true },
  experienceLevel: { type: Number, required: true }  // Nivel de experiencia del empleado en la habilidad
});

// Crear índice compuesto único para employeeId y skillId
EmployeeSkillSchema.index({ employeeId: 1, skillId: 1 }, { unique: true });

const EmployeeSkill = mongoose.model('EmployeeSkill', EmployeeSkillSchema);

module.exports = EmployeeSkill;