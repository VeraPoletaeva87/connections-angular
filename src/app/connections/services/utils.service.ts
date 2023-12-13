import { Injectable } from '@angular/core';
import { FormattedItem, MessageData } from 'src/app/shared/types';
import { tap } from 'rxjs';
import { Store } from '@ngrx/store';
import { getPersonByID } from 'src/app/redux/selectors/people.selector';
import { State } from 'src/app/redux/state.models';

@Injectable({
    providedIn: 'root'
})

export class UtilsService {
    personName: string = '';
    formattedItems: FormattedItem[] = [];

    constructor(
        private store: Store<State>
    ) {}
    
    getFormatted(items: MessageData[], id: string): FormattedItem[] {
        items.forEach(item => {
          let newItem ={
              name:'',
              date: '',
              message: ''
          };
          if (item.authorID.S === id) {
              newItem.name = 'Me';
          } else {
            newItem.name = this.personName;
          }
          newItem.date = new Date(+item.createdAt.S).toLocaleString();
          newItem.message = item.message.S;
          this.formattedItems.push(newItem);
      });

        return this.formattedItems;
      }
  
    //change iud to user name or me and format date
    formatItems(items: MessageData[], id: string) {
        const personId = items.filter((item) => item.authorID.S !== id).at(0)?.authorID.S; 
        this.formattedItems = [];
  
        // if not only mine messages
        if (personId) {
          this.store.select(getPersonByID(personId)).pipe(
            tap((item) => {
              if (item) {
                this.personName = item?.name.S;
              } else {
                this.personName = 'user';
              }
              return this.getFormatted(items, id);
            })
          )
        .subscribe(); 
        } else {
          return this.getFormatted(items, id);
        }
        return this.formattedItems;
      }

}