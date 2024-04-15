import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  goToRecommend(): void {
    // Implement navigation logic for Recommend
    console.log('Navigate to Recommend');
    this.router.navigate(['/home']);
    // this.router.navigate(['/recommend']); // Example navigation
  }

  goToAgriNews(): void {
    // Implement navigation logic for Agri News
    this.router.navigate(['/agri-news']);
    console.log('Navigate to Agri News');
    // this.router.navigate(['/agrinews']); // Example navigation
  }

  goToAbout(): void {
    // Implement navigation logic for About
    this.router.navigate(['/about']);
    console.log('Navigate to About');
    // this.router.navigate(['/about']); // Example navigation
  }

  logout(): void {
    // Implement logout functionality
    this.router.navigate(['/login']);
    console.log('Logout');
    // this.router.navigate(['/login']); // Example navigation
  }

  goToChatBot(){
    console.log("chatbot clicked");
    this.router.navigate(['/chatbot']);
  }

}
