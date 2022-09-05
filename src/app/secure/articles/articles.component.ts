import { Component, OnInit } from '@angular/core';
import { Article } from 'src/app/interfaces/article';
import { Response } from 'src/app/interfaces/response';
import { ArticleService } from 'src/app/services/article.service';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.css'],
})
export class ArticlesComponent implements OnInit {
  articles: Article[] = [];

  constructor(private articleService: ArticleService) {}

  ngOnInit(): void {
    this.refresh();
  }

  refresh() {
    this.articleService.all().subscribe((res: Response) => {
      this.articles = res.data;
      
    });
  }

  delete(id: number) {
    if (confirm('Êtes-vous sûre de vouloir supprimer cet enregistrement?')) {
      this.articleService.delete(id).subscribe((res) => {
        this.articles = this.articles.filter((el) => el.id !== id);
      });
    }
  }
}
