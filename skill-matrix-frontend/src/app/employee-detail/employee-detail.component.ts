import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EmployeeService } from '../services/employee.service';
import { DepartmentService } from '../services/department.service';
import { Employee } from '../models/employee.model';
import { FileManagerService } from '../services/fileManager.service';

@Component({
  selector: 'app-employee-detail',
  templateUrl: './employee-detail.component.html',
  styleUrls: ['./employee-detail.component.css']
})
export class EmployeeDetailComponent implements OnInit {
  employee!: Employee;
  selectedFile: File | null = null;

  constructor(private route: ActivatedRoute, private employeeService: EmployeeService, private departmentService : DepartmentService, private fileManagerService: FileManagerService) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.employeeService.getEmployeeById(id).subscribe((employee: Employee) => {
        this.employee = employee;

        // Si el empleado tiene un departmentId, obtener el departamento de forma asincrónica
        if (this.employee.departmentId) {
          this.loadDepartmentDetails(this.employee.departmentId);
        }
      });
    }
    
  }
  
  loadDepartmentDetails(departmentId: string): void {
    this.departmentService.getDepartmentById(departmentId).subscribe((department) => {
      if (this.employee) {
        this.employee.department = department; // Asigna los detalles del departamento al empleado
      }
    });
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files?.length) {
      this.selectedFile = input.files[0];
    }
  }

  uploadCV(): void {
    if (this.selectedFile && this.employee) {
      this.fileManagerService.uploadCV(this.employee._id!, this.selectedFile).subscribe(response => {
        console.log('CV uploaded and processed:', response);
        // Actualiza la interfaz de usuario si es necesario
      });
    }
  }  
 }