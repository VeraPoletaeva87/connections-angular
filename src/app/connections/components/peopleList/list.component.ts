import { Component } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { LoginService } from '../../../auth/services/login.service';
import { State } from '../../../redux/state.models';
import {
  UserParams,
  PeopleInfo,
  ConversationData,
  PeopleResponse,
  ConversationResponse,
} from '../../../shared/types';
import * as PeopleActions from '../../../redux/actions/people.actions';
import * as ConversationActions from '../../../redux/actions/conversation.actions';
import { CountdownService } from '../../services/countdown.service';
import { getPeople } from 'src/app/redux/selectors/people.selector';
import { Router } from '@angular/router';
import { ToastService } from '../../../core/services/toast.service';
import { ThemeService } from '../../../core/services/theme.service';
import { HTTPClientService } from 'src/app/core/services/http.service';
import { getConversations } from 'src/app/redux/selectors/conversation.selector';

@Component({
  selector: 'app-peoplelist',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
  providers: [CountdownService],
})
export class PeopleListComponent {
  items: PeopleInfo[] = [];
  conversationItems: ConversationData[] = [];
  companionIDs: string[] = [];
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
    private toastService: ToastService,
    private themeService: ThemeService,
    private httpService: HTTPClientService,
    private router: Router,
    private store: Store<State>
  ) {}

  updateHandler() {
    this.requestPeople();
  }

  itemClickHandler(item: PeopleInfo) {
    // create conversation if there is no one and redirect to conversation
    if (this.companionIDs.includes(item.uid.S)) {
      this.router.navigate([`/conversation/${item.uid.S}`]);
    } else {
      const formData = {
        companion: item.uid.S,
      };

      fetch('https://tasks.app.rs.school/angular/conversations/create', {
        headers: {
          'rs-uid': this.params.uid || '',
          'rs-email': this.params.email || '',
          Authorization: 'Bearer ' + this.params.token,
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
          response.clone().json()
            .then((data) => {
              this.toastService.showMessage('success', 'Successfuly added a new conversation!');
              this.router.navigate([`/conversation/${data.conversationID}`]);
            });
        }
      });
    }
  }

  // update people list from store
  updatePeopleFromStore() {
    return this.store
      .pipe(select((state) => getPeople(state)))
      .subscribe((items: PeopleInfo[]) => {
        this.items = items;
      });
  }

  // update people list from http request
  requestPeople() {
    this.isRequesting = true;
    this.httpService
    .jsonRequest<PeopleResponse>(
      'https://tasks.app.rs.school/angular/users',
      {
        headers: this.httpService.getHeaders(this.params),
        method: 'GET',
      }
    )
    .then((data: PeopleResponse) => {
      this.toastService.showMessage('success', 'Successfuly got people list!');
      this.items = data.Items.filter((item: PeopleInfo) => item.uid.S !== this.params.uid);
      this.store.dispatch(PeopleActions.AddPeople({ items: this.items }));
      this.requestConversations();
      this.isRequesting = false;
      this.countdownService.startCountdown();
    })
    .catch((message) => {
      this.toastService.showMessage('error', message);
    });
  }

  // update covnersation list from http request
  requestConversations() {
    this.httpService.jsonRequest<ConversationResponse>(
      'https://tasks.app.rs.school/angular/conversations/list',
      {
        headers: this.httpService.getHeaders(this.params),
        method: 'GET',
      }
    )
    .then((data: ConversationResponse) => {
      this.conversationItems = data.Items;
      this.companionIDs = this.conversationItems.map((item) => item.companionID.S);
      this.store.dispatch(ConversationActions.AddConversations({items: this.conversationItems}));
    })
    .catch((message) => {
      this.toastService.showMessage('error', message);
    });
  }

  getConversations() {
    return this.store
      .select((state) => getConversations(state))
      .subscribe((items: ConversationData[]) => {
        if (items.length) {
          this.conversationItems = items;
          this.companionIDs = this.conversationItems.map((item) => item.companionID.S);
        } else {
          this.requestConversations();
        }
      });
  }

  ngOnInit() {
    this.params = this.loginService.getUser();
    return this.store
      .pipe(select((state) => getPeople(state)))
      .subscribe((items: PeopleInfo[]) => {
        if (items.length) {
          this.items = items;
        } else {
          this.requestPeople();
        }
        this.getConversations();
      });
  }
}
