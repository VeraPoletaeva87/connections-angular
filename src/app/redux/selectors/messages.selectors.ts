import { createSelector } from '@ngrx/store';
import { State } from '../state.models';

export const selectMessagesState = (state: State) => state;
export const getMessages = createSelector(
    selectMessagesState,
    (state) => 
    {return state.messages}
);

export const getMessagesById = (id: string) => createSelector(
    selectMessagesState,
    (state) => state.messages[id] || []
);