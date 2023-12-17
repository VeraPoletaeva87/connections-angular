import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { State } from '../../../redux/state.models';
import { LoginService } from 'src/app/auth/services/login.service';
import { getGroupById } from 'src/app/redux/selectors/groups.selector';
import { FormattedItem, MessageData, MessageResponse, PrivateMessages, UserParams } from 'src/app/shared/types';
import { CountdownService } from '../../services/countdown.service';
import { ActivatedRoute, Router } from '@angular/router';
import { tap } from 'rxjs';
import { getMessagesById } from 'src/app/redux/selectors/messages.selectors';
import { UtilsService } from '../../services/utils.service';
import { HTTPClientService } from 'src/app/core/services/http.service';
import { ToastService } from '../../../core/services/toast.service';
import * as MessagesActions from '../../../redux/actions/messages.actions';
import { ThemeService } from '../../../core/services/theme.service';

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.css'],
  providers: [CountdownService]
})
export class GroupComponent {
  items: MessageData[] = [];
  id: string = '';
  showConfirmation: boolean = false;
    formattedItems: FormattedItem[] =[];
    canDelete: boolean = false;
    isRequesting: boolean = false;
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
    private utilsService: UtilsService,
    private themeService: ThemeService,
    private router: Router,
    private toastService: ToastService,
    private httpService: HTTPClientService,
    private store: Store<State>,
    private route: ActivatedRoute
  ) {}

  updateHandler() {
    this.requestGroupMessages(this.id);
  }

  handleSend(message: string) {
    const formData = {
      groupID: this.id,
      message: message,
    };
    this.httpService
      .simpleRequest('https://tasks.app.rs.school/angular/groups/append', {
        headers: this.httpService.getHeaders(this.params),
        method: 'POST',
        data: formData,
      })
      .then(() => {
        this.toastService.showMessage(
          'success',
          'Message is successfuly sent!'
        );
        this.requestGroupMessages(this.id);
      })
      .catch((message) => {
        this.toastService.showMessage('error', message);
      });
  }

  handleCloseConfirmation() {
    this.showConfirmation = false;
  }

  deleteHandler() {
    this.showConfirmation = true;
  }

  handleDeleteConfirmation() {
    this.httpService
      .simpleRequest(
        `https://tasks.app.rs.school/angular/groups/delete?groupID=${this.id}`,
        {
          headers: this.httpService.getHeaders(this.params),
          method: 'DELETE',
        }
      )
      .then(() => {
        this.toastService.showMessage('success', 'Successfuly delete group!');
        this.showConfirmation = false;
        this.router.navigate(['/main']);
      })
      .catch((message) => {
        this.toastService.showMessage('error', message);
      });
  }

  // update groups list from http request
  requestGroupMessages(id: string) {
    this.isRequesting = true;
    this.httpService
      .jsonRequest<MessageResponse>(
        `https://tasks.app.rs.school/angular/groups/read?groupID=${id}`,
        {
          headers: this.httpService.getHeaders(this.params),
          method: 'GET',
        }
      )
      .then((data: MessageResponse) => {
        this.toastService.showMessage('success', 'Successfuly got messages!');
        this.items = data.Items;
        this.formattedItems =
        this.utilsService.formatItems(this.items, this.params.uid || '') || [];
        if (this.formattedItems.length) {
          this.store.dispatch(MessagesActions.AddMessages({id: this.id, items: this.formattedItems}));
        }
        this.isRequesting = false;
        this.countdownService.startCountdown();
      })
      .catch((message) => {
        this.toastService.showMessage('error', message);
      });
  }

  setCanDelete() {
    this.store
      .select(getGroupById(this.id))
      .pipe(
        tap((item) => {
          if (item) {
            this.canDelete = item?.createdBy.S === this.params.uid;
            localStorage.setItem('canDelete', this.canDelete.toString());
          } else {
            this.canDelete = localStorage.getItem('canDelete') === 'true';
          }
        })
      )
      .subscribe();
  }

  getMessages(id: string) {
    this.store
      .select(getMessagesById(id))
      .subscribe((items: FormattedItem[]) => {
        if (items.length) {
          this.formattedItems = items;
        } else {
          this.requestGroupMessages(this.id);
        }
      });
  }

  ngOnInit() {
    this.params = this.loginService.getUser();
    return this.route.paramMap
      .pipe(
        tap((params) => {
          this.id = params.get('id') || '';
          this.getMessages(this.id);
          this.setCanDelete();
        })
      )
      .subscribe();
  }
}
