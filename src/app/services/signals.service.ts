import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SignalsService {
  baseURL: string = "https://479c253c-15f9-4f48-ade0-4c75d0542e61.mock.pstmn.io/ecg/signals";

  constructor(protected http: HttpClient) {}

  public getJSON(): Observable<any> {
    return this.http.get(this.baseURL);
  }
}
