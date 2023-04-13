import { PayloadAction, createSlice } from "@reduxjs/toolkit";

type PhotosType = {
  small: string;
  large: string;
};
type ProfileDesctType = {
  userId: number
lookingForAJob: boolean
lookingForAJobDescription: string
fullName: string
contacts: object
github: string
vk: string
facebook: string
instagram: string
twitter: string
website: string
youtube: string
mainLink: string
photos: PhotosType
}
type PostType = {
    name: string[] | undefined | string , message: string, id: number 
}
type ProfileType = {
     posts: Array<PostType>,
    userNewPost: any[] | string,
    profile: null | Array<ProfileDesctType>,
    status: string | null,
    userPhoto: null | string,
}
const initialState: ProfileType = {
    posts: [ { name: 'Alla', message: 'Its my first posts', id: 1 },
    { name: 'Salo', message: 'Its my second posts', id: 2 },
    { name: 'Dalo', message: 'Its my firsth posts', id: 3 },],
    userNewPost: [],
    profile: [],
    status:  "",
    userPhoto: null,
}

const profileSlice = createSlice({
    name: "profile", 
    initialState,
    reducers: {
        addPost: (state, action: PayloadAction<any>) => {
    //    const fullName =  state.profile?.map(s => s.fullName[0])
        //    console.log(fullName)
            const newPost = {
        name: "no" ,
        id: Math.random(),
        message: action.payload,
      };
         state.posts.push(newPost)
              
        },
        setUserProfile: (state, action: PayloadAction<any>) => {
            state.profile = action.payload
        },
        setStatus: (state, action) => {
            state.status = action.payload
        },
        setUserPhoto: (state, action) => {
           state.userPhoto = action.payload
        },
        deletePost: (state, action: PayloadAction<number>) => {
        state.posts =   state.posts.filter(post => {
           
               return post.id !== action.payload 
            })
        }
    }
})

export const {reducer: profileReducer, actions: profileAction} = profileSlice