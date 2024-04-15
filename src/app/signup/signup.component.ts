import { Component } from '@angular/core';
import { User } from '../user.model';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2'; // Import SweetAlert2

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  newUser: User = {
    userId: '',
    password: ''
  };

  constructor(private userService: UserService, private router: Router) {}

  signup(): void {
    // Validate the form input
    if (this.newUser.userId && this.newUser.password) {
      // Check if user already exists
      const existingUser = this.userService.getUserById(this.newUser.userId);
      if (existingUser) {
        Swal.fire({
          icon: 'error',
          title: 'User ID Exists',
          text: 'User ID already exists. Please choose a different one.'
        });
      } else {
        // Add the new user using UserService
        this.userService.addUser(this.newUser);
        console.log('New user registered:', this.newUser);
        Swal.fire({
          icon: 'success',
          title: 'Registration Successful',
          text: 'New user registered successfully!'
        });
        // Reset the form fields
        this.newUser = { userId: '', password: '' };
        // Redirect to login page
        this.router.navigate(['/login']);
      }
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Invalid Input',
        text: 'Please provide a valid user ID and password.'
      });
    }
  }
}
