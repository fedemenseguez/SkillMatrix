import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Skill } from '../models/skill.model';
import { SkillService } from '../services/skill.service';
import { CategoryService } from '../services/category.service';
import { Category } from '../models/category.model';

@Component({
  selector: 'app-skill-form-dialog',
  templateUrl: './skill-form-dialog.component.html',
  styleUrls: ['./skill-form-dialog.component.css']
})
export class SkillFormDialogComponent implements OnInit {
  skill: Skill;
  categories: Category[] = [];
  isEditMode: boolean = false;

  constructor(
    public dialogRef: MatDialogRef<SkillFormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private skillService: SkillService,
    private categoryService: CategoryService
  ) {
    this.skill = data.skill || { skillName: '', categoryId: '' };
    this.isEditMode = !!this.skill._id;
  }

  ngOnInit(): void {
    this.loadCategories();  // Cargar las categorías disponibles
  }

  loadCategories(): void {
    this.categoryService.getCategories().subscribe((categories) => {
      this.categories = categories;
    });
  }

  onSave(): void {
    if (this.skill.skillName && this.skill.categoryId) {  // Validar que el nombre y la categoría estén presentes
      if (this.isEditMode) {
        this.skillService.updateSkill(this.skill._id!, this.skill).subscribe(() => {
          this.dialogRef.close(true);
        });
      } else {
        this.skillService.createSkill(this.skill).subscribe(() => {
          this.dialogRef.close(true);
        });
      }
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
