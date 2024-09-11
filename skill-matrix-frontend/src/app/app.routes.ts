//import { Routes } from '@angular/router';

//export const routes: Routes = [];

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeesComponent } from '../app/employees/employees.component';
import { DepartmentsComponent } from './departments/departments.component';
import { SkillsComponent } from './skills/skills.component';
import { CategoriesComponent } from './categories/categories.component';
import { EmployeeDetailComponent } from './employee-detail/employee-detail.component';

export const routes: Routes = [
  { path: 'employees', component: EmployeesComponent },
  { path: 'departments', component: DepartmentsComponent },
  { path: 'skills', component: SkillsComponent },
  { path: 'categories', component: CategoriesComponent },
  { path: 'employees', component: EmployeesComponent },
  { path: 'employee/:id', component: EmployeeDetailComponent },
  { path: '', redirectTo: '/employees', pathMatch: 'full' },  // Default route
  { path: '**', redirectTo: '/employees' }  // Wildcard route for handling 404s
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
})
export class AppRoutingModule {}
