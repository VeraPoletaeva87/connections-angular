import { createSelector } from '@ngrx/store';
import { State } from '../state.models';

export const selectMessagesState = (state: State) => state;
export const getMessages = createSelector(
    selectMessagesState,
    (state) => 
    {return state.messages}
);