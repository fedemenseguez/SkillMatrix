import { Component, Output, EventEmitter } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  
  @Output() sidebarToggle = new EventEmitter<void>();
  
  username: string;

  constructor(private authService: AuthService) {
    this.username = this.authService.getUsername(); // Retrieve the logged-in user's name
  }

  toggleSidebar() {
    // Emit an event or toggle a class to show/hide the sidebar
  this.sidebarToggle.emit();
  }
}
