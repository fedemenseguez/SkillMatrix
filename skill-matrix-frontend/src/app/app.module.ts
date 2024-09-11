//MODULES
import { NgModule, Pipe } from '@angular/core';
import { FormsModule } from '@angular/forms'
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { HeaderComponent } from './shared/header/header.component';
import { SidebarComponent } from './shared/sidebar/sidebar.component';
import { FooterComponent } from './shared/footer/footer.component';
import { RouterModule } from '@angular/router';
import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
import { CommonModule, DatePipe } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { provideAnimations} from "@angular/platform-browser/animations";
import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';

//Components
import { CategoriesComponent } from './categories/categories.component';
import { CategoryFormDialogComponent } from "./category-form-dialog/category-form-dialog.component";
import { SkillsComponent } from './skills/skills.component';
import { SkillFormDialogComponent } from './skill-form-dialog/skill-form-dialog.component';
import { DepartmentsComponent } from './departments/departments.component';
import { EmployeesComponent } from './employees/employees.component';
import { DepartmentFormDialogComponent } from './department-form-dialog/department-form-dialog.component';
import { EmployeeFormDialogComponent } from './employee-form-dialog/employee-form-dialog.component';
import { EmployeeDetailComponent } from './employee-detail/employee-detail.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SidebarComponent,
    FooterComponent,
    CategoriesComponent,
    CategoryFormDialogComponent,
    SkillsComponent,
    SkillFormDialogComponent,
    DepartmentsComponent,
    DepartmentFormDialogComponent,
    EmployeesComponent,
    EmployeeFormDialogComponent,
    EmployeeDetailComponent
    // Declare other components here
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    FormsModule,
    MatDialogModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatOptionModule,
    MatFormFieldModule,
    MatSelectModule,
    MatPaginatorModule,
    MatSortModule,
    DatePipe
    // Import other necessary modules here
  ],
  providers: [provideHttpClient(), provideAnimations() ],
  bootstrap: [AppComponent]
})
export class AppModule { }
