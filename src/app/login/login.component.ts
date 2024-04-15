import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user.service';
import Swal from 'sweetalert2'; // Import SweetAlert

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string = '';
  password: string = '';

  constructor(private userService: UserService, private router: Router) {}

  login(): void {
    const isAuthenticated = this.userService.authenticateUser(this.username, this.password);
    if (isAuthenticated) {
      console.log('Login successful');
      Swal.fire({
        icon: 'success',
        title: 'Login Successful',
        text: 'You have successfully logged in!',
        timer: 2000, // Auto close after 2 seconds
        showConfirmButton: false
      });
      this.router.navigate(['/home']); // Navigate to home page upon successful login
    } else {
      // Display SweetAlert error message
      Swal.fire({
        icon: 'error',
        title: 'Login Failed',
        text: 'User ID or password not found'
      });
    }
  }

  navigateToSignup(): void {
    this.router.navigate(['/signup']);
  }
}
