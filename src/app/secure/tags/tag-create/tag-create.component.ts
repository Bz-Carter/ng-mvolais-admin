import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { TagService } from 'src/app/services/tag.service';

@Component({
  selector: 'app-tag-create',
  templateUrl: './tag-create.component.html',
  styleUrls: ['./tag-create.component.css'],
})
export class TagCreateComponent implements OnInit {
  form: FormGroup;

  constructor(
    private tagService: TagService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      name: '',
    });
  }

  submit() {
    const formData = this.form.getRawValue();

    const data = {
      name: formData.name,
    };
    this.tagService.create(data).subscribe((res) => {
      this.router.navigate(['/tags']);
    });
  }
}
