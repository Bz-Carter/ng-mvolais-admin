import { Injectable } from '@angular/core';
import { RestService } from './rest.service';

@Injectable({
  providedIn: 'root',
})
export class TagService extends RestService {
  endpoint(): string {
    return 'tags';
  }
}
