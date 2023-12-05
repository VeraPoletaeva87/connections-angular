import { createReducer, on } from '@ngrx/store';
import * as User from '../actions/userInfo.actions';
import { initialState } from '../state.models';
import { UserData } from 'src/app/shared/types';

export const userInfoReducer = createReducer(
  initialState.userInfo,
  on(User.AddUserInfo, (state, { item }) => { return item })
);