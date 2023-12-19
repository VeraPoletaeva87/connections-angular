export interface UserData {
  uid: {
    S: string;
  };
  name: {
    S: string;
  };
  email: {
    S: string;
  };
  createdAt: {
    S: string;
  };
}

export interface GroupData {
  id: {
    S: string;
  };
  name: {
    S: string;
  };
  createdAt: {
    S: string;
  };
  createdBy: {
    S: string;
  };
}

// authorization user parameters
export interface UserParams {
  uid: string | null;
  email: string | null;
  token: string | null;
}

export interface PeopleInfo {
  name: {
    S: string;
  };
  uid: {
    S: string;
  };
}

// conversation with a person
export interface ConversationData {
  id: {
    S: string;
  };
  companionID: {
    S: string;
  };
}

// message item from server
export interface MessageData {
  authorID: {
    S: string;
  };
  message: {
    S: string;
  };
  createdAt: {
    S: string;
  };
}

export interface PrivateMessages {
  [key: string]: FormattedItem[];
}

export interface MessageResponse {
  Count: number;
  Items: MessageData[];
}

export interface ConversationResponse {
  Count: number;
  Items: ConversationData[];
}

export interface GroupsResponse {
  Count: number;
  Items: GroupData[];
}

export interface PeopleResponse {
  Count: number;
  Items: PeopleInfo[];
}

// message item in a readable format
export interface FormattedItem {
  name: string;
  milliseconds: number;
  date: string;
  message: string;
}
