import { createSelector } from '@ngrx/store';
import { State } from '../state.models';

export const selectYouTubeVideoState = (state: State) => state.youTubeVideos;
export const getItems = createSelector(
    selectYouTubeVideoState,
    (state) => 
    {return state.videoList}
);

export const getDetails = (id: string | undefined) =>
  createSelector(
    selectYouTubeVideoState, 
    (state) => 
    { return state.videoList.find((item) => item.id === id)})