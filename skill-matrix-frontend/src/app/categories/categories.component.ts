import { Component, OnInit, ViewChild } from '@angular/core';
import { CategoryService } from '../services/category.service';
import { MatDialog } from '@angular/material/dialog';
import { Category } from '../models/category.model';
import { CategoryFormDialogComponent } from '../category-form-dialog/category-form-dialog.component';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {
  displayedColumns: string[] = ['number', 'name', 'description', 'parentCategory', 'actions'];
  dataSource!: MatTableDataSource<Category>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  categories: Category[] = [];
  newCategory: Category = { name: '' };

  constructor(private categoryService: CategoryService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.getCategories();
  }

  getCategories(): void {
    this.categoryService.getCategories().subscribe((categories) => {
      this.categories = categories;
      this.dataSource = new MatTableDataSource(categories);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  openNewCategoryDialog(): void {
    const dialogRef = this.dialog.open(CategoryFormDialogComponent, {
      width: '450px',
      data: { category: {} }  // Passing an empty category object for creation
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.getCategories();  // Refresh the categories after a new one is added
      }
    });
  }
  
  editCategory(category: Category): void {
    const dialogRef = this.dialog.open(CategoryFormDialogComponent, {
      width: '450px',
      data: { category }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.getCategories();  // Refresh categories after editing
      }
    });
  }

  deleteCategory(id?: string): void 
  {
    if(id == undefined) return;
    this.categoryService.deleteCategory(id).subscribe(() => {
      this.categories = this.categories.filter(category => category._id !== id);
    });
  }

  getCategoryNameById(id: string): string {
    const parentCategory = this.categories.find(cat => cat._id === id);
    return parentCategory ? parentCategory.name : 'None';
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
