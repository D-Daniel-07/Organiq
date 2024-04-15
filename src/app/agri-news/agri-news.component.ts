import { Component, OnInit } from '@angular/core';
import { NewsApiService } from '../news-api.service';

@Component({
  selector: 'app-agri-news',
  templateUrl: './agri-news.component.html',
  styleUrls: ['./agri-news.component.css']
})
export class AgriNewsComponent implements OnInit {
  newsList: any[] = [];
  currentIndex: number = 0;

  constructor(private newsApiService: NewsApiService) { }

  ngOnInit(): void {
    this.fetchNews();
  }

  fetchNews(): void {
    const category = 'science'; // Example category (adjust as needed)
    this.newsApiService.getTopHeadlines(category)
      .subscribe((data: any) => {
        this.newsList = data.articles;
        console.log('Fetched news:', this.newsList);
      });
  }

  nextNews(): void {
    this.currentIndex = (this.currentIndex + 1) % this.newsList.length;
  }

  previousNews(): void {
    this.currentIndex = (this.currentIndex - 1 + this.newsList.length) % this.newsList.length;
  }
}
