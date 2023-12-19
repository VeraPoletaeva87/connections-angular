import { createSelector } from '@ngrx/store';
import { State } from '../state.models';

export const selectGroupsState = (state: State) => state;
export const getGroups = createSelector(
    selectGroupsState,
    (state) => 
    {return state.groupInfo}
);
export const getGroupById = (id: string | undefined) => createSelector(
    selectGroupsState,
    (state) => state.groupInfo.find((item) => item.id.S === id)
);
