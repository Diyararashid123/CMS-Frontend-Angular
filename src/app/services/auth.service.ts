import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl: string = "https://cms-backend-spring-bush-4043.fly.dev/"
  constructor(private http:HttpClient) { }



  validatesession(){
    return this.http.get<any>(`${this.baseUrl}validate-session`,{withCredentials:true})
  }

  createProject(projectObj:any){
    return this.http.post<any>(`${this.baseUrl}create-project`,projectObj,{withCredentials:true})
  }
  getResults(query: string) {
    return this.http.get<any>(`${this.baseUrl}users?q=${query}`,{withCredentials:true});
  }
  

  getproject() {
    return this.http.get<{projects: {ProjectName: string, ProjectDescription: string}[]}>(`${this.baseUrl}projects`, {withCredentials: true});
  }

  signUp(userObj:any){
    return this.http.post<any>(`${this.baseUrl}register`,userObj)
  }

  login(loginObj: any) {
    return this.http.post<any>(`${this.baseUrl}login`, loginObj, { withCredentials: true });
  }

  logout(){
    return this.http.get<any>(`${this.baseUrl}logout`,{withCredentials:true});
  }
}
