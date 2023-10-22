export class Item {
    kind!: string;
    etag!: string;
    id!: string;
    snippet!: {
      publishedAt: Date,
      channelId: string,
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
        },
        standard: {
          url: string,
          width: number,
          height: number
        },
        maxres: {
          url: string,
          width: number,
          height: number
        }
      },
      channelTitle: string,
      tags: string[],
      categoryId: number,
      liveBroadcastContent: string,
      localized: {
        title: string,
        description: string
      },
        defaultAudioLanguage: string
    };
    statistics!: {
      viewCount: number,
      likeCount: number,
      dislikeCount: number,
      favoriteCount: number,
      commentCount: number
    };
  }