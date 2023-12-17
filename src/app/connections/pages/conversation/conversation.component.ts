import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { State } from '../../../redux/state.models';
import { LoginService } from 'src/app/auth/services/login.service';
import { FormattedItem, MessageData, MessageResponse, UserParams } from 'src/app/shared/types';
import { CountdownService } from '../../services/countdown.service';
import { ActivatedRoute, Router } from '@angular/router';
import { tap } from 'rxjs';
import { getMessagesById } from 'src/app/redux/selectors/messages.selectors';
import * as MessagesActions from '../../../redux/actions/messages.actions';
import { HTTPClientService } from 'src/app/core/services/http.service';
import { UtilsService } from '../../services/utils.service';
import { ToastService } from '../../../core/services/toast.service';
import { ThemeService } from 'src/app/core/services/theme.service';

@Component({
  selector: 'app-conversation',
  templateUrl: './conversation.component.html',
  styleUrls: ['./conversation.component.css'],
  providers: [CountdownService]
})
export class ConversationComponent {
  personName: string = '';
  items: MessageData[] = []; 
  id: string = '';
  showConfirmation: boolean = false;
  formattedItems: FormattedItem[] =[];
  isRequesting: boolean = false;
  params: UserParams = {
    uid: '',
    email: '',
    token: ''
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
    private themeService: ThemeService,
    private httpService: HTTPClientService,
    private toastService: ToastService,
    private router: Router,
    private utilsService: UtilsService,
    private store: Store<State>,
    private route: ActivatedRoute
  ) {}

  updateHandler() {
    this.requestMessages(this.id);
  }

  handleSend(message: string) {  
    const formData = {
      conversationID: this.id,
      message: message,
    }
    this.httpService.simpleRequest('https://tasks.app.rs.school/angular/conversations/append', 
    {
      headers: this.httpService.getHeaders(this.params),
      method: "POST",
      data: formData 
    }).then(() => {
      this.toastService.showMessage('success', 'Message is successfuly sent!');
      this.requestMessages(this.id);
    }).catch((message) => {
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
    this.httpService.simpleRequest(`https://tasks.app.rs.school/angular/conversations/delete?conversationID=${this.id}`, 
    {
      headers: this.httpService.getHeaders(this.params),
      method: "DELETE"
    }).then(() => {
      this.toastService.showMessage('success', 'Successfuly delete conversation!');
      this.showConfirmation = false;
      this.router.navigate(['/main']);
    }).catch((message) => {
      this.toastService.showMessage('error', message);
    });
  }
  
    // update groups list from http request
  requestMessages(id: string) {
    this.isRequesting = true;
    this.httpService.jsonRequest<MessageResponse>(`https://tasks.app.rs.school/angular/conversations/read?conversationID=${id}`, 
    {
      headers: this.httpService.getHeaders(this.params),
      method: "GET",
    }).then((data: MessageResponse) => {
      this.toastService.showMessage('success', 'Successfuly got messages!');
      this.items = data?.Items;
      if (this.items.length) {
        this.formattedItems = this.utilsService.formatItems(this.items, this.params.uid || '') || [];
        this.store.dispatch(MessagesActions.AddMessages({ id: this.id, items: this.formattedItems }));
      }
      this.isRequesting = false;
      this.countdownService.startCountdown();
    }).catch((message) => {
      this.toastService.showMessage('error', message);
    });
  }

  getMessages(id: string) {
    this.store.select(getMessagesById(id)).pipe().
    subscribe((items: FormattedItem[]) => {
      if (items.length) {
        this.formattedItems = items;
      } else {
        this.requestMessages(this.id);
      }
    });
  }
  
  ngOnInit() {  
    this.params = this.loginService.getUser();
    return this.route.paramMap.pipe(
      tap((params) => {
        this.id = params.get('id') || '';
        this.getMessages(this.id);
      })).subscribe();
  }
}
  
  //  ngOnInit() {
    //  this.params = this.loginService.getUser();
      // this.items = [{
      //   authorID: {
      //     S: 'qbkcou256a'
      //   },
      //   message: {
      //     S: 'hi'
      //   },
      //   createdAt: {
      //     S: '5555555' 
      //   }
      // },
      // {
      //   authorID: {
      //     S: this.params.uid?.toString() || ''
      //   },
      //   message: {
      //     S: 'hfffffffi'
      //   },
      //   createdAt: {
      //     S: '5555555' 
      //   }
      // },
      // {
      //   authorID: {
      //     S: 'qbkcou256a'
      //   },
      //   message: {
      //     S: 'aeqweqeq sffewer ukkiluik'
      //   },
      //   createdAt: {
      //     S: '5555555' 
      //   }
      // },
      // {
      //   authorID: {
      //     S: 'qbkcou256a'
      //   },
      //   message: {
      //     S: 'fgfdgdsfgdfgdsss'
      //   },
      //   createdAt: {
      //     S: '5555555' 
      //   }
      // }];
      // this.formatItems();
 // }
