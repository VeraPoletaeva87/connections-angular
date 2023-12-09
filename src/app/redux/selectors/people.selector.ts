import { createSelector } from '@ngrx/store';
import { State } from '../state.models';

export const selectGroupsState = (state: State) => state;
export const getPeople = createSelector(
    selectGroupsState,
    (state) => 
    {return state.peopleList}
);