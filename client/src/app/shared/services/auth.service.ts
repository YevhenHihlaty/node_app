import {User} from "../interfaces";
import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {tap} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})

export class AuthService{
  token: string = null;
  constructor(private httpClient: HttpClient){}

  login(user: User): Observable<{token: string}> {
    return this.httpClient.post<{token: string}>('/api/auth/login', user)
      .pipe(
        tap(({token}) => {
          localStorage.setItem('auth-token', token);
          this.setToken(token);
        })
      );
  }

  setToken(token: string){
    this.token = token;
  }

  getToken(): string{return this.token}

  isAuthenticated(): boolean{
    return !!this.token;
  }

  logout(){
    this.setToken(null);
    localStorage.clear();
  }
  register(user: User): Observable<User> {
    return this.httpClient.post<User>('/api/auth/register', user);
  }
}
