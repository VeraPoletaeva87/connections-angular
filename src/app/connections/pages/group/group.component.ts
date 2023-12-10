import { Component } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { State } from '../../../redux/state.models';
import { LoginService } from 'src/app/auth/services/login.service';
import { getGroupById, getGroups } from 'src/app/redux/selectors/groups.selector';
import { GroupData, MessageData, UserParams } from 'src/app/shared/types';
import { CountdownService } from '../../services/countdown.service';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap, tap } from 'rxjs';
import { getMessages } from 'src/app/redux/selectors/messages.selectors';
import { AbstractControl, FormControl, NonNullableFormBuilder, Validators } from '@angular/forms';

export interface FormattedItem {
    name: string,
    date: string,
    message: string
}

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.css'],
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
  
    constructor(
      private loginService: LoginService,
      private formBuilder: NonNullableFormBuilder,
      private countdownService: CountdownService,
      private router: Router,
      private store: Store<State>,
      private route: ActivatedRoute
    ) {}

    createMessageForm = this.formBuilder.group({
        message: new FormControl('', [Validators.required]),
      });
    
      get message(): AbstractControl<string | null> | null { return this.createMessageForm.get('message'); }
  
    updateHandler() {
      this.requestGroupMessages(this.id);
    }

    sendHandler() {
    if (!this.createMessageForm.invalid) {    
        const formData = {
           groupID: this.id,
           message: this.createMessageForm.controls.message.value,
        }
        fetch('https://tasks.app.rs.school/angular/groups/append', 
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

    handleCloseConfirmation() {
      this.showConfirmation = false;
    }
  
    deleteHandler() {
      this.showConfirmation = true;
    }
  
    handleDeleteConfirmation() {
      fetch(`https://tasks.app.rs.school/angular/conversations/delete?conversationID=${this.id}`, 
      {
        headers: {
          'rs-uid': this.params.uid || '',
          'rs-email': this.params.email || '',
          'Authorization': 'Bearer '+ this.params.token
      },
        method: "DELETE"
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
          this.loginService.openSuccess('Successfuly delete conversation!');
          this.showConfirmation = false;
          this.router.navigate(['/main']);
      }
  });
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
            newItem.date = new Date(+item.createdAt.S).toLocaleString();
            newItem.message = item.message.S;
            this.formattedItems.push(newItem);
        });
    }
  
    // update groups list from http request
    requestGroupMessages(id: string) {
      this.isRequesting = true;
       fetch(` https://tasks.app.rs.school/angular/groups/read?groupID=${id}`, 
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
                     this.requestGroupMessages(this.id);
                     this.setCanDelete();
                    })).subscribe();
             }
       }) 
    }
}
