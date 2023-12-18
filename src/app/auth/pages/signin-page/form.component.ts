import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {
  AbstractControl,
  FormControl,
  NonNullableFormBuilder,
  Validators,
} from '@angular/forms';
import { LoginService } from '../../services/login.service';
import { ToastService } from '../../../core/services/toast.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './form.component.html',
  styleUrls: ['../registration/form.component.css'],
})
export class LoginPageComponent {
  constructor(
    private loginService: LoginService,
    private router: Router,
    private toastService: ToastService,
    private formBuilder: NonNullableFormBuilder
  ) {}

  submitDisabled = false;

  loginForm = this.formBuilder.group({
    login: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });

  get login(): AbstractControl<string | null> | null {
    return this.loginForm.get('login');
  }
  get password(): AbstractControl<string | null> | null {
    return this.loginForm.get('password');
  }

  inputChangeHandler() {
    this.submitDisabled = this.loginForm.invalid;
  }

  loginHandler() {
    if (!this.loginForm.invalid) {
      const formData = {
        email: this.loginForm.controls.login.value,
        password: this.loginForm.controls.password.value,
      };
      this.submitDisabled = true;
      fetch('https://tasks.app.rs.school/angular/login', {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        method: 'POST',
        body: JSON.stringify(formData),
      }).then((response) => {
        if (!response.ok) {
          response
            .json()
            .catch(() => {
              throw new Error('Could not parse the JSON');
            })
            .then(({ type, message }) => {
              if ((type = 'NotFoundException')) {
                this.submitDisabled = true;
              }
              this.toastService.showMessage('error', message);
            });
        } else {
          response
            .clone()
            .json()
            .then((data) => {
              this.toastService.showMessage(
                'success',
                'User successfuly logged in!'
              );
              this.submitDisabled = false;
              this.loginService.saveUser(
                this.loginForm.controls.login.value || '',
                data.token,
                data.uid
              );
              this.router.navigate(['/main']);
            });
        }
      });
    } else {
      this.loginForm.markAllAsTouched();
    }
  }
}
