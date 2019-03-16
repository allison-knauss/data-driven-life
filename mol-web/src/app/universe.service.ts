import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UniverseService {

  env = environment;
  api = this.env.api.universe;

  constructor(private http: HttpClient) {
    console.log(this.api);
  }

  getNewUniverse(): Observable<any> {
    return this.http.get(`${this.api.url}`);
  }

  getUniverse(id: number): Observable<any> {
    return this.http.get(`${this.api.url}/${id}`);
  }

  stepUniverse(id: number): Observable<any> {
    return this.http.get(`${this.api.url}/${id}/step`);
  }

  getNewRandomSoup(): Observable<any> {
    return this.http.get(`${this.api.url}?soup=1`);
  }
}
