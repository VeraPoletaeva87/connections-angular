export interface UserData {
      uid: {
        S: string
      },
      name: {
        S: string
      },
      email: {
        S: string
      },
      createdAt: {
        S: string
      }
    }

export interface GroupData {
    id: {
      S: string
    },
    name: {
      S: string
    },
    createdAt: {
      S: string
    },
    createdBy: {
      S: string
    }
}    

export interface UserParams {
    uid: string | null,
    email: string | null,
    token: string | null
}

export interface PeopleInfo {
    name: {
      S: string
    },
    uid: {
      S: string
    }
}

export interface ConversationData {
    id: {
      S: string
    },
    companionID: {
      S: string
    }
}

export interface MessageData {
  authorID: {
    S: string
  },
  message: {
    S: string
  },
  createdAt: {
    S: string 
  }
}

export interface PrivateMessages {
  [key: string]: FormattedItem[]
}

export interface MessageResponse {
    Count: number,
    Items: MessageData[]
}

export interface FormattedItem {
  name: string,
  date: string,
  message: string
}