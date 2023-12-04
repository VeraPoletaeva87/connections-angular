import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AbstractControl, FormControl, NonNullableFormBuilder, Validators } from '@angular/forms';
import { LoginService } from '../../services/login.service';
import { passwordStrengthValidator, firstNameValidator } from '../../services/validators';


@Component({
  selector: 'app-register-page',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
})
export class RegisterPageComponent {
  constructor(
    private loginService: LoginService, 
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
     fetch('https://tasks.app.rs.school/angular/registration', 
      {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        method: "POST",
        body: JSON.stringify(formData)
    }).then(response => {
      if (!response.ok) {
         response.json()
              .catch(() => {
                  throw new Error('Could not parse the JSON');
              })
              .then(({message}) => {
                this.loginService.openError(message);
              });
      } else {
        this.loginService.openSuccess('User is successfuly registered!');
        this.submitDisabled = false;
        this.router.navigate(['/signin']);
      }
  });
    } else {
      this.loginForm.markAllAsTouched();
    }
  }
}
