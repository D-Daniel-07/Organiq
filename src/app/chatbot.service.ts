import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ChatbotService {

  private agricultureDataUrl = 'assets/agriculture-data.json';

  constructor(private http: HttpClient) { }

  getResponseByQuestion(question: string): Observable<string> {
    return this.http.get<any[]>(this.agricultureDataUrl).pipe(
      map((data: any[]) => {
        const matchingEntry = data.find(entry => this.matchesQuestion(entry.question, question));
        return matchingEntry ? matchingEntry.answer : "I'm sorry, I don't have an answer for that question.";
      }),
      catchError(error => {
        console.error('Error fetching chatbot response:', error);
        return throwError("An error occurred while fetching the response.");
      })
    );
  }

  private matchesQuestion(entryQuestion: string, userQuestion: string): boolean {
    const keywords = this.getKeywords(entryQuestion);
    return keywords.some(keyword => userQuestion.toLowerCase().includes(keyword));
  }

  private getKeywords(question: string): string[] {
    // Extract keywords from the question (e.g., "organic pesticides")
    return question.toLowerCase().split(' ');
  }
}
