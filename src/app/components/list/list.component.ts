import { Component, OnInit } from '@angular/core';
import {IssueService} from "../../services/issue.service";
import {Issue} from "../../models/Issue";
import {Router} from "@angular/router";

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  issues: Issue[] = [];
  displayedColumns = ['title', 'responsible', 'severity', 'status', 'actions'];

  constructor(private issueService: IssueService, private router: Router) { }

  ngOnInit(): void {
    this.getIssues();
  }

  getIssues(){
    this.issueService.getIssues().subscribe((data: Issue[]) => {
      this.issues = data;
      console.log('Datata request;;;;');
      console.log(this.issues)
    })
  }

  editIssue(id: string){
    this.router.navigate([`/edit/${id}`]);
  }

  deleteIssue(id: string){
    this.issueService.deleteIssue(id).subscribe(() => {
      this.getIssues();
    })
  }

}
