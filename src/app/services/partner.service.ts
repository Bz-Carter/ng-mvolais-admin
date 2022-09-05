import { Injectable } from '@angular/core';
import { RestService } from './rest.service';

@Injectable({
  providedIn: 'root'
})
export class PartnerService extends RestService {
  endpoint(): string {
    return 'partners';
  }
}
