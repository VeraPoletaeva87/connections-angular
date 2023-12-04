import { createReducer, on } from '@ngrx/store';
import * as CustomVideoData from '../actions/videoList.actions';
import {  WholeDataCustom } from 'src/app/shared/types';
import { initialState } from '../state.models';


export const customVideoReducer = createReducer(
  initialState.customVideos,
  on(CustomVideoData.AddCustomVideo, (state, {item}) => {
    if (state.videoList.length > 0) {
      localStorage.setItem("customCards", JSON.stringify([...state.videoList, item])); 
    }
    
    return { ...state, videoList: [...state.videoList, item]}
  }),
  on(CustomVideoData.DeleteCustomVideo, (state, props) => 
      { return { ...state, videoList: state.videoList.filter((item: WholeDataCustom) => {return item.id !== props.id} ) }})
);