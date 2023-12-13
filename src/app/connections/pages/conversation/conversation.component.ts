import { Component } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { State } from '../../../redux/state.models';
import { LoginService } from 'src/app/auth/services/login.service';
import { FormattedItem, MessageData, MessageResponse, UserParams } from 'src/app/shared/types';
import { CountdownService } from '../../services/countdown.service';
import { ActivatedRoute, Router } from '@angular/router';
import { tap } from 'rxjs';
import { getMessages } from 'src/app/redux/selectors/messages.selectors';
import { getPersonByID } from 'src/app/redux/selectors/people.selector';
import * as MessagesActions from '../../../redux/actions/messages.actions';
import { HTTPClientService } from 'src/app/core/services/http.service';
import { UtilsService } from '../../services/utils.service';

@Component({
  selector: 'app-conversation',
  templateUrl: './conversation.component.html',
  styleUrls: ['./conversation.component.css'],
})
export class ConversationComponent {
  toastMessage: string = '';
  isToastVisible: boolean = false;
  personName: string = '';
  mode: string = '';
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
  
  constructor(
    private loginService: LoginService,
    private countdownService: CountdownService,
    private httpService: HTTPClientService,
    private router: Router,
    private utilsService: UtilsService,
    private store: Store<State>,
    private route: ActivatedRoute
  ) {}

  updateHandler() {
    this.requestMessages(this.id);
  }

  showToast(mode: string) {
    this.mode = mode;
    this.isToastVisible = true;
    setTimeout(() => {
      this.hideToast();
    }, 3000);
  }
  
  hideToast() {
    this.isToastVisible = false;
  }

// example() {
//   request<Record<string, string>, unknown>('https://tasks.app.rs.school/angular/conversations/append', 
//   {
//      headers: {
//        'rs-uid': this.params.uid || '',
//        'rs-email': this.params.email || '',
//        'Authorization': 'Bearer '+ this.params.token,
//      },
//      method: "POST",
//      data: formData // TODO
//  }).then(() => {
//   this.toastMessage = 'Message is successfuly sent!';
//   this.showToast('success');
//   this.createMessageForm.controls.message.reset();
//   this.requestMessages(this.id);
//  }).catch((message) => {
//   this.toastMessage = message;
//   this.showToast('error');
//  })
// }

    getHeaders() {
      return {
        'rs-uid': this.params.uid || '',
        'rs-email': this.params.email || '',
        'Authorization': 'Bearer '+ this.params.token,
      };
    }


    handleSend(message: string) {  
        const formData = {
           conversationID: this.id,
           message: message,
        }
        this.httpService.simpleRequest('https://tasks.app.rs.school/angular/conversations/append', 
        {
           headers: this.getHeaders(),
           method: "POST",
           data: formData 
       }).then(() => {
        this.toastMessage = 'Message is successfuly sent!';
        this.showToast('success');
        this.requestMessages(this.id);
       }).catch((message) => {
        this.toastMessage = message;
        this.showToast('error');
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
           headers: this.getHeaders(),
           method: "DELETE"
       }).then(() => {
        this.toastMessage = 'Successfuly delete conversation!';
        this.showToast('success');
        this.showConfirmation = false;
        this.router.navigate(['/main']);
       }).catch((message) => {
        this.toastMessage = message;
        this.showToast('error');
       });
    }
  
    // update groups list from http request
    requestMessages(id: string) {
      this.isRequesting = true;
      this.httpService.jsonRequest<MessageResponse>(`https://tasks.app.rs.school/angular/conversations/read?conversationID=${id}`, 
      {
         headers: this.getHeaders(),
         method: "GET",
     }).then((data: MessageResponse) => {
      this.toastMessage = 'Successfuly got messages!';
      this.showToast('success');
      this.items = data?.Items;
      if (this.items.length) {
        this.formattedItems = this.utilsService.formatItems(this.items, this.params.uid || '') || [];
        this.store.dispatch(MessagesActions.AddMessages({items: this.items}));
      }
      this.isRequesting = false;
      this.countdownService.startCountdown();
     }).catch((message) => {
      this.toastMessage = message;
      this.showToast('error');
     });
    }
  
    ngOnInit() {
      this.params = this.loginService.getUser();
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
     
      return this.store
     .pipe(
       select((state) => getMessages(state))
       ).subscribe((items: MessageData[]) => {
           if (items.length) {
               this.items = items;
            }
            this.route.paramMap.pipe(
              tap((params) => {
                this.id = params.get('id') || '';
                if (!this.items.length) {
                  this.requestMessages(this.id);
                }
              })).subscribe();
       }) 
  }
}
