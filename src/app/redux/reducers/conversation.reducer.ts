import { createReducer, on } from '@ngrx/store';
import * as Conversation from '../actions/conversation.actions';
import { initialState } from '../state.models';
import { ConversationData } from 'src/app/shared/types';

export const conversationReducer = createReducer(
  initialState.conversationList,
  on(Conversation.AddConversation, (state, { item }) => [...state, item]),
  on(Conversation.AddConversations, (state, { items }) => items),
  on(Conversation.DeleteConversation, (state, { id }) => state.filter((item: ConversationData) => item.id.S !== id ))
);