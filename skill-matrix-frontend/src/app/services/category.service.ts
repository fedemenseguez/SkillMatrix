import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Category } from '../models/category.model';
import { environment } from '../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class CategoryService {
      private apiUrl = environment.apiUrl + '/categories';  // Replace with your actual API URL

    constructor(private http: HttpClient) { }

    getCategories(): Observable<Category[]> {
        console.log('llgue');
        return this.http.get<Category[]>(this.apiUrl);
    }

    createCategory(category: Category): Observable<Category> {
        return this.http.post<Category>(this.apiUrl, category);
    }

    updateCategory(id: string, category: Category): Observable<Category> {
        return this.http.put<Category>(`${this.apiUrl}/${id}`, category);
    }

    deleteCategory(id: string): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/${id}`);
    }
     // Obtener una categoría por ID
    getCategoryById(id: string): Observable<Category> {
    return this.http.get<Category>(`${this.apiUrl}/${id}`);
  }
}
