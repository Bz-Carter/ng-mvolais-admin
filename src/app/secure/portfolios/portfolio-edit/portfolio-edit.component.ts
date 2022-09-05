import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularEditorConfig } from '@kolkov/angular-editor';

import { Portfolio } from 'src/app/interfaces/portfolio';
import { Mvolaiserv } from 'src/app/interfaces/mvolaiserv';
import { Response } from 'src/app/interfaces/response';
import { Photo } from 'src/app/interfaces/photo';
import { PortoflioService } from 'src/app/services/portfolio.service';
import { MovlaiservService } from 'src/app/services/movlaiserv.service';
import { ImageService } from 'src/app/services/image.service';
import { PhotoService } from 'src/app/services/photo.service';
declare let $: any;

@Component({
  selector: 'app-portfolio-edit',
  templateUrl: './portfolio-edit.component.html',
  styleUrls: ['./portfolio-edit.component.css']
})
export class PortfolioEditComponent implements OnInit {

  services: Mvolaiserv[] = [];
  photos: Photo[] = [];
  portfolio: Portfolio;
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
    private movlaiservService: MovlaiservService,
    private photoService: PhotoService,
    private portoflioService: PortoflioService,
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private imageService: ImageService
  ) {}

  ngOnInit(): void {
    function setFormValidation(id) {
      $(id).validate({
        highlight: function (element) {
          $(element)
            .closest('.form-group')
            .removeClass('has-success')
            .addClass('has-danger');
          $(element)
            .closest('.form-check')
            .removeClass('has-success')
            .addClass('has-danger');
        },
        success: function (element) {
          $(element)
            .closest('.form-group')
            .removeClass('has-danger')
            .addClass('has-success');
          $(element)
            .closest('.form-check')
            .removeClass('has-danger')
            .addClass('has-success');
        },
        errorPlacement: function (error, element) {
          $(element).closest('.form-group').append(error);
        },
      });
    }

    $(document).ready(function () {
      setFormValidation('#TypeValidation');
      setTimeout(function () {
        $('.selectpicker').selectpicker('refresh');
      }, 100);
    });

    this.form = this.formBuilder.group({
      image: ['', Validators.required],
      title: ['', Validators.required],
      description: ['', Validators.required],
      body: ['', Validators.required],
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

    this.route.params.subscribe((params) => {
      this.portoflioService.get(params.id).subscribe((res: Response) => {
        this.portfolio = res.data;
        let values = this.photos.map((p: Photo) => {
          let selected =
            this.portfolio.photos.filter(
              (portfolioPhoto: Photo) => portfolioPhoto.id === p.id
            ).length > 0;

          return {
            value: selected,
            id: p.id,
          };
        });

        console.log(values); // boucle photo

        this.form.patchValue({
          title: this.portfolio.title,
          image: this.portfolio.image,
          description: this.portfolio.description,
          body: this.portfolio.body,
          service: this.portfolio.service,
          photos: values,
          created: this.portfolio.created,
        });
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
        photos: formData.photos.filter((p) => p.value === true).map((p) => p.id),
        created: formData.created,
      };
      this.portoflioService.update(this.portfolio.id, data).subscribe((res) => {
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
