import { WholeDataCustom } from "../shared/types";

export interface State {
    customVideos: {
      videoList: WholeDataCustom[];
    },
    youTubeVideos: {
      videoList: WholeDataCustom[];
      loading: boolean,
      error: boolean
    }
    }
  
  export const initialState: State = {
    customVideos: {
      videoList: [],
    },
    youTubeVideos: {
      videoList: [],
      loading: false,
      error: false
    }
  };
