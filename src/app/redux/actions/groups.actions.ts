import { createAction, props } from '@ngrx/store';
import { GroupData } from 'src/app/shared/types';
 
export const AddCustomgroup = createAction('[Main Page] Add Custom Group', props<{item: GroupData }>());
export const AddGroups = createAction('[Main Page] Add Groups', props<{items: GroupData[] }>());

export const DeleteCustomgroup = createAction('[Main Page] Delete Custom Group', props<{id: string }>());