import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EmailService {

  constructor(private httpClient: HttpClient) { 
  }

  /** Send Email */
  sendEmail(body:any):Observable<any> {
    return this.httpClient.post(`${environment.email}/email`,body)
  }

   /** Get Email */
   getEmailList():Observable<any> {
    return this.httpClient.get(`${environment.email}/email`);
  }
}
