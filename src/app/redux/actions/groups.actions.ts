import { createAction, props } from '@ngrx/store';
import { GroupInfo } from 'src/app/shared/types';
 
export const AddCustomgroup = createAction('[Main Page] Add Custom Group', props<{item: GroupInfo }>());
export const AddGroups = createAction('[Main Page] Add Groups', props<{items: GroupInfo[] }>());

export const DeleteCustomgroup = createAction('[Main Page] Delete Custom Group', props<{item: GroupInfo }>());