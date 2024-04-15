import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class NewsApiService {
  private apiUrl = 'https://newsapi.org/v2/top-headlines?country=in&category=health&apiKey=b06fab66d63544b4895db7d79cb7b499';

  constructor(private http: HttpClient) { }

  getTopHeadlines(category: string): Observable<any> {
    const url = `${this.apiUrl}`;
    return this.http.get(url).pipe(
      catchError((error) => {
        console.error('Error fetching news:', error);
        throw 'Error fetching news. Please try again later.';
      })
    );
  }
}
