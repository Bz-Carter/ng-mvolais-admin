import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Response } from 'src/app/interfaces/response';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from 'src/app/services/category.service';
import { Category } from 'src/app/interfaces/category';

@Component({
  selector: 'app-category-edit',
  templateUrl: './category-edit.component.html',
  styleUrls: ['./category-edit.component.css'],
})
export class CategoryEditComponent implements OnInit {
  form: FormGroup;
  category: Category;

  constructor(
    private categoryService: CategoryService,
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      name: '',
    });

    this.route.params.subscribe((params) => {
      this.categoryService.get(params.id).subscribe((res: Response) => {
        this.category = res.data;

        this.form.patchValue({
          name: this.category.name,
        });
      });
    });
  }

  submit() {
    const formData = this.form.getRawValue();

    const data = {
      name: formData.name,
    };

    this.categoryService.update(this.category.id, data).subscribe((res) => {
      this.router.navigate(['/categories']);
    });
  }
}
