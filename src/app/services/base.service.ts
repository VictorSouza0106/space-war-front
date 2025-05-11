import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class BaseService {
  protected http = inject(HttpClient);

  // public BASE_REF = 'http://localhost:3000';
  public BASE_REF = 'https://tabulabs-344fkcab8f850.herokuapp.com';

  constructor() {}
}
