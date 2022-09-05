import { Component, OnInit } from '@angular/core';
import { Portfolio } from "src/app/interfaces/portfolio";
import { Response } from 'src/app/interfaces/response';
import { PortoflioService } from 'src/app/services/portfolio.service';


@Component({
  selector: 'app-portfolios',
  templateUrl: './portfolios.component.html',
  styleUrls: ['./portfolios.component.css']
})
export class PortfoliosComponent implements OnInit {

  portfolios: Portfolio[] = [];

  constructor(private portfolioService: PortoflioService) {}

  ngOnInit(): void {
    this.refresh();
  }

  refresh() {
    this.portfolioService.all().subscribe((res: Response) => {
      this.portfolios = res.data;
      
    });
  }

  delete(id: number) {
    if (confirm('Êtes-vous sûre de vouloir supprimer cet enregistrement?')) {
      this.portfolioService.delete(id).subscribe((res) => {
        this.portfolios = this.portfolios.filter((el) => el.id !== id);
      });
    }
  }

}
