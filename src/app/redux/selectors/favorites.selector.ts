import { createSelector } from '@ngrx/store';
import { selectYouTubeVideoState } from './youTube.selector';

export const getItems = createSelector(
    selectYouTubeVideoState,
    (state) => 
    {return state.videoList.filter((item) => item.favorite === true)} 
);