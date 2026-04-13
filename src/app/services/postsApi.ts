import {api} from "./api.ts";
import type {PostProps} from "./types.ts";

export const postsApi = api.injectEndpoints({
    endpoints:(build)=>({
        createPost: build.mutation<PostProps,{content: string}>({
            query:({content})=>({
                url:'/posts',
                method:'POST',
                body: {content}
            })
        }),
        getPosts: build.query<PostProps[],void >({
            query:()=>({
                url:'/posts',
            })
        }),
        getPost: build.query<PostProps,{id: string}>({
            query:({id})=>({
                url:`/posts/${id}`
            })
        }),
        deletePost: build.mutation<void,{id: string}>({
            query: ({id})=>({
                url:`/posts/${id}`,
                method:'DELETE',
            })
        })
    })
})

export const {useCreatePostMutation,useGetPostsQuery,useLazyGetPostsQuery,useGetPostQuery,useLazyGetPostQuery,useDeletePostMutation} = postsApi