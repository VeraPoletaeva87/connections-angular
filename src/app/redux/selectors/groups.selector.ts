import { createSelector } from '@ngrx/store';
import { State } from '../state.models';

export const selectGroupsState = (state: State) => state;
export const getGroups = createSelector(
    selectGroupsState,
    (state) => 
    {return state.groupInfo}
);