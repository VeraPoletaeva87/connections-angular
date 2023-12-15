import { Component } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { State } from '../../../redux/state.models';
import { LoginService } from 'src/app/auth/services/login.service';
import { getGroupById, getGroups } from 'src/app/redux/selectors/groups.selector';
import { FormattedItem, GroupData, MessageData, MessageResponse, PrivateMessages, UserParams } from 'src/app/shared/types';
import { CountdownService } from '../../services/countdown.service';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap, tap } from 'rxjs';
import { getMessages, getMessagesById } from 'src/app/redux/selectors/messages.selectors';
import { UtilsService } from '../../services/utils.service';
import { HTTPClientService } from 'src/app/core/services/http.service';
import { ToastService } from '../../../core/services/toast.service';
import * as MessagesActions from '../../../redux/actions/messages.actions';

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
      private utilsService: UtilsService,
      private router: Router,
      private toastService: ToastService,
      private httpService: HTTPClientService,
      private store: Store<State>,
      private route: ActivatedRoute
    ) {}
  
    updateHandler() {
      this.requestGroupMessages(this.id);
    }

    getHeaders() {
      return {
        'rs-uid': this.params.uid || '',
        'rs-email': this.params.email || '',
        'Authorization': 'Bearer '+ this.params.token,
      };
    }

    handleSend(message: string) { 
      const formData = {
        groupID: this.id,
        message: message,
      }
     this.httpService.simpleRequest('https://tasks.app.rs.school/angular/groups/append', 
     {
        headers: this.getHeaders(),
        method: "POST",
        data: formData 
    }).then(() => {
      this.toastService.showMessage('success', 'Message is successfuly sent!');
      this.requestGroupMessages(this.id);
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
      this.httpService.simpleRequest(`https://tasks.app.rs.school/angular/groups/delete?groupID=${this.id}`, 
      {
          headers: this.getHeaders(),
          method: "DELETE"
      }).then(() => {
        this.toastService.showMessage('success', 'Successfuly delete group!');
        this.showConfirmation = false;
        this.router.navigate(['/main']);
      }).catch((message) => {
        this.toastService.showMessage('error', message);
      });
    }
   
    // // update groups list from store
    // updaterequestMessagesFromStore() {
    //   return this.store
    //   .pipe(
    //     select((state) => getMessagesById(state))
    //     ).subscribe((items: MessageData[]) => {
    //         this.items = items;
    //     }) 
    // }
  
    // update groups list from http request
  requestGroupMessages(id: string) {
    this.isRequesting = true;
    this.httpService.jsonRequest<MessageResponse>(`https://tasks.app.rs.school/angular/groups/read?groupID=${id}`, 
    {
      headers: this.getHeaders(),
      method: "GET",
    }).then((data: MessageResponse) => {
      this.toastService.showMessage('success', 'Successfuly got messages!');
      this.items = data.Items;
      this.formattedItems = this.utilsService.formatItems(this.items, this.params.uid || '') || [];
      this.store.dispatch(MessagesActions.AddMessages({ id: this.id, items: this.formattedItems }));
      this.isRequesting = false;
      this.countdownService.startCountdown();
    }).catch((message) => {
      this.toastService.showMessage('error', message);
    });
  }

    setCanDelete() {
     this.store.select(getGroupById(this.id)).pipe(
            tap((item) => {
              if (item) {
                this.canDelete = item?.createdBy.S === this.params.uid;
              }
            })
          )
        .subscribe();    
    }

    getMessages(id: string) {
      this.store.select(getMessagesById(id)).pipe(
       ).subscribe((items: FormattedItem[]) => {
           if (items.length) {
               this.formattedItems = items;
             } else {
              this.requestGroupMessages(this.id);
            }
          });
    }
  
    ngOnInit() { 
      this.params = this.loginService.getUser();
      return this.route.paramMap.pipe(
                    tap((params) => {
                      this.id = params.get('id') || '';
                      this.getMessages(this.id);
                      this.setCanDelete();
                    })).subscribe();
    }
}
