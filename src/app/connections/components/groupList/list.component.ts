import { Component } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { LoginService } from '../../../auth/services/login.service';
import { State } from '../../../redux/state.models';
import { GroupData, UserParams } from '../../../shared/types';
import { getGroups } from 'src/app/redux/selectors/groups.selector';
import * as GroupActions from '../../../redux/actions/groups.actions';
import { CountdownService } from '../../services/countdown.service';
import { Router } from '@angular/router';
import { ToastService } from '../../../core/services/toast.service';
import { UtilsService } from '../../services/utils.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
  providers: [CountdownService]
})
export class ListComponent {
  
  items: GroupData[] = []; 
  showDialog: boolean = false;
  isRequesting: boolean = false;
  showConfirmation: boolean = false;
  itemToDelete: string = '';

  params: UserParams = {
    uid: '',
    email: '',
    token: ''
  };

  countdown$ = this.countdownService.countdown$;
  get updateDisabled() {
    return this.countdownService.isRunning;
  }

  get isDarkTheme() {
    return this.utilsService.isDarkTheme;
  }

  constructor(
    private loginService: LoginService,
    private countdownService: CountdownService,
    private toastService: ToastService,
    private router: Router,
    private store: Store<State>,
    private utilsService: UtilsService
  ) {}

  updateHandler() {
    this.requestGroups();
  }

  createHandler() {
    this.showDialog = true;
  }

  handleCloseDialog() {
    this.showDialog = false;
  }

  // update groups list from store
  updateGroupsFromStore() {
    return this.store
    .pipe(
      select((state) => getGroups(state))
      ).subscribe((items: GroupData[]) => {
          this.items = items;
      }) 
  }

  handleSaveGroup() {
    this.updateGroupsFromStore();
  }

  handleCloseConfirmation() {
    this.showConfirmation = false;
  }

  deleteHandler(id: string) {
    this.showConfirmation = true;
    this.itemToDelete = id;
  }

  handleDeleteConfirmation() {
    const params = this.loginService.getUser();
    fetch(`https://tasks.app.rs.school/angular/groups/delete?groupID=${this.itemToDelete}`, 
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
              this.toastService.showMessage('error', message);
            });
    } else {
        this.toastService.showMessage('success', 'Group is successfuly deleted!');
        this.store.dispatch(GroupActions.DeleteCustomgroup({id: this.itemToDelete}));
        this.updateGroupsFromStore();
        this.showConfirmation = false;
    }
  });
  }

  // update groups list from http request
  requestGroups() {
    this.isRequesting = true;
     fetch('https://tasks.app.rs.school/angular/groups/list', 
      {
        headers: {
          'rs-uid': this.params.uid || '',
          'rs-email': this.params.email || '',
          'Authorization': 'Bearer '+ this.params.token
      },
        method: "GET"
    }).then(response => {
      if (!response.ok) {
         response.json()
              .catch(() => {
                  throw new Error('Could not parse the JSON');
              })
              .then(({message}) => {
                this.toastService.showMessage('error', message);
              });
      } else {
        response.clone().json()
          .then((data) => {
            this.toastService.showMessage('success', 'Successfuly got group list!');
            this.items = data.Items;
            this.store.dispatch(GroupActions.AddGroups({items: this.items}));
            this.isRequesting = false;
            this.countdownService.startCountdown();
          });
      }
  });
  }

  itemClickHandler(item: GroupData) {
    this.router.navigate([`/group/${item.id.S}`]); }

  ngOnInit() {
    this.params = this.loginService.getUser();
    return this.store
   .pipe(
     select((state) => getGroups(state))
     ).subscribe((items: GroupData[]) => {
         if (items.length) {
             this.items = items;
           } else {
             this.requestGroups();
           }
     }) 
  }
}