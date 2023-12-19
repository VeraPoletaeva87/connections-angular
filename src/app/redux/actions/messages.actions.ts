import { createAction, props } from '@ngrx/store';
import { FormattedItem, PrivateMessages } from 'src/app/shared/types';
 
export const AddMessages = createAction('[Main Page] Add Messages', props<{id: string, items: FormattedItem[] }>());