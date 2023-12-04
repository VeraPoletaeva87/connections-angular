export interface Item {
  kind: string,
  etag: string,
  id: {
    kind: string,
    videoId: string
  },
  snippet: Snippet
}

export interface ResultData {
  kind: string,
  etag: string,
  nextPageToken: string,
  regionCode: string,
  pageInfo: {
    totalResults: number,
    resultsPerPage: number
  },
  items: Item[]
}

export interface Statistics {
  likeCount: string,
  favoriteCount: string,
  commentCount: string
};

export interface Snippet {
  publishedAt: Date,
  channelId: string,
  channelTitle: string,
  title: string,
  description: string,
  thumbnails: {
    default: {
      url: string,
      width: number,
      height: number
    },
    medium: {
      url: string,
      width: number,
      height: number
    },
    high: {
      url: string,
      width: number,
      height: number
    }
  },
  liveBroadcastContent: string,
  publishTime: Date
}

export interface WholeVideoData {
  id?: string,
  snippet?: Snippet,
  statistics?: Statistics
}

export interface WholeDataCustom extends WholeVideoData {
  custom?: boolean,
  favorite?: boolean
}

export interface StatisticsData {
  kind: string,
  etag: string,
  items: [
      {
        kind: string,
        etag: string,
        id: string,
        statistics: Statistics
      }
    ],
    pageInfo: {
      totalResults: number,
      resultsPerPage: number
    }
  }

  export interface CustomItem {
    id: number,
    title: string,
    description: string,
    image: string,
    video: string
  }

  export interface VideoData {
    id: number,
    favorite: boolean,
    custom: boolean
  }