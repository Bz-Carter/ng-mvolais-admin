import { Injectable } from '@angular/core';
import { RestService } from './rest.service';

@Injectable({
  providedIn: 'root'
})
export class MovlaiservService extends RestService {
  endpoint(): string {
    return 'services';
  }
}
