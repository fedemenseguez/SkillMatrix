import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { EmployeeService } from '../services/employee.service';
import { Employee } from '../models/employee.model';
import { MatDialog } from '@angular/material/dialog';
import { EmployeeFormDialogComponent } from '../employee-form-dialog/employee-form-dialog.component';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css']
})
export class EmployeesComponent implements OnInit {
  displayedColumns: string[] = ['firstName', 'lastName', 'email', 'department', 'actions'];
  dataSource!: MatTableDataSource<Employee>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private employeeService: EmployeeService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.getEmployees();
  }

  getEmployees(): void {
    this.employeeService.getEmployees().subscribe((employees) => {
      this.dataSource = new MatTableDataSource(employees);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  openNewEmployeeDialog(): void {
    const dialogRef = this.dialog.open(EmployeeFormDialogComponent, {
      width: '400px',
      data: { employee: {} }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.getEmployees(); // Refresca la lista de empleados después de crear uno nuevo
      }
    });
  }

  editEmployee(employee: Employee): void {
    if (employee.departmentId && typeof employee.departmentId === 'object') {
      employee.department = employee.departmentId;
    }
    const dialogRef = this.dialog.open(EmployeeFormDialogComponent, {
      width: '400px',
      data: { employee }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.getEmployees(); // Refresca la lista de empleados después de editar uno
      }
    });
  }

  deleteEmployee(id: string): void {
    this.employeeService.deleteEmployee(id).subscribe(() => {
      this.dataSource.data = this.dataSource.data.filter(employee => employee._id !== id);
    });
  }
}
