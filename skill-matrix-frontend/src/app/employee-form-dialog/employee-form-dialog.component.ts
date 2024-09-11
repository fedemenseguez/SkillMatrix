import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EmployeeService } from '../services/employee.service';
import { DepartmentService } from '../services/department.service';
import { Employee } from '../models/employee.model';
import { Department } from '../models/department.model';

@Component({
  selector: 'app-employee-form-dialog',
  templateUrl: './employee-form-dialog.component.html',
  styleUrls: ['./employee-form-dialog.component.css']
})
export class EmployeeFormDialogComponent implements OnInit {
  employee: Employee;
  departments: Department[] = [];
  employees: Employee[] = [];
  isEditMode: boolean = false;

  constructor(
    public dialogRef: MatDialogRef<EmployeeFormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private employeeService: EmployeeService,
    private departmentService: DepartmentService
  ) {
    // Inicializar el empleado con datos existentes si estamos en modo de edición
    this.employee = data.employee || { firstName: '', lastName: '', email: '' };
    this.isEditMode = !!this.employee._id;
  }

  ngOnInit(): void {
    this.loadDepartments();
    this.loadEmployees();
  }

  loadDepartments(): void {
    this.departmentService.getDepartments().subscribe((departments) => {
      this.departments = departments;
    });
  }

  loadEmployees(): void {
    this.employeeService.getEmployees().subscribe((employees) => {
      this.employees = employees;
    });
  }

  onSave(): void {
    if (this.isEditMode) {
      this.employeeService.updateEmployee(this.employee._id!, this.employee).subscribe(() => {
        this.dialogRef.close(true);
      });
    } else {
      this.employeeService.createEmployee(this.employee).subscribe(() => {
        this.dialogRef.close(true);
      });
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
