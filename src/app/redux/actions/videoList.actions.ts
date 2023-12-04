import { createAction, props } from '@ngrx/store';
import { WholeDataCustom } from 'src/app/shared/types';
 
export const AddCustomVideo = createAction('[Create Card Page] Add Custom Video', props<{item: WholeDataCustom }>());
export const DeleteCustomVideo = createAction('[List Page] Delete Custom Video', props<{ id: string }>());
 