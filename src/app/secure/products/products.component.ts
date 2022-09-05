import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/interfaces/product';
import { Category } from "src/app/interfaces/category";
import { Response } from 'src/app/interfaces/response';
import { ProductService } from 'src/app/services/product.service';
import { CategoryService } from 'src/app/services/category.service';


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  categories: Category[] = [];
  products: Product[] = [];

  constructor(
    private productService: ProductService,
    private categoryService: CategoryService,
    ) {}

  ngOnInit(): void {
    this.refresh();
    this.categoryService.all().subscribe((res: Response) => {
      this.categories = res.data;
    });
  }

  refresh() {
    this.productService.all().subscribe((res: Response) => {
      this.products = res.data;
      this.products.forEach((p: any) => {
        this.categories.forEach((c: any) => {
          if (p.category === c.id) {
            p.category = c.name;
          }
        });
      });
    });
  }

  delete(id: number) {
    if (confirm('Êtes-vous sûre de vouloir supprimer cet enregistrement?')) {
      this.productService.delete(id).subscribe((res) => {
        this.products = this.products.filter((el) => el.id !== id);
      });
    }
  }

}
