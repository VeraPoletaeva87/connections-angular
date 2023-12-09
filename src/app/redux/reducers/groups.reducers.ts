import { createReducer, on } from '@ngrx/store';
import * as Group from '../actions/groups.actions';
import { initialState } from '../state.models';
import { GroupData } from 'src/app/shared/types';

export const groupInfoReducer = createReducer(
  initialState.groupInfo,
  on(Group.AddCustomgroup, (state, { item }) => [...state, item]),
  on(Group.AddGroups, (state, { items }) => items),
  on(Group.DeleteCustomgroup, (state, { id }) => state.filter((item: GroupData) => item.id.S !== id ))
);