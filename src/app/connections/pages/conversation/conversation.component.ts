import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { State } from '../../../redux/state.models';
import { LoginService } from 'src/app/auth/services/login.service';
import { FormattedItem, MessageData, MessageResponse, UserParams } from 'src/app/shared/types';
import { CountdownService } from '../../services/countdown.service';
import { ActivatedRoute, Router } from '@angular/router';
import { tap } from 'rxjs';
import { getMessagesById } from 'src/app/redux/selectors/messages.selectors';
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

  // get only new messages if update on button on conversation page
  updateHandler() {
    this.requestMessages(this.id, this.utilsService.getLastMessageTime(this.formattedItems));
  }

  // get only new messages after sending
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
      this.requestMessages(this.id, this.utilsService.getLastMessageTime(this.formattedItems));
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
  
  // delete conversation and redirect to main page
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
  requestMessages(id: string, since?: number) {
    this.isRequesting = true;
    let url = `https://tasks.app.rs.school/angular/conversations/read?conversationID=${id}`;
    this.isRequesting = true;
    if (since) {
      url = `https://tasks.app.rs.school/angular/conversations/read?conversationID=${id}&since=${since}`;
    }
    this.httpService.jsonRequest<MessageResponse>(url, 
    {
      headers: this.httpService.getHeaders(this.params),
      method: "GET",
    }).then((data: MessageResponse) => {
      this.toastService.showMessage('success', 'Successfuly got messages!');
      this.formattedItems = this.utilsService.setNewItems(data, this.formattedItems, this.params.uid || '', this.id);
      this.isRequesting = false;
      this.countdownService.startCountdown();
    }).catch((message) => {
      this.toastService.showMessage('error', message);
    });
  }

  // save new or all messages depending on stored items
  getMessages(id: string) {
    this.store.select(getMessagesById(id)).pipe().
    subscribe((items: FormattedItem[]) => {
      if (items.length) {
        this.formattedItems = items;
        this.requestMessages(this.id, this.utilsService.getLastMessageTime(this.formattedItems));
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
