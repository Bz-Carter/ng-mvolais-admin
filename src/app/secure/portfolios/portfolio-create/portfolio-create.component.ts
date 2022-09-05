import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { Router } from '@angular/router';
import { Auth } from 'src/app/classes/auth';
import { Mvolaiserv } from "src/app/interfaces/mvolaiserv";
import { Photo } from "src/app/interfaces/photo";
import { Response } from 'src/app/interfaces/response';
import { MovlaiservService } from 'src/app/services/movlaiserv.service';
import { PhotoService } from 'src/app/services/photo.service';
import { ImageService } from 'src/app/services/image.service';
import { PortoflioService } from 'src/app/services/portfolio.service';
declare let $: any;

@Component({
  selector: 'app-portfolio-create',
  templateUrl: './portfolio-create.component.html',
  styleUrls: ['./portfolio-create.component.css']
})
export class PortfolioCreateComponent implements OnInit {

  services: Mvolaiserv[] = [];
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
        {class: 'arial', name: 'Arial'},
        {class: 'times-new-roman', name: 'Times New Roman'},
        {class: 'calibri', name: 'Calibri'},
        {class: 'comic-sans-ms', name: 'Comic Sans MS'}
      ],
      customClasses: [
      {
        name: 'quote',
        class: 'quote',
      },
      {
        name: 'redText',
        class: 'redText'
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
    toolbarHiddenButtons: [
      ['bold', 'italic'],
      ['fontSize']
    ]
  };

  constructor(
    private movlaiservService: MovlaiservService,
    private photoService: PhotoService,
    private portoflioService: PortoflioService,
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
      body:['', Validators.required],
      service: ['', Validators.required],
      created: ['', Validators.required],
      photos: this.formBuilder.array([]),
    });

    this.movlaiservService.all().subscribe((res: Response) => {
      this.services = res.data;
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
        body: formData.body,
        service: formData.service,
        created: formData.created,
        photos: formData.photos.filter((p) => p.value === true).map((p) => p.id),
      };
      this.portoflioService.create(data).subscribe((res) => {
        this.router.navigate(['/portfolios']);
      });
    }
  }

  upload(files: FileList) {
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
