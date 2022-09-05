import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Partner } from 'src/app/interfaces/partner';
import { Response } from 'src/app/interfaces/response';
import { ImageService } from 'src/app/services/image.service';
import { PartnerService } from 'src/app/services/partner.service';
declare let $: any;

@Component({
  selector: 'app-partner-edit',
  templateUrl: './partner-edit.component.html',
  styleUrls: ['./partner-edit.component.css'],
})
export class PartnerEditComponent implements OnInit {
  form: FormGroup;
  partner: Partner;

  constructor(
    private partnerService: PartnerService,
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
      name: ['', Validators.required],
      image: ['', Validators.required],
      alt: ''
    });

    this.route.params.subscribe((params) => {
      this.partnerService.get(params.id).subscribe((res: Response) => {
        this.partner = res.data;
        this.form.patchValue({
          name: this.partner.name,
          image: this.partner.image,
          alt: this.partner.alt
        });
      });
    });
  }

  submit() {
    if (this.form.valid) {
      const formData = this.form.getRawValue();

      const data = {
        name: formData.name,
        image: formData.image,
        alt: formData.alt
      };

      this.partnerService.update(this.partner.id, data).subscribe((res) => {
        this.router.navigate(['/partners']);
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
