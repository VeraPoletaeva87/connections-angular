import { ConversationData, GroupData, MessageData, PeopleInfo, UserData } from "../shared/types";

export interface State {
      userInfo: UserData,
      groupInfo: GroupData[],
      peopleList: PeopleInfo[],
      conversationList: ConversationData[],
      messages: MessageData[]
    }
  
  export const initialState: State = {
    userInfo: {
      uid: {
        S: ''
      },
      name: {
        S: ''
      },
      email: {
        S: ''
      },
      createdAt: {
        S: ''
      }
    },
    groupInfo: [],
    peopleList: [],
    conversationList: [],
    messages: []
  };   