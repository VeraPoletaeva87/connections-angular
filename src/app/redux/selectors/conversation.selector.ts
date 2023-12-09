import { createSelector } from '@ngrx/store';
import { State } from '../state.models';

export const selectConversationState = (state: State) => state;
export const getConversations = createSelector(
    selectConversationState,
    (state) => 
    {return state.conversationList}
);