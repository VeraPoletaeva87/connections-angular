import { createSelector } from '@ngrx/store';
import { State } from '../state.models';

export const selectPeopleState = (state: State) => state;
export const getPeople = createSelector(
    selectPeopleState,
    (state) => 
    {return state.peopleList}
);

export const getPersonByID = (id: string | undefined) => createSelector(
    selectPeopleState,
    (state) => state.peopleList.find((item) => item.uid.S === id)
);