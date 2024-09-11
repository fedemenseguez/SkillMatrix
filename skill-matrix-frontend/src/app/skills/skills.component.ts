import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { SkillService } from '../services/skill.service';
import { CategoryService } from "../services/category.service";
import { Skill } from '../models/skill.model';
import { Category } from '../models/category.model';
import { MatDialog } from '@angular/material/dialog';
import { SkillFormDialogComponent } from '../skill-form-dialog/skill-form-dialog.component';

@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.css']
})
export class SkillsComponent implements OnInit {
  // Define las columnas que se mostrarán en la tabla
  displayedColumns: string[] = ['number', 'name', 'category', 'actions'];
  // DataSource para manejar los datos de la tabla
  dataSource!: MatTableDataSource<Skill>;
  category!: Category;

  // ViewChild para conectar el paginador y el ordenamiento de columnas
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private skillService: SkillService, private categoryService: CategoryService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.getSkills(); // Llama a la función para obtener las habilidades cuando se inicializa el componente
  }

  // Función para obtener las habilidades desde el servicio
  getSkills(): void {
    this.skillService.getSkills().subscribe((skills) => {
      // Inicializa la dataSource con los datos obtenidos
      this.dataSource = new MatTableDataSource(skills);
      // Conecta el paginador y el ordenamiento con la tabla
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  // Función para aplicar el filtro a la tabla
  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  // Función para abrir el diálogo de creación de una nueva habilidad
  openNewSkillDialog(): void {
    const dialogRef = this.dialog.open(SkillFormDialogComponent, {
      width: '400px',
      data: { skill: {} } // Se pasa un objeto vacío para crear una nueva habilidad
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.getSkills(); // Refresca las habilidades después de crear una nueva
      }
    });
  }

  // Función para editar una habilidad existente
  editSkill(skill: Skill): void {
    const dialogRef = this.dialog.open(SkillFormDialogComponent, {
      width: '400px',
      data: { skill } // Se pasa la habilidad existente para editarla
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.getSkills(); // Refresca las habilidades después de editar una
      }
    });
  }

  // Función para eliminar una habilidad
  deleteSkill(id: string): void {
    this.skillService.deleteSkill(id).subscribe(() => {
      this.dataSource.data = this.dataSource.data.filter(skill => skill._id !== id);
    });
  }

 
}
