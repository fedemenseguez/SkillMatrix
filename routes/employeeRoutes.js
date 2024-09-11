const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const Employee = require('../models/employee');
const GetGPTReponse = require('../config/openai');


// Set up storage engine for Multer
const storage = multer.diskStorage({
  destination: './uploads/',
  filename: (req, file, cb) => {
    cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`);
  }
});

// Initialize upload
const upload = multer({ storage });

// @route   POST /employees
// @desc    Create a new employee
router.post('/', async (req, res) => {
  const { firstName, lastName, email, lastJobPosition} = req.body;

  try {
    const newEmployee = new Employee(req.body);
    await newEmployee.save();
    res.status(201).json(newEmployee);
  } catch (error) {
    res.status(500).json({ error: 'Error creating employee' });
  }
});

// @route   GET /employees
// @desc    Get all employees
router.get('/', async (req, res) => {
  try {
    const employees = await Employee.find();
    res.json(employees);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching employees' });
  }
});

// @route   GET /employees/:id
// @desc    Get an employee by ID
router.get('/:id', async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.id);
    if (!employee) {
      return res.status(404).json({ error: 'Employee not found' });
    }
    res.json(employee);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching employee' });
  }
});

// @route   PUT /employees/:id
// @desc    Update an employee by ID
router.put('/:id', async (req, res) => {
  try {
    const updatedEmployee = await Employee.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedEmployee) {
      return res.status(404).json({ error: 'Employee not found' });
    }
    res.json(updatedEmployee);
  } catch (error) {
    res.status(500).json({ error: 'Error updating employee' });
  }
});

// @route   DELETE /employees/:id
// @desc    Delete an employee by ID
router.delete('/:id', async (req, res) => {
  try {
    const deletedEmployee = await Employee.findByIdAndDelete(req.params.id);
    if (!deletedEmployee) {
      return res.status(404).json({ error: 'Employee not found' });
    }
    res.json({ message: 'Employee deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Error deleting employee' });
  }
});


// @route   POST /employees/:id/jobExpertise
// @desc    Add new job expertise entry for an employee
router.post('/:id/jobExpertise', async (req, res) => {
  const { company, startDate, endDate, technicalSkills, description } = req.body;

  try {
    const employee = await Employee.findById(req.params.id);
    if (!employee) {
      return res.status(404).json({ error: 'Employee not found' });
    }

    const newJobExpertise = {
      company,
      startDate,
      endDate,
      technicalSkills,
      description,
    };

    employee.jobExpertise.push(newJobExpertise);
    await employee.save();

    res.json({ message: 'Job expertise added', jobExpertise: newJobExpertise });
  } catch (error) {
    res.status(500).json({ error: 'Error adding job expertise' });
  }
});

// @route   PUT /employees/:id/jobExpertise/:expertiseId
// @desc    Update an existing job expertise entry for an employee
router.put('/:id/jobExpertise/:expertiseId', async (req, res) => {
  const { company, startDate, endDate, technicalSkills, description } = req.body;

  try {
    const employee = await Employee.findById(req.params.id);
    if (!employee) {
      return res.status(404).json({ error: 'Employee not found' });
    }

    const expertise = employee.jobExpertise.id(req.params.expertiseId);
    if (!expertise) {
      return res.status(404).json({ error: 'Job expertise entry not found' });
    }

    // Update the expertise entry
    expertise.company = company;
    expertise.startDate = startDate;
    expertise.endDate = endDate;
    expertise.technicalSkills = technicalSkills;
    expertise.description = description;

    await employee.save();

    res.json({ message: 'Job expertise updated', jobExpertise: expertise });
  } catch (error) {
    res.status(500).json({ error: 'Error updating job expertise' });
  }
});

// @route   DELETE /employees/:id/jobExpertise/:expertiseId
// @desc    Delete an existing job expertise entry for an employee
router.delete('/:id/jobExpertise/:expertiseId', async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.id);
    if (!employee) {
      return res.status(404).json({ error: 'Employee not found' });
    }

    const expertise = employee.jobExpertise.id(req.params.expertiseId);
    if (!expertise) {
      return res.status(404).json({ error: 'Job expertise entry not found' });
    }

    // Remove the expertise entry
    expertise.remove();
    await employee.save();

    res.json({ message: 'Job expertise entry deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Error deleting job expertise' });
  }
});



// @route   POST /employees/:id/uploadResume
// @desc    Upload a resume for parsing
router.post('/:id/uploadResume', upload.single('resume'), async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.id);
    if (!employee) {
      return res.status(404).json({ error: 'Employee not found' });
    }

    // Simulate reading the resume (In real-world use, extract text from the uploaded file)
    const resumeText = `This is the content of the resume for ${employee.firstName} ${employee.lastName}.`;

    // Use ChatGPT to extract skills from the resume text
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo-instruct",//"gpt-4o-mini",
      messages: [{ role: "user", content: `Extract key skills from the following resume:\n\n${resumeText}\n\nSkills:` }],
      max_tokens: 1500,
    });

    const extractedSkills = response.data.choices[0].text.trim().split(',').map(skill => ({ skillName: skill.trim(), proficiencyLevel: 'Intermediate' }));

    // Update the employee's skills with the extracted skills
    employee.skills = extractedSkills;
    await employee.save();

    res.json({ message: 'Resume uploaded, parsed, and skills extracted', skills: extractedSkills });
  } catch (error) {
    res.status(500).json({ error: 'Error uploading resume' });
  }
});

// @route   POST /employees/:id/assessments
// @desc    Request an assessment for a specific technology
router.post('/:id/assessments', async (req, res) => {
  const { technology } = req.body;

  try {
    const employee = await Employee.findById(req.params.id);
    if (!employee) {
      return res.status(404).json({ error: 'Employee not found' });
    }

    // Mock assessment questions (This should be replaced with real assessment logic)
    const mockQuestions = [
      { question: 'What is a closure in JavaScript?', correctAnswer: 'A function with access to its lexical scope.' },
      { question: 'How do you connect to a MongoDB database in Node.js?', correctAnswer: 'Using the MongoDB driver or Mongoose.' }
    ];

    // Mock assessment process (For now, we'll assume the employee got a score of 80)
    const mockScore = 80;

    // Store the assessment result
    const newAssessment = {
      technology,
      score: mockScore,
      dateTaken: new Date()
    };

    employee.assessments.push(newAssessment);
    await employee.save();

    res.json({ message: 'Assessment completed', assessment: newAssessment });
  } catch (error) {
    res.status(500).json({ error: 'Error processing assessment' });
  }
});

// @route   POST /employees/:id/generateResume
// @desc    Generate a resume for a specific job description
router.post('/:id/generateResume', async (req, res) => {
  const { jobDescription } = req.body;

  try {
    const employee = await Employee.findById(req.params.id);
    if (!employee) {
      return res.status(404).json({ error: 'Employee not found' });
    }

    // Use ChatGPT to generate a resume focused on the job description
    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: `Generate a resume for an employee named ${employee.firstName} ${employee.lastName}. The resume should focus on the following job description:\n\n${jobDescription}\n\nResume:`,
      max_tokens: 300,
    });

    const generatedResumeContent = response.data.choices[0].text.trim();

    // Store the generated resume
    const newGeneratedResume = {
      generatedForJobDescription: jobDescription,
      content: generatedResumeContent,
      dateGenerated: new Date()
    };

    employee.generatedResumes.push(newGeneratedResume);
    await employee.save();

    res.json({ message: 'Resume generated', resume: newGeneratedResume });
  } catch (error) {
    res.status(500).json({ error: 'Error generating resume' });
  }
});

// @route   POST /employees/:id/assessments/questions
// @desc    Generate assessment questions for a specific technology
router.post('/:id/assessments/questions', async (req, res) => {
  const { technology } = req.body;

  try {
    const employee = await Employee.findById(req.params.id);
    if (!employee) {
      return res.status(404).json({ error: 'Employee not found' });
    }

    // Use ChatGPT to generate assessment questions
    const questionResponse = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: `Generate three interview questions to evaluate knowledge in ${technology}.`,
      max_tokens: 150,
    });

    const questions = questionResponse.data.choices[0].text.trim().split('\n').filter(q => q);

    res.json({ message: 'Questions generated', questions });
  } catch (error) {
    res.status(500).json({ error: 'Error generating questions' });
  }
});

// @route   POST /employees/:id/assessments/evaluate
// @desc    Evaluate answers and return a score with recommendations
router.post('/:id/assessments/evaluate', async (req, res) => {
  const { technology, questions, employeeAnswers } = req.body;

  try {
    const employee = await Employee.findById(req.params.id);
    if (!employee) {
      return res.status(404).json({ error: 'Employee not found' });
    }

    // Step 1: Evaluate each answer using ChatGPT
    let totalScore = 0;
    for (let i = 0; i < questions.length; i++) {
      const evaluationResponse = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: `Evaluate the following answer for the question: "${questions[i]}".\nAnswer: "${employeeAnswers[i]}".\nScore the answer from 0 to 100.`,
        max_tokens: 50,
      });

      const score = parseInt(evaluationResponse.data.choices[0].text.trim());
      totalScore += score;
    }

    // Calculate the average score
    const averageScore = totalScore / questions.length;

    // Step 2: Provide recommendations for improvement based on score
    let recommendations = [];
    if (averageScore < 70) {
      // Mock recommendation for Udemy courses (This can be enhanced by integrating with Udemy API)
      recommendations = [
        `Improve your ${technology} skills with these Udemy courses:`,
        `- ${technology} for Beginners: A Comprehensive Guide`,
        `- Advanced ${technology}: Mastery and Best Practices`
      ];
    }

    // Store the assessment result
    const newAssessment = {
      technology,
      score: averageScore,
      dateTaken: new Date(),
    };

    employee.assessments.push(newAssessment);
    await employee.save();

    res.json({ message: 'Assessment completed', assessment: newAssessment, recommendations });
  } catch (error) {
    res.status(500).json({ error: 'Error evaluating answers' });
  }
});

// Ruta para subir el CV
router.post('/:id/upload-cv', upload.single('file'), async (req, res) => {
  try {
    const employeeId = req.params.id;
    const file = req.file;

    if (!file) {
      return res.status(400).send('No file uploaded.');
    }

    const cvContent = fs.readFileSync(file.path, 'utf-8');

    const gptResponse = await GetGPTReponse("user", `Extract the job experiences and skills from this resume`)
    // const gptResponse = await openai.chat.completions.create({
    //   model: "gpt-4o-mini",
    //   messages: [{ role: "user", content: `Extract the job experiences and skills from this resume:\n\n${cvContent}` }],
    // });

    const parsedData = JSON.parse(gptResponse.data.choices[0].text.trim());

    const employeeSkillEntries = await Promise.all(parsedData.skills.map(async (skillData) => {
      let skill = await Skill.findOne({ name: skillData.name });

      if (!skill) {
        skill = new Skill({ name: skillData.name, description: skillData.description || '' });
        await skill.save();
      }

      try {
        const employeeSkill = new EmployeeSkill({
          employeeId,
          skillId: skill._id,
          experienceLevel: skillData.experienceLevel
        });

        await employeeSkill.save();
        return employeeSkill;
      } catch (error) {
        if (error.code === 11000) {  // Código de error para clave duplicada en MongoDB
          console.log(`Duplicate skill entry for employeeId: ${employeeId}, skillId: ${skill._id}`);
          return null;  // Opcional: Maneja el error como mejor convenga a tu aplicación
        }
        throw error;  // Lanza otros errores no relacionados con duplicados
      }
    }));

    const employee = await Employee.findById(employeeId);
    employee.jobExpertise = parsedData.jobExperiences;

    await employee.save();
    fs.unlinkSync(file.path);

    res.status(200).json({ message: 'CV processed successfully', employeeSkillEntries });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to process CV' });
  }
});



module.exports = router;
