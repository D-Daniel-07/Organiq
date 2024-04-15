import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { HomeComponent } from './home/home.component'; // Import HomeComponent
import { AboutComponent } from './about/about.component';
import { AgriNewsComponent } from './agri-news/agri-news.component';
import { ChatbotComponent } from './chatbot/chatbot.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' }, // Default redirect to login page
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'home', component: HomeComponent }, // Home route with AuthGuard
  { path: 'about', component: AboutComponent },
  { path: 'agri-news', component: AgriNewsComponent },
  { path: 'chatbot', component: ChatbotComponent }
  // Add more routes as needed
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
