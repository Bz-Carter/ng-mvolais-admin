import { Injectable } from '@angular/core';
import { RestService } from './rest.service';

@Injectable({
  providedIn: 'root',
})
export class PortoflioService extends RestService {
  endpoint(): string {
    return 'portfolios';
  }
}
