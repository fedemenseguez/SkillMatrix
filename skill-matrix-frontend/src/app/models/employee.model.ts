import { Department } from "./department.model";
import { Skill } from "./skill.model";

  export interface EmployeeSkill {
    skillId: string;  // ID de la habilidad (relación con el modelo Skill)
    skill:Skill
    experienceLevel: number;  // Nivel de experiencia en la habilidad
  }
  
  export interface Assessment {
    technology: string;
    score: number;
    dateTaken: Date;
  }
  
  export interface GeneratedResume {
    generatedForJobDescription: string;
    content: string;
    dateGenerated: Date;
  }
  
  export interface JobExpertise {
    company: string;
    startDate: Date;
    endDate?: Date;  // Puede ser opcional si es un trabajo actual
    technicalSkills: string[];  // Lista de habilidades técnicas relevantes
    description: string;
  }
  
  export interface Employee {
    _id?: string;  // Opcional, ya que puede no estar definido al crear un nuevo empleado
    firstName: string;
    lastName: string;
    email: string;
    resume?: string;  // URL del currículum subido
    skillsEmployee: EmployeeSkill[];  // Lista de habilidades del empleado
    assessments: Assessment[];  // Lista de evaluaciones realizadas por el empleado
    generatedResumes: GeneratedResume[];  // Currículums generados por el empleado
    jobExpertise: JobExpertise[];  // Historial de experiencia laboral
  
    isActive: boolean;  // Estado del empleado (activo/inactivo)
    lastJobPosition?: string;  // Último puesto de trabajo
    startDate?: Date;  // Fecha de inicio del empleado
    endDate?: Date;  // Fecha de finalización del empleado (opcional si está activo)
    lastFeedback?: string;  // Último feedback recibido
    departmentId?: string ;  // Referencia al ID del Departamento
    department?: Department
    employeeLeadId?: string;  // ID del empleado líder
  }
  