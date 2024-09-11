import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
    providedIn: 'root',
})
export class FileManagerService {
    private apiUrl = environment.apiUrl 

    constructor(private http: HttpClient) { }

    
    uploadCV(employeeId: string, file: File): Observable<any> {
        const formData = new FormData();
        formData.append('file', file);

        return this.http.post<any>(`${this.apiUrl}/employees/${employeeId}/upload-cv`, formData);
    }
}