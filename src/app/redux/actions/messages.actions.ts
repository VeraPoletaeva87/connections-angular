import { createAction, props } from '@ngrx/store';
import { MessageData } from 'src/app/shared/types';
 
export const AddMessages = createAction('[Main Page] Add Messages', props<{items: MessageData[] }>());