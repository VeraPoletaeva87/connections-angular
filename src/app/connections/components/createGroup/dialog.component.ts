import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  AbstractControl,
  FormControl,
  NonNullableFormBuilder,
  Validators,
} from '@angular/forms';
import { LoginService } from '../../../auth/services/login.service';
import { State } from '../../../redux/state.models';
import * as GroupActions from '../../../redux/actions/groups.actions';
import { GroupData } from 'src/app/shared/types';
import { ToastService } from '../../../core/services/toast.service';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css'],
})
export class DialogComponent {
  @Input() visible = false;
  @Output() closeEmitter = new EventEmitter();
  @Output() saveEmitter = new EventEmitter();

  submitDisabled = false;

  constructor(
    private formBuilder: NonNullableFormBuilder,
    private loginService: LoginService,
    private toastService: ToastService,
    private store: Store<State>
  ) {}

  createGroupForm = this.formBuilder.group({
    name: new FormControl('', [
      Validators.required,
      Validators.maxLength(30),
      Validators.pattern('^[A-Za-z0-9 _]*[A-Za-z0-9][A-Za-z0-9 _]*$'),
    ]),
  });

  get name(): AbstractControl<string | null> | null {
    return this.createGroupForm.get('name');
  }

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
      };
      const params = this.loginService.getUser();
      this.submitDisabled = true;
      const creationTime = +new Date();
      fetch('https://tasks.app.rs.school/angular/groups/create', {
        headers: {
          'rs-uid': params.uid || '',
          'rs-email': params.email || '',
          Authorization: 'Bearer ' + params.token,
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
            .then(({ message }) => {
              this.toastService.showMessage('error', message);
            });
        } else {
          response
            .clone()
            .json()
            .then((data) => {
              const itemData: GroupData = {
                id: {
                  S: data.groupID,
                },
                name: {
                  S: formData.name || '',
                },
                createdAt: {
                  S: creationTime.toString(),
                },
                createdBy: {
                  S: params.uid || '',
                },
              };
              this.toastService.showMessage(
                'success',
                'Group is successfuly created!'
              );
              this.submitDisabled = false;
              this.store.dispatch(
                GroupActions.AddCustomgroup({ item: itemData })
              );
              this.closeEmitter.emit();
              this.saveEmitter.emit();
            });
        }
      });
    } else {
      this.createGroupForm.markAllAsTouched();
    }
  }
}
