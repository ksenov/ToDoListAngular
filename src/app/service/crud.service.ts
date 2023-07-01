import { HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CrudService {

  serviceURL: string;

  constructor(private http: HttpClientModule) {
    this.serviceURL = "http://localhost3000/tasks"
  }

  
}
