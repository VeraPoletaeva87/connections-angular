import { Component } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { State } from '../../../redux/state.models';
import { LoginService } from 'src/app/auth/services/login.service';
import { getGroupById, getGroups } from 'src/app/redux/selectors/groups.selector';
import { FormattedItem, GroupData, MessageData, UserParams } from 'src/app/shared/types';
import { CountdownService } from '../../services/countdown.service';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap, tap } from 'rxjs';
import { getMessages } from 'src/app/redux/selectors/messages.selectors';
import { UtilsService } from '../../services/utils.service';

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.css'],
})
export class GroupComponent {
  toastMessage: string = '';
  isToastVisible: boolean = false;
  mode: string = '';
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
      private countdownService: CountdownService,
      private utilsService: UtilsService,
      private router: Router,
      private store: Store<State>,
      private route: ActivatedRoute
    ) {}

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
  
    updateHandler() {
      this.requestGroupMessages(this.id);
    }

    handleSend(message: string) {  
      const formData = {
        groupID: this.id,
        message: message,
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
                  this.toastMessage = message;
                  this.showToast('error');
                });
            } else {
              this.toastMessage = 'Message is successfuly sent!';
              this.showToast('success');
            }
        });
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
                this.toastMessage = message;
                this.showToast('error');
              });
      } else {
          this.toastMessage = 'Successfuly delete conversation!';
          this.showToast('success');
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
                  this.toastMessage = message;
                  this.showToast('error');
                });
        } else {
          response.clone().json()
            .then((data) => {
              this.toastMessage = 'Successfuly got messages!';
              this.showToast('success');
              this.items = data.Items;
              this.formattedItems = this.utilsService.formatItems(this.items, this.params.uid || '') || [];
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
