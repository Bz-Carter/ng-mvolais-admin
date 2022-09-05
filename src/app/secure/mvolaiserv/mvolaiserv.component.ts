import { Component, OnInit } from '@angular/core';
import { Mvolaiserv } from 'src/app/interfaces/mvolaiserv';
import { Response } from 'src/app/interfaces/response';
import { MovlaiservService } from 'src/app/services/movlaiserv.service';

@Component({
  selector: 'app-mvolaiserv',
  templateUrl: './mvolaiserv.component.html',
  styleUrls: ['./mvolaiserv.component.css']
})
export class MvolaiservComponent implements OnInit {
  services: Mvolaiserv[] = [];

  constructor(private mvolaiservService: MovlaiservService) {}

  ngOnInit(): void {
    this.refresh();
  }

  refresh() {
    this.mvolaiservService.all().subscribe((res: Response) => {
      this.services = res.data;
      
    });
  }

  delete(id: number) {
    if (confirm('Êtes-vous sûre de vouloir supprimer cet enregistrement?')) {
      this.mvolaiservService.delete(id).subscribe((res) => {
        this.services = this.services.filter((el) => el.id !== id);
      });
    }
  }

}
