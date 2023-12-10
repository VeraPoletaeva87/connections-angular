import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserData } from '../../../shared/types';
import { Store, select } from '@ngrx/store';
import { LoginService } from '../../services/login.service';
import { State } from '../../../redux/state.models';
import * as UserActions from '../../../redux/actions/userInfo.actions';
import { getUserInfo } from '../../../redux/selectors/userInfo.selector';

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
    private loginService: LoginService
  ) {}

  editHandler() {
    this.isEditing = true;
  }

  cancelHandler() {
    this.isEditing = false;
  }

  inputChangeHandler(e: Event) {
    this.newName = (e.target as HTMLInputElement).value;
  }


  getHeaders() {
    const params = this.loginService.getUser();
    return {
        'rs-uid': params.uid || '',
        'rs-email': params.email || '',
        'Authorization': 'Bearer '+params.token
    };
  }

  logoutHandler() {
    this.isLoggingOut = true;
    const params = this.loginService.getUser();
    fetch('https://tasks.app.rs.school/angular/logout', 
    {
      headers: {
        'rs-uid': params.uid || '',
        'rs-email': params.email || '',
        'Authorization': 'Bearer '+params.token,
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: "DELETE"
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
        this.loginService.logOut();
        this.loginService.openSuccess('User successfuly logged out!');
        this.isLoggingOut = false;
    }
  });
  }

  saveHandler() {
    this.isSaving = true;
    const params = this.loginService.getUser();
    const formData = {
        name: this.newName
    };

    fetch('https://tasks.app.rs.school/angular/profile', 
    {
      headers: {
        'rs-uid': params.uid || '',
        'rs-email': params.email || '',
        'Authorization': 'Bearer '+params.token,
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: "PUT",
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
        this.item = {uid: this.item.uid, name: {S : this.newName}, email: this.item.email, createdAt: this.item.createdAt} ;
        this.store.dispatch(UserActions.AddUserInfo({item: this.item}));
        this.loginService.openSuccess('User name successfuly changed!');
        this.isSaving = false;
    }
  });
}

  requestProfile = () => {
    const params = this.loginService.getUser();
    fetch('https://tasks.app.rs.school/angular/profile', {
        headers: {
            'rs-uid': params.uid || '',
            'rs-email': params.email || '',
            'Authorization': 'Bearer '+params.token
        },
        method: "GET"
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
        response.clone().json()
          .then((data) => {
            this.item = data;
            this.item.createdAt.S = new Date(+data.createdAt.S).toLocaleString();
            this.store.dispatch(UserActions.AddUserInfo({item: this.item}));
          });
    }
});
  }

  ngOnInit() {
   return this.store
  .pipe(
    select((state) => getUserInfo(state))
    ).subscribe((item: UserData) => {
        if (item.uid.S !== '') {
            this.item = item;
          } else {
            this.requestProfile();
          }
    }) 
 }

}