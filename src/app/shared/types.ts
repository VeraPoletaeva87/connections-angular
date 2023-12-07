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

export interface GroupInfo {
  data: GroupData,
  isCustom: boolean
} 