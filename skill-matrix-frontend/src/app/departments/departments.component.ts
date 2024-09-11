import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DepartmentService } from '../services/department.service';
import { Department } from '../models/department.model';
import { MatDialog } from '@angular/material/dialog';
import { DepartmentFormDialogComponent } from '../department-form-dialog/department-form-dialog.component';

@Component({
  selector: 'app-departments',
  templateUrl: './departments.component.html',
  styleUrls: ['./departments.component.css']
})
export class DepartmentsComponent implements OnInit {
  displayedColumns: string[] = ['number', 'name', 'description', 'actions'];
  dataSource!: MatTableDataSource<Department>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private departmentService: DepartmentService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.getDepartments();
  }

  getDepartments(): void {
    this.departmentService.getDepartments().subscribe((departments) => {
      this.dataSource = new MatTableDataSource(departments);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  openNewDepartmentDialog(): void {
    const dialogRef = this.dialog.open(DepartmentFormDialogComponent, {
      width: '400px',
      data: { department: {} }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.getDepartments();
      }
    });
  }

  editDepartment(department: Department): void {
    const dialogRef = this.dialog.open(DepartmentFormDialogComponent, {
      width: '400px',
      data: { department }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.getDepartments();
      }
    });
  }

  deleteDepartment(id: string): void {
    this.departmentService.deleteDepartment(id).subscribe(() => {
      this.dataSource.data = this.dataSource.data.filter(department => department._id !== id);
    });
  }
}
