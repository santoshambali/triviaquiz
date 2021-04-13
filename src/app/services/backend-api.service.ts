import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BackendApiService {

  constructor(private http: HttpClient) { }

  getQuestions(): Observable<any> {
    return this.http.get("https://opentdb.com/api.php?amount=5&category=11&difficulty=medium&type=multiple", { responseType: 'text' });
  }
}
