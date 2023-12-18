import { createAction, props } from '@ngrx/store';
import { ConversationData } from 'src/app/shared/types';
 
export const AddConversation = createAction('[Conversation Page] Add Conversation', props<{item: ConversationData }>());
export const AddConversations = createAction('[Main Page] Add Conversations', props<{items: ConversationData[] }>());

export const DeleteConversation = createAction('[Conversation Page] Delete Conversation', props<{id: string }>());
