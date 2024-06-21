
export type StackPramsList = {
    videos: undefined
    Search:any
    videoPlay:{ videoId: string,}
    RegistrationForm:any
    LoginForm:any
}

export type ButtomTabsParsms = {
    videos:any
    videosUpload:any
    Home:any
    Settings:any
    Upload:any
    Search:any
    setting:any
}

export interface Videos {
    _id: string;
    thumbnail: any;
    title: string;
    description: string;
    videoFile: any;
  }

  export interface UserDetails {
    user:{ username:string
        email:string
        fullName:string
        avatar:string}
   
  }