import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserData } from '../../../shared/types';
import { Store, select } from '@ngrx/store';
import { LoginService } from '../../services/login.service';
import { State } from '../../../redux/state.models';
import * as UserActions from '../../../redux/actions/userInfo.actions';
import { getUserInfo, selectUserState } from '../../../redux/selectors/userInfo.selector';
import { tap } from 'rxjs';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent {
  item!: UserData;

  constructor(
    private store: Store<State>,
    private router: Router,
    private loginService: LoginService
  ) {}

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
            this.item.createdAt.S = new Date(+data.createdAt.S).toDateString();
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