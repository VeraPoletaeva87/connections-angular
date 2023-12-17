import { Component } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { LoginService } from '../../../auth/services/login.service';
import { State } from '../../../redux/state.models';
import { GroupData, GroupsResponse, UserParams } from '../../../shared/types';
import { getGroups } from 'src/app/redux/selectors/groups.selector';
import * as GroupActions from '../../../redux/actions/groups.actions';
import { CountdownService } from '../../services/countdown.service';
import { Router } from '@angular/router';
import { ToastService } from '../../../core/services/toast.service';
import { ThemeService } from '../../../core/services/theme.service';
import { HTTPClientService } from 'src/app/core/services/http.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
  providers: [CountdownService],
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
    token: '',
  };

  countdown$ = this.countdownService.countdown$;
  get updateDisabled() {
    return this.countdownService.isRunning;
  }

  isDarkTheme$ = this.themeService.isDarkTheme$;
  get isLight() {
    return !this.themeService.isDark;
  }

  constructor(
    private loginService: LoginService,
    private countdownService: CountdownService,
    private toastService: ToastService,
    private themeService: ThemeService,
    private httpService: HTTPClientService,
    private router: Router,
    private store: Store<State>
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
      .pipe(select((state) => getGroups(state)))
      .subscribe((items: GroupData[]) => {
        this.items = items;
      });
  }

  handleSaveGroup() {
    this.updateGroupsFromStore();
  }

  handleCloseConfirmation() {
    this.showConfirmation = false;
  }

  deleteHandler(event: Event, id: string) {
    this.showConfirmation = true;
    this.itemToDelete = id;
  }

  handleDeleteConfirmation() {
    const params = this.loginService.getUser();

    this.httpService
      .simpleRequest(
        `https://tasks.app.rs.school/angular/groups/delete?groupID=${this.itemToDelete}`,
        {
          headers: this.httpService.getHeaders(this.params),
          method: 'DELETE',
        }
      )
      .then(() => {
        this.toastService.showMessage(
          'success',
          'Group is successfuly deleted!'
        );
        this.store.dispatch(
          GroupActions.DeleteCustomgroup({ id: this.itemToDelete })
        );
        this.updateGroupsFromStore();
        this.showConfirmation = false;
      })
      .catch((message) => {
        this.toastService.showMessage('error', message);
      });
  }

  // update groups list from http request
  requestGroups() {
    this.isRequesting = true;
    this.httpService
      .jsonRequest<GroupsResponse>(
        'https://tasks.app.rs.school/angular/groups/list',
        {
          headers: this.httpService.getHeaders(this.params),
          method: 'GET',
        }
      )
      .then((data: GroupsResponse) => {
        this.toastService.showMessage('success', 'Successfuly got group list!');
        this.items = data.Items;
        this.store.dispatch(GroupActions.AddGroups({ items: this.items }));
        this.isRequesting = false;
        this.countdownService.startCountdown();
      })
      .catch((message) => {
        this.toastService.showMessage('error', message);
      });
  }

  itemClickHandler(event: Event, item: GroupData) {
    const target = event.target as HTMLDivElement;
    if (target.className === 'delete') {
      event.preventDefault();
      event.stopPropagation();
    } else {
      this.router.navigate([`/group/${item.id.S}`]);
    }
    
  }

  ngOnInit() {
    this.params = this.loginService.getUser();
    return this.store
      .pipe(select((state) => getGroups(state)))
      .subscribe((items: GroupData[]) => {
        if (items.length) {
          this.items = items;
        } else {
          this.requestGroups();
        }
      });
  }
}
