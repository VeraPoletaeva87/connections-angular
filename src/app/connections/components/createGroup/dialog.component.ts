import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AbstractControl, FormControl, NonNullableFormBuilder, Validators } from '@angular/forms';
import { LoginService } from '../../../auth/services/login.service';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css'],
})
export class DialogComponent {
  @Input() visible = false;
  @Output() closeEmitter = new EventEmitter();

  submitDisabled = false;

  constructor(
    private formBuilder: NonNullableFormBuilder,
    private loginService: LoginService, 
  ) {}

  createGroupForm = this.formBuilder.group({
    name: new FormControl('', [Validators.required, Validators.maxLength(30), Validators.pattern("^[A-Za-z0-9 _]*[A-Za-z0-9][A-Za-z0-9 _]*$")]),
  });

  get name(): AbstractControl<string | null> | null { return this.createGroupForm.get('name'); }
    
  closeHandler() {
    this.closeEmitter.emit();   
  } 

  inputChangeHandler() {
    this.submitDisabled = this.createGroupForm.invalid;
  }

  submitHandler() {
    if (!this.createGroupForm.invalid) {
        const formData = {
         name: this.createGroupForm.controls.name.value,
        }
        const params = this.loginService.getUser();
        this.submitDisabled = true;
        fetch('https://tasks.app.rs.school/angular/groups/create', 
         {
           headers: {
             'rs-uid': params.uid || '',
             'rs-email': params.email || '',
             'Authorization': 'Bearer '+params.token,
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
           this.loginService.openSuccess('Group is successfuly created!');
           this.submitDisabled = false;
           this.closeEmitter.emit();   
         }
     });
       } else {
         this.createGroupForm.markAllAsTouched();
       }
     }
}