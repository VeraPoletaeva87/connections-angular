import { createAction, props } from '@ngrx/store';
import { WholeDataCustom } from 'src/app/shared/types';
 
export const LoadItems = createAction('[Main Page] Load Items');
export const LoadItemsSuccess = createAction('[Main Page] Load Items Success', props<{ items: WholeDataCustom[] }>());
export const AddToFavorites = createAction('[Main Page] Add To Favorites', props<{item: WholeDataCustom }>());
export const DeleteFromFavorites = createAction('[Favorites Page] Delete From Favorites', props<{ id: string }>());
export const GetDetails = createAction('[Main Page] Get Details');
export const GetDetailsSuccess = createAction('[Main Page] Get Details Success');
export const DeleteCustomVideo = createAction('[Main Page] Delete Custom Video', props<{ id: string }>());
