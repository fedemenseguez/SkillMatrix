import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DepartmentService } from '../services/department.service';
import { Department } from '../models/department.model';

@Component({
  selector: 'app-department-form-dialog',
  templateUrl: './department-form-dialog.component.html',
  styleUrls: ['./department-form-dialog.component.css']
})
export class DepartmentFormDialogComponent {
  department: Department;
  isEditMode: boolean = false;

  constructor(
    public dialogRef: MatDialogRef<DepartmentFormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private departmentService: DepartmentService
  ) {
    this.department = data.department || { name: '', description: '' };
    this.isEditMode = !!this.department._id;
  }

  onSave(): void {
    if (this.department.name) {
      if (this.isEditMode) {
        this.departmentService.updateDepartment(this.department._id!, this.department).subscribe(() => {
          this.dialogRef.close(true);
        });
      } else {
        this.departmentService.createDepartment(this.department).subscribe(() => {
          this.dialogRef.close(true);
        });
      }
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
