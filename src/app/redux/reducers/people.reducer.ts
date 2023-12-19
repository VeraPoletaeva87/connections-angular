import { createReducer, on } from '@ngrx/store';
import * as People from '../actions/people.actions';
import { initialState } from '../state.models';
import { PeopleInfo } from 'src/app/shared/types';

export const peopleInfoReducer = createReducer(
  initialState.peopleList,
  on(People.AddPeople, (state, { items }) => items)
);