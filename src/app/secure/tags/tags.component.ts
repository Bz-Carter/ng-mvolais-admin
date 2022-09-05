import { Component, OnInit } from '@angular/core';
import { Tag } from 'src/app/interfaces/tag';
import { TagService } from 'src/app/services/tag.service';
import { Response } from 'src/app/interfaces/response';

@Component({
  selector: 'app-tags',
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.css'],
})
export class TagsComponent implements OnInit {
  tags: Tag[] = [];

  constructor(private tagService: TagService) {}

  ngOnInit(): void {
    this.tagService.all().subscribe((res: Response) => {
      this.tags = res.data;
    });
  }

  delete(id: number) {
    if (confirm('Are you sure you want to delete this category?')) {
      this.tagService.delete(id).subscribe((res) => {
        this.tags = this.tags.filter((el) => el.id !== id);
      });
    }
  }
}
