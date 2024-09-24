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
  
 

  getprojects(pagesObj:any) {
    return this.http.get<any>(`${this.baseUrl}projects?pages=true&project=${pagesObj}`, {withCredentials: true});
  }

  validatesession(){
    return this.http.get<any>(`${this.baseUrl}validate-session`,{withCredentials:true})
  }

  createProject(projectObj:any){
    return this.http.post<any>(`${this.baseUrl}create-project`,projectObj,{withCredentials:true})
  }
  getResults(query: string) {
    return this.http.get<any>(`${this.baseUrl}users?q=${query}`,{withCredentials:true});
  }
  
  savemarkdown(markdownObj:any){
    return this.http.put<any>(`${this.baseUrl}update-page`,markdownObj,{withCredentials:true})
  }

  getPagemarkdown(pagemarkdownObj: any) {
    const { project, page } = pagemarkdownObj;
    console.log("GET Request URL:", `${this.baseUrl}page?page=${page}&project=${project}`); // Debug API URL
    return this.http.get<any>(
      `${this.baseUrl}page?page=${page}&project=${project}`,
      { withCredentials: true }
    );
  }
  
  createpage(pageObj:any){
    return this.http.post<any>(`${this.baseUrl}create-page`,pageObj,{withCredentials:true})
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
