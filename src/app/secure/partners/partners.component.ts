import { Component, OnInit } from '@angular/core';
import { Partner } from 'src/app/interfaces/partner';
import { Response } from 'src/app/interfaces/response';
import { PartnerService } from 'src/app/services/partner.service';

@Component({
  selector: 'app-partners',
  templateUrl: './partners.component.html',
  styleUrls: ['./partners.component.css']
})
export class PartnersComponent implements OnInit {

  partners: Partner[] = [];

  constructor(private partnerService: PartnerService) {}

  ngOnInit(): void {
    this.refresh();
  }

  refresh() {
    this.partnerService.all().subscribe((res: Response) => {
      this.partners = res.data;
      
    });
  }

  delete(id: number) {
    if (confirm('Êtes-vous sûre de vouloir supprimer cet enregistrement?')) {
      this.partnerService.delete(id).subscribe((res) => {
        this.partners = this.partners.filter((el) => el.id !== id);
      });
    }
  }

}
