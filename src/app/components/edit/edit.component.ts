import {Component, OnInit} from '@angular/core';
import {IssueService} from "../../services/issue.service";
import {ActivatedRoute, Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {

  id!: string;
  issue: any = {};
  updateForm!: FormGroup

  constructor(
    private issueService: IssueService,
    private router: Router,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar,
    private fb: FormBuilder
  ) {
    this.createForm();
  }

  createForm() {
    this.updateForm = this.fb.group({
      title: ['', Validators.required],
      responsible: '',
      description: '',
      severity: '',
      status: '',
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.id = params.id;
      this.issueService.getIssueById(this.id).subscribe(res => {
        this.issue = res;
        this.updateForm.get('title')?.setValue(this.issue.title);
        this.updateForm.get('responsible')?.setValue(this.issue.responsible);
        this.updateForm.get('description')?.setValue(this.issue.description);
        this.updateForm.get('severity')?.setValue(this.issue.severity);
        this.updateForm.get('status')?.setValue(this.issue.status);
      });
    });
  }

  updateIssue(title: string, responsible: string, description: string, severity: string, status: string) {
    this.issueService.updateIssue(this.id, title, responsible, description, severity, status)
      .subscribe(() => {
        this.router.navigate(['/list'])
        this.snackBar.open('Issue updated successfully', 'OK', {
          duration: 3000,
          verticalPosition: 'bottom',
          horizontalPosition: 'center'
        })
      })
  }


}
