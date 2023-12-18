import { Injectable } from '@angular/core';
import {
  FormattedItem,
  MessageData,
  MessageResponse,
} from 'src/app/shared/types';
import { tap } from 'rxjs';
import { Store } from '@ngrx/store';
import { getPersonByID } from 'src/app/redux/selectors/people.selector';
import { State } from 'src/app/redux/state.models';
import * as MessagesActions from '../../redux/actions/messages.actions';

@Injectable({
  providedIn: 'root',
})
export class UtilsService {
  personName: string = '';
  formattedItems: FormattedItem[] = [];

  constructor(private store: Store<State>) {}

  // returns messages in a readable format
  getFormatted(items: MessageData[], id: string): FormattedItem[] {
    items.forEach((item) => {
      let newItem = {
        name: '',
        milliseconds: 0,
        date: '',
        message: '',
      };
      if (item.authorID.S === id) {
        newItem.name = 'Me';
      } else {
        newItem.name = this.personName;
      }
      newItem.milliseconds = +item.createdAt.S;
      newItem.date = new Date(+item.createdAt.S).toLocaleString();
      newItem.message = item.message.S;
      this.formattedItems.push(newItem);
    });

    return this.formattedItems;
  }

  //change iud to user name or me and format date
  formatItems(items: MessageData[], id: string): FormattedItem[] {
    const personId = items.filter((item) => item.authorID.S !== id).at(0)
      ?.authorID.S;
    this.formattedItems = [];
    const sortedItems = items.sort((a, b) => +a.createdAt.S - +b.createdAt.S);
    // if not only mine messages
    if (personId) {
      this.store
        .select(getPersonByID(personId))
        .pipe(
          tap((item) => {
            if (item) {
              this.personName = item?.name.S;
            } else {
              this.personName = 'user';
            }
            return this.getFormatted(sortedItems, id);
          })
        )
        .subscribe();
    } else {
      return this.getFormatted(sortedItems, id);
    }
    return this.formattedItems;
  }

  // returns time of the last message in milliseconds
  getLastMessageTime(items: FormattedItem[]): number {
    const times = items.map((item) => item.milliseconds);
    return Math.max(...times);
  }

  // format and add new items to list and to store or save all items if store is empty
  setNewItems(
    data: MessageResponse,
    formatted: FormattedItem[],
    id: string | null,
    conversation: string
  ): FormattedItem[] {
    const items = data?.Items;
    let resultItems = formatted;
    if (items.length) {
      if (formatted.length) {
        const newItems = this.formatItems(items, id || '');
        const res = formatted.concat(newItems);
        resultItems = res;
        this.store.dispatch(
          MessagesActions.AddMessages({ id: conversation, items: newItems })
        );
      } else {
        resultItems = this.formatItems(items, id || '');
        this.store.dispatch(
          MessagesActions.AddMessages({ id: conversation, items: resultItems })
        );
      }
    }

    return resultItems;
  }
}
