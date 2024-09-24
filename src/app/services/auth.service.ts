import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

// Use a string instead of array for BASE_URL
const BASE_URL = 'http://localhost:8088/';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient
  ) { }

  signup(signupRequest: Record<string, any>): Observable<any> {
    return this.http.post(`${BASE_URL}sign-up`, signupRequest);
  }

  login(loginRequest: Record<string, any>): Observable<any> {
    return this.http.post(`${BASE_URL}authenticate`, loginRequest);
  }

  hello(): Observable<any> {
    const headers = this.createAuthorizationHeader();
    if (headers) {
      return this.http.get(`${BASE_URL}api/hello`, { headers });
    } else {
      console.log("Authorization header is missing.");
      throw new Error("Authorization required");
    }
  }

  private createAuthorizationHeader(): HttpHeaders | null {
    const jwtToken = localStorage.getItem('JWT');
    // Using nullish coalescing to check for the token
    if (jwtToken) {
      return new HttpHeaders().set('Authorization', `Bearer ${jwtToken}`);
    } else {
      console.log("JWT token not found in the Local Storage");
      return null;
    }
  }
}
