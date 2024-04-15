// src/app/user.service.ts

import { Injectable } from '@angular/core';
import { User } from './user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private users: User[] = [];

  constructor() {
    // Retrieve users from localStorage on service initialization
    const storedUsers = localStorage.getItem('users');
    if (storedUsers) {
      this.users = JSON.parse(storedUsers);
    }
  }

  private saveUsers(): void {
    // Save users to localStorage
    localStorage.setItem('users', JSON.stringify(this.users));
  }

  getUsers(): User[] {
    return this.users;
  }

  addUser(newUser: User): void {
    this.users.push(newUser);
    this.saveUsers(); // Save updated users to localStorage
    console.log('New user registered:', newUser);
  }

  getUserById(userId: string): User | undefined {
    return this.users.find(user => user.userId === userId);
  }

  authenticateUser(userId: string, password: string): boolean {
    const user = this.getUserById(userId);
    return user !== undefined && user.password === password;
  }
}
