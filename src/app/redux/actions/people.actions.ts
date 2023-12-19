import { createAction, props } from '@ngrx/store';
import { ConversationData, PeopleInfo } from 'src/app/shared/types';
 
export const AddPeople = createAction('[Main Page] Add People', props<{items: PeopleInfo[] }>());