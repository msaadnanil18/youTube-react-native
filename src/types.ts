
export type StackPramsList = {
    videos: undefined
    Search:any
    videoPlay:{ videoId: string,}
}

export type ButtomTabsParsms = {
    videos:any
    videosUpload:any
    Home:any
    Settings:any
    Upload:any
    Search:any
}

export interface Videos {
    _id: string;
    thumbnail: any;
    title: string;
    description: string;
    videoFile: any;
  }
