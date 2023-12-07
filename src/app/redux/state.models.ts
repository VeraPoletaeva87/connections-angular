import { GroupInfo, UserData } from "../shared/types";

export interface State {
      userInfo: UserData,
      groupInfo: GroupInfo[]
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
    groupInfo: []
  };   