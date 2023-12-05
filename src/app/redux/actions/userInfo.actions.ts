import { createAction, props } from '@ngrx/store';
import { UserData } from 'src/app/shared/types';
 
export const AddUserInfo = createAction('[Profile Page] Add User Info', props<{item: UserData }>());