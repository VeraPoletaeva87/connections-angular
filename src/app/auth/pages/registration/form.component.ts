import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AbstractControl, FormControl, NonNullableFormBuilder, Validators } from '@angular/forms';
import { passwordStrengthValidator, firstNameValidator } from '../../services/validators';
import { ToastService } from '../../../core/services/toast.service';
import { HTTPClientService } from 'src/app/core/services/http.service';


@Component({
  selector: 'app-register-page',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
})
export class RegisterPageComponent {
  constructor(
    private httpService: HTTPClientService,
    private toastService: ToastService,
    private router: Router,
    private formBuilder: NonNullableFormBuilder
  ) {}

  submitDisabled = false;

  loginForm = this.formBuilder.group({
    name: new FormControl('',  [Validators.required, Validators.maxLength(40), firstNameValidator()]),
    login: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(8), passwordStrengthValidator()])
  });

  get name(): AbstractControl<string | null> | null { return this.loginForm.get('name'); }
  get login(): AbstractControl<string | null> | null { return this.loginForm.get('login'); }
  get password(): AbstractControl<string | null> | null { return this.loginForm.get('password'); }

  inputChangeHandler() {
    this.submitDisabled = this.loginForm.invalid;
  }

  loginHandler() {
    if (!this.loginForm.invalid) {
     const formData = {
      email: this.loginForm.controls.login.value,
      name: this.loginForm.controls.name.value,
      password: this.loginForm.controls.password.value
     }
     this.submitDisabled = true;

     this.httpService
     .simpleRequest(
       'https://tasks.app.rs.school/angular/registration',
       {
         method: 'POST',
         data: formData
       }
     )
     .then(() => {
       this.toastService.showMessage('success', 'User is successfuly registered!');
       this.submitDisabled = false;
       this.router.navigate(['/signin']);
     })
     .catch((message) => {
       this.toastService.showMessage('error', message);
     });
    } else {
      this.loginForm.markAllAsTouched();
    }
  }
}