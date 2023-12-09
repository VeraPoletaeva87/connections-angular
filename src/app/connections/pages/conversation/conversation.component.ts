import { Component } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { State } from '../../../redux/state.models';
import { LoginService } from 'src/app/auth/services/login.service';
import { getGroups } from 'src/app/redux/selectors/groups.selector';
import { GroupData, MessageData, UserParams } from 'src/app/shared/types';
import { CountdownService } from '../../services/countdown.service';
import { ActivatedRoute } from '@angular/router';
import { switchMap, tap } from 'rxjs';
import { getMessages } from 'src/app/redux/selectors/messages.selectors';
import { AbstractControl, FormControl, NonNullableFormBuilder, Validators } from '@angular/forms';

export interface FormattedItem {
    name: string,
    date: string,
    message: string
}

@Component({
  selector: 'app-conversation',
  templateUrl: './conversation.component.html',
  styleUrls: ['./conversation.component.css'],
})
export class ConversationComponent {
    items: MessageData[] = []; 
    id: string = '';
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
      private formBuilder: NonNullableFormBuilder,
      private countdownService: CountdownService,
      private store: Store<State>,
      private route: ActivatedRoute
    ) {}

    createMessageForm = this.formBuilder.group({
        message: new FormControl('', [Validators.required]),
      });
    
      get message(): AbstractControl<string | null> | null { return this.createMessageForm.get('message'); }
  
    updateHandler() {
      this.requestMessages(this.id);
    }

    sendHandler() {
    if (!this.createMessageForm.invalid) {    
        const formData = {
           conversationID: this.id,
           message: this.createMessageForm.controls.message.value,
        }
        fetch('https://tasks.app.rs.school/angular/conversations/append', 
            {
               headers: {
                 'rs-uid': this.params.uid || '',
                 'rs-email': this.params.email || '',
                 'Authorization': 'Bearer '+ this.params.token,
                 'Accept': 'application/json',
                 'Content-Type': 'application/json'
               },
               method: "POST",
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
                this.loginService.openSuccess('Message is successfuly sent!');
                this.createMessageForm.controls.message.reset();
             }
         });
    } else {
        this.createMessageForm.markAllAsTouched();
    } 
    }

    deleteHandler() {

    }
  
    // update groups list from store
    updaterequestMessagesFromStore() {
      return this.store
      .pipe(
        select((state) => getMessages(state))
        ).subscribe((items: MessageData[]) => {
            this.items = items;
        }) 
    }

    //chage iud to user name or me and format date
    formatItems() {
        this.formattedItems = [];
        this.items.forEach(item => {
            let newItem ={
                name:'',
                date: '',
                message: ''
            };
            if (item.authorID.S === this.params.uid) {
                newItem.name = 'Me';
            } else {

            }
            newItem.date = new Date(+item.createdAt.S).toDateString();
            newItem.message = item.message.S;
            this.formattedItems.push(newItem);
        });
    }
  
    // update groups list from http request
    requestMessages(id: string) {
      this.isRequesting = true;
       fetch(`https://tasks.app.rs.school/angular/conversations/read?conversationID=${id}`, 
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
                  this.loginService.openError(message);
                });
        } else {
          response.clone().json()
            .then((data) => {
              this.loginService.openSuccess('Successfuly got messages!');
              this.items = data.Items;
              this.formatItems();
             // this.store.dispatch(GroupActions.AddGroups({items: this.items}));
              this.isRequesting = false;
              this.countdownService.startCountdown();
            });
        }
    });
    }
  
    ngOnInit() {
      this.params = this.loginService.getUser();
      return this.store
     .pipe(
       select((state) => getMessages(state))
       ).subscribe((items: MessageData[]) => {
           if (items.length) {
               this.items = items;
             } else {
                this.route.paramMap.pipe(
                    tap((params) => {
                      this.id = params.get('id') || '';
                      this.requestMessages(this.id);
                    })).subscribe();
               
             }
       }) 
    }
}
