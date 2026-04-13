import {api} from "./api.ts";

export const likesApi =api.injectEndpoints({
endpoints:(build)=>({
    likePost: build.mutation<void,{postId:string}>({
        query:({postId})=>({
            url:'/likes',
            method:'POST',
            body:{postId}
        })
    }),
    unlikePost: build.mutation<void,{unlikePostId:string}>({
        query:({unlikePostId})=>({
            url:`/likes/${unlikePostId}`,
            method: 'DELETE',
        })
    })
})
})

export const {useLikePostMutation,useUnlikePostMutation} = likesApi