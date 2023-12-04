import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AbstractControl, FormControl, NonNullableFormBuilder, Validators } from '@angular/forms';
import { LoginService } from '../../services/login.service';
import { passwordStrengthValidator, firstNameValidator } from '../../services/validators';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css'],
})
export class LoginPageComponent {
  constructor(
    private loginService: LoginService, 
    private router: Router,
    private formBuilder: NonNullableFormBuilder
  ) {}

  loginForm = this.formBuilder.group({
    name: new FormControl('',  [Validators.required, Validators.maxLength(40), firstNameValidator()]),
    login: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(8), passwordStrengthValidator()])
  });

  get name(): AbstractControl<string | null> | null { return this.loginForm.get('name'); }
  get login(): AbstractControl<string | null> | null { return this.loginForm.get('login'); }
  get password(): AbstractControl<string | null> | null { return this.loginForm.get('password'); }

  loginHandler() {
    if (!this.loginForm.invalid) {
     const formData = {
      email: this.loginForm.controls.login.value,
      name: this.loginForm.controls.name.value,
      password: this.loginForm.controls.password.value
     }
     const urlBase = `https://tasks.app.rs.school/angular/registration`;
     fetch(urlBase, 
      {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        method: "POST",
        body: JSON.stringify(formData)
    }).then(function (response) {
      return response.json();
  })
  .then(function (result) {
      alert(result);
  })
  .catch (function (error) {
      console.log('Request failed', error);
  });
      //this.router.navigate(['/main']);
    } else {
      this.loginForm.markAllAsTouched();
    }
  }
}
