import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class BaseService {
  protected http = inject(HttpClient);

  protected BASE_REF = 'http://localhost:3000';

  constructor() {}
}
