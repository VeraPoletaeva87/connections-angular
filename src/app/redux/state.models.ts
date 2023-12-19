import { ConversationData, GroupData, PrivateMessages, PeopleInfo, UserData } from "../shared/types";

export interface State {
      userInfo: UserData,
      groupInfo: GroupData[],
      peopleList: PeopleInfo[],
      conversationList: ConversationData[],
      messages: PrivateMessages;
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
    messages: {}
  };   