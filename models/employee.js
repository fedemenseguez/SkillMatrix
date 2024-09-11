const mongoose = require('mongoose');
const EmployeeSkillSchema = require('./employeeSkill');  // Importa el esquema de EmployeeSkill


const AssessmentSchema = new mongoose.Schema({
  technology: { type: String, required: true },
  score: { type: Number, required: true },
  dateTaken: { type: Date, default: Date.now }
});

const GeneratedResumeSchema = new mongoose.Schema({
  generatedForJobDescription: { type: String, required: true },
  content: { type: String, required: true },
  dateGenerated: { type: Date, default: Date.now }
});

const JobExpertiseSchema = new mongoose.Schema({
  company: { type: String, required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date },  // Nullable for current jobs
  technicalSkills: { type: [String], required: true },  // List of relevant skills
  description: { type: String, required: true },
});

// Updated Employee schema
const EmployeeSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  resume: { type: String }, // URL to the uploaded resume file
  skillsEmployee: { type: mongoose.Schema.Types.Array, ref: EmployeeSkillSchema}, // Employee skills
  assessments: [AssessmentSchema],
  generatedResumes: [GeneratedResumeSchema],
  jobExpertise: [JobExpertiseSchema], // Job expertise history

  isActive: { type: Boolean, default: true }, // Active employee status
  lastJobPosition: { type: String }, // Last held job position
  startDate: { type: Date }, // Employee start date
  endDate: { type: Date }, // Employee end date (nullable if currently active)
  lastFeedback: { type: String }, // Last feedback received
  departmentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Department' }, // Reference to Department model
  employeeLeadId: { type: mongoose.Schema.Types.ObjectId, ref: 'Employee' }, // Lead employee ID reference
});

const Employee = mongoose.model('Employee', EmployeeSchema);

module.exports = Employee;
