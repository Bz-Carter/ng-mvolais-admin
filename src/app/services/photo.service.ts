import { Injectable } from '@angular/core';
import { RestService } from './rest.service';

@Injectable({
  providedIn: 'root',
})
export class PhotoService extends RestService {
  endpoint(): string {
    return 'photos';
  }
}
