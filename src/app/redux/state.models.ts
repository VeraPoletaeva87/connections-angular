import { GroupData, UserData } from "../shared/types";

export interface State {
      userInfo: UserData,
      groupInfo: GroupData[]
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