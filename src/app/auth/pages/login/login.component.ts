import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth/auth.service';
import { catchError, of } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnInit {
  public loginForm: FormGroup = this.initialiseForm();

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private auth: AuthService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {}

  private initialiseForm(): FormGroup {
    return this.fb.group({
      email: this.fb.control('', [Validators.required, Validators.email]),
      password: this.fb.control('', [Validators.required]),
    });
  }

  public navigate() {
    this.router.navigate(['/auth/register']);
  }
  public showLoadingMessage() {
    this.toastr.info('Loading...', 'Please Wait', {
      disableTimeOut: true,
      closeButton: true,
      tapToDismiss: false,
      progressBar: true,
    });
  }
  public hideLoadingMessage() {
    this.toastr.clear();
  }
  logIn() {
    this.showLoadingMessage();
    const { email, password } = this.loginForm.value;
    if (email && password)
      this.auth
        .login(email, password)
        .pipe(
          catchError((err) => {
            this.toastr.error(err.message);
            return of(err);
          })
        )
        .subscribe((value) => {
          if (value) {
            this.router.navigate(['/dashboard']);
            this.hideLoadingMessage();
          }
        });
  }
}
