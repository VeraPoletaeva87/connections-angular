import { createReducer, on } from '@ngrx/store';
import * as Messages from '../actions/messages.actions';
import { initialState } from '../state.models';

export const messagesReducer = createReducer(
  initialState.messages,
  on(Messages.AddMessages, (state, { items }) => items),
);