import { createSelector } from '@ngrx/store';
import { State } from '../state.models';

export const selectUserState = (state: State) => state;
export const getUserInfo = createSelector(
    selectUserState,
    (state) => 
    {return state.userInfo}
);