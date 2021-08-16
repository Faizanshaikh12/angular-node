import { Component, OnInit } from '@angular/core';
import {IssueService} from "../../services/issue.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {Issue} from "../../models/Issue";

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {

  createForm: FormGroup;

  constructor(private issueService: IssueService, private fb: FormBuilder, private router: Router) {
    this.createForm = this.fb.group({
      title: ['', Validators.required],
      responsible: '',
      description: '',
      severity: '',
    });
  }

  ngOnInit(): void {
  }

  addIssue(title: string, responsible: string, description: string, severity: string){
    this.issueService.addIssue(title, responsible, description, severity).subscribe(() => {
      this.router.navigate(['/list'])
    })
  }

}
