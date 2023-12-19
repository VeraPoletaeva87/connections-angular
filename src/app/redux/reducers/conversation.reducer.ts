import { createReducer, on } from '@ngrx/store';
import * as Conversation from '../actions/conversation.actions';
import { initialState } from '../state.models';
import { ConversationData } from 'src/app/shared/types';

export const conversationReducer = createReducer(
  initialState.conversationList,
  on(Conversation.AddConversation, (state, { item }) => 
  {
    return {
      ...state,
      items: [...state.items, item],
      fetched: true
    }
  }),
  on(Conversation.AddConversations, (state, { items }) => 
  {
    return {
      ...state,
      items: items,
      fetched: true
    }
  }),
  on(Conversation.DeleteConversation, (state, { id }) => 
  {
    const prev = state.items.length;
    return {
      ...state,
      items: state.items.filter((item: ConversationData) => item.id.S !== id ),
      fetched: true
    }
  })
);