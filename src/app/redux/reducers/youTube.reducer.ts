import { createReducer, on } from '@ngrx/store';
import * as YouTube from '../actions/youTube.actions';
import { initialState } from '../state.models';
import { WholeDataCustom } from 'src/app/shared/types';

export const youTubeReducer = createReducer(
  initialState.youTubeVideos,
  on(YouTube.LoadItems, (state) => { return { ...state, loading: true }}),
  on(YouTube.LoadItemsSuccess, (state, { items }) => { return { ...state, videoList: [...items], loading: false }}),
  on(YouTube.AddToFavorites, (state, { item }) => { return { ...state, 
      videoList: state.videoList.map((elem: WholeDataCustom) => {
        return elem.id === item.id ? {...elem, favorite: item.favorite} : elem
      }) 
    }}),
  on(YouTube.DeleteCustomVideo, (state, props) => 
    { return { ...state, videoList: state.videoList.filter((item: WholeDataCustom) => {return item.id !== props.id} ) }})
);