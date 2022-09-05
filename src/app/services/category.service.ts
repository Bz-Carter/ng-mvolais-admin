import { Injectable } from '@angular/core';
import { RestService } from './rest.service';

@Injectable({
  providedIn: 'root',
})
export class CategoryService extends RestService {
  endpoint(): string {
    return 'categories';
  }
}
