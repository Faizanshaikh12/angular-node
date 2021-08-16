import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Observable} from "rxjs";
import {Issue} from "../models/Issue";

@Injectable({
  providedIn: 'root'
})
export class IssueService {

private BASE_URL = environment.URL;

  constructor(private http: HttpClient) { }

  getIssues(): Observable<Issue[]>{
    return this.http.get<Issue[]>(this.BASE_URL);
  }

  getIssueById(id: string){
    return this.http.get(`${this.BASE_URL}/${id}`);
  }

  addIssue(title: string, responsible: string, description: string, severity: string){
    const issue = {
      title: title,
      responsible: responsible,
      description: description,
      severity: severity
    };
    return this.http.post(`${this.BASE_URL}/add`, issue);
  }

  updateIssue(id: string, title: string, responsible: string, description: string, severity: string, status: string){
    const issue = {
      title: title,
      responsible: responsible,
      description: description,
      severity: severity,
      status: status
    };
    return this.http.put(`${this.BASE_URL}/update/${id}`, issue);
  }

  deleteIssue(id: string){
    return this.http.delete(`${this.BASE_URL}/delete/${id}`);
  }
}
