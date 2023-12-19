import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserData } from '../../../shared/types';
import { Store, select } from '@ngrx/store';
import { LoginService } from '../../services/login.service';
import { State } from '../../../redux/state.models';
import * as UserActions from '../../../redux/actions/userInfo.actions';
import { getUserInfo } from '../../../redux/selectors/userInfo.selector';
import { ToastService } from '../../../core/services/toast.service';
import { HTTPClientService } from 'src/app/core/services/http.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent {
  item!: UserData;
  isEditing: boolean = false;
  isSaving: boolean = false;
  isLoggingOut: boolean = false;
  newName: string = '';

  constructor(
    private store: Store<State>,
    private router: Router,
    private httpService: HTTPClientService,
    private toastService: ToastService,
    private loginService: LoginService
  ) {}

  editHandler() {
    this.isEditing = true;
  }

  cancelHandler() {
    this.isEditing = false;
  }

  backHandler() {
    this.router.navigate(['/main']);
  }

  inputChangeHandler(e: Event) {
    this.newName = (e.target as HTMLInputElement).value;
  }

  logoutHandler() {
    this.isLoggingOut = true;
    const params = this.loginService.getUser();

    this.httpService
      .simpleRequest('https://tasks.app.rs.school/angular/logout', {
        headers: this.httpService.getHeaders(params),
        method: 'DELETE',
      })
      .then(() => {
        this.loginService.logOut();
        this.toastService.showMessage(
          'success',
          'User successfuly logged out!'
        );
        this.isLoggingOut = false;
      })
      .catch((message) => {
        this.toastService.showMessage('error', message);
      });
  }

  saveHandler() {
    const params = this.loginService.getUser();
    this.isSaving = true;
    const formData = {
      name: this.newName,
    };

    this.httpService
      .simpleRequest('https://tasks.app.rs.school/angular/profile', {
        headers: this.httpService.getHeaders(params),
        method: 'PUT',
        data: formData,
      })
      .then(() => {
        this.item = {
          uid: this.item.uid,
          name: { S: this.newName },
          email: this.item.email,
          createdAt: this.item.createdAt,
        };
        this.store.dispatch(UserActions.AddUserInfo({ item: this.item }));
        this.toastService.showMessage(
          'success',
          'User name successfuly changed!'
        );
        this.isSaving = false;
        this.isEditing = false;
      })
      .catch((message) => {
        this.toastService.showMessage('error', message);
      });
  }

  requestProfile = () => {
    const params = this.loginService.getUser();
    this.httpService
      .jsonRequest<UserData>('https://tasks.app.rs.school/angular/profile', {
        headers: this.httpService.getHeaders(params),
        method: 'GET',
      })
      .then((data: UserData) => {
        this.item = data;
        this.item.createdAt.S = new Date(+data.createdAt.S).toLocaleString();
        this.store.dispatch(UserActions.AddUserInfo({ item: this.item }));
      })
      .catch((message) => {
        this.toastService.showMessage('error', message);
      });
  };

  ngOnInit() {
    return this.store
      .pipe(select((state) => getUserInfo(state)))
      .subscribe((item: UserData) => {
        if (item.uid.S !== '') {
          this.item = item;
        } else {
          this.requestProfile();
        }
      });
  }
}
