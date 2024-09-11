import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  getUsername() {
    // Replace with real authentication logic
    return 'John Doe';
  }
}