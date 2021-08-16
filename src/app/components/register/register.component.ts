import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {IssueService} from "../../services/issue.service";
import {Router} from "@angular/router";
import {AuthService} from "../../services/auth.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {first} from "rxjs/operators";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;
  submitted = false;

  constructor(private authService: AuthService, private fb: FormBuilder, private router: Router, private snackBar: MatSnackBar) {
    if (this.authService.currentUserValue) {
      this.router.navigate(['/']);
    }
  }

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      name: ['', Validators.required],
      username: ['', Validators.required],
      email: ['', Validators.required,],
      password: ['', Validators.required],
    });
  }

  get f() {
    return this.registerForm.controls;
  }

  register() {
    this.submitted = true;
    this.authService.register(this.registerForm.value)
      .pipe(first())
      .subscribe(
        data => {
          this.router.navigate(['/login']);
        }, (err) => {
          this.snackBar.open('Something Went Wrong.', 'OK', {
            duration: 3000,
            verticalPosition: 'bottom',
            horizontalPosition: 'center'
          })
        });
  }

}
