import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Response } from 'src/app/interfaces/response';
import { ActivatedRoute, Router } from '@angular/router';
import { TagService } from 'src/app/services/tag.service';
import { Tag } from 'src/app/interfaces/tag';

@Component({
  selector: 'app-tag-edit',
  templateUrl: './tag-edit.component.html',
  styleUrls: ['./tag-edit.component.css'],
})
export class TagEditComponent implements OnInit {
  form: FormGroup;
  tag: Tag;

  constructor(
    private tagService: TagService,
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      name: '',
    });

    this.route.params.subscribe((params) => {
      this.tagService.get(params.id).subscribe((res: Response) => {
        this.tag = res.data;

        this.form.patchValue({
          name: this.tag.name,
        });
      });
    });
  }

  submit() {
    const formData = this.form.getRawValue();

    const data = {
      name: formData.name,
    };

    this.tagService.update(this.tag.id, data).subscribe((res) => {
      this.router.navigate(['/tags']);
    });
  }
}
