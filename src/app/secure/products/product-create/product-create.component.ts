import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { Router } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';
import { Photo } from "src/app/interfaces/photo";
import { Category } from 'src/app/interfaces/category';
import { Response } from 'src/app/interfaces/response';
import { PhotoService } from 'src/app/services/photo.service';
import { CategoryService } from 'src/app/services/category.service';
import { ImageService } from 'src/app/services/image.service';
declare let $: any;

@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.css'],
})
export class ProductCreateComponent implements OnInit {
  categories: Category[] = [];
  photos: Photo[] = [];
  form: FormGroup;

  editorConfig: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: 'auto',
    minHeight: '0',
    maxHeight: 'auto',
    width: 'auto',
    minWidth: '0',
    translate: 'yes',
    enableToolbar: true,
    showToolbar: true,
    placeholder: 'Enter text here...',
    defaultParagraphSeparator: '',
    defaultFontName: '',
    defaultFontSize: '',
    fonts: [
      { class: 'arial', name: 'Arial' },
      { class: 'times-new-roman', name: 'Times New Roman' },
      { class: 'calibri', name: 'Calibri' },
      { class: 'comic-sans-ms', name: 'Comic Sans MS' },
    ],
    customClasses: [
      {
        name: 'quote',
        class: 'quote',
      },
      {
        name: 'redText',
        class: 'redText',
      },
      {
        name: 'titleText',
        class: 'titleText',
        tag: 'h1',
      },
    ],
    uploadUrl: 'v1/image',
    // upload: (file: File) => { ... },
    uploadWithCredentials: false,
    sanitize: true,
    toolbarPosition: 'top',
    toolbarHiddenButtons: [['bold', 'italic'], ['fontSize']],
  };

  constructor(
    private categoryService: CategoryService,
    private productService: ProductService,
    private photoService: PhotoService,
    private formBuilder: FormBuilder,
    private router: Router,
    private imageService: ImageService
  ) {}

  ngOnInit(): void {

    $(document).ready(function () {
      setTimeout(function () {
        $('.selectpicker').selectpicker('refresh');
      }, 100);
    });

    this.form = this.formBuilder.group({
      image: ['', Validators.required],
      title: ['', Validators.required],
      description: ['', Validators.required],
      category: ['', Validators.required],
      price: '',
      photos: this.formBuilder.array([]),
    });

    this.categoryService.all().subscribe((res: Response) => {
      this.categories = res.data;
    });

    this.photoService.all().subscribe((res: Response) => {
      this.photos = res.data;
      this.photos.forEach((p: Photo) => {
        this.photoArray.push(
          this.formBuilder.group({
            value: false,
            id: p.id,
          })
        );
      });
    });

  }

  get photoArray() {
    return this.form.get('photos') as FormArray;
  }

  submit() {
    if (this.form.valid) {
      const formData = this.form.getRawValue();

      const data = {
        image: formData.image,
        title: formData.title,
        description: formData.description,
        category: formData.category,
        price: formData.price,
        photos: formData.photos.filter((p) => p.value === true).map((p) => p.id),
      };
      this.productService.create(data).subscribe((res) => {
        this.router.navigate(['/products']);
      });
    }
  }

  upload2(files: FileList) {
    const file = files.item(0);

    const data = new FormData();
    data.append('image', file);

    this.imageService.upload(data).subscribe((res: any) => {
      this.form.patchValue({
        image: res.url,
      });
    });
  }
}
