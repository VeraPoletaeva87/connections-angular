import { createReducer, on } from '@ngrx/store';
import * as Group from '../actions/groups.actions';
import { initialState } from '../state.models';
import { GroupInfo } from 'src/app/shared/types';

export const userInfoReducer = createReducer(
  initialState.groupInfo,
  on(Group.AddCustomgroup, (state, { item }) => {
  return { ...state, groupInfo: [...state, item]}
}),
  on(Group.AddGroups, (state, { items }) => { return items }),
  on(Group.DeleteCustomgroup, (state, { item }) => 
  { return { ...state, groupInfo: state.filter((item: GroupInfo) => {return item.data.id.S !== item.data.id.S} ) }})
);