import { Component, OnInit } from '@angular/core';
import { Article } from "src/app/interfaces/article";
import { Product } from 'src/app/interfaces/product';
import { Portfolio } from "src/app/interfaces/portfolio";
import { Partner } from 'src/app/interfaces/partner';
import { User } from 'src/app/interfaces/user';
import { Response } from 'src/app/interfaces/response';
import { ArticleService } from 'src/app/services/article.service';
import { PartnerService } from 'src/app/services/partner.service';
import { ProductService } from 'src/app/services/product.service';
import { PortoflioService } from 'src/app/services/portfolio.service';
import { UserService } from 'src/app/services/user.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  articles: Article[] = []
  partners: Partner[] = []
  products: Product[] = [];
  portfolios: Portfolio[] = [];
  users: User[] = [];

  constructor(
    private articleService: ArticleService,
    private productService: ProductService,
    private portfolioService: PortoflioService,
    private partnerService: PartnerService,
    private userService: UserService  
    ) {}

  ngOnInit(): void {
    this.refresh();
  }

  refresh() {
    this.articleService.all().subscribe((res: Response) => {
      this.articles = res.data;
    });
    this.productService.all().subscribe((res: Response) => {
      this.products = res.data;
    });
    this.partnerService.all().subscribe((res: Response) => {
      this.partners = res.data;
    });
    this.portfolioService.all().subscribe((res: Response) => {
      this.portfolios = res.data;
    });
    this.userService.all().subscribe((res: Response) => {
      this.users = res.data;
    });
  }
}
