import { createSelector } from '@ngrx/store';
import { State } from '../state.models';

export const selectCustomVideoState = (state: State) => state.customVideos;
export const getItems = createSelector(
    selectCustomVideoState,
    (state) => 
    {return state.videoList}
);