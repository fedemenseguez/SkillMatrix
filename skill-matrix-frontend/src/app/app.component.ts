import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'skill-matrix-frontend';
  isSidebarVisible = true;  // Initial state: sidebar is visible

  onSidebarToggle() {
    this.isSidebarVisible = !this.isSidebarVisible;  // Toggle the sidebar visibility
  }
}
