import { api } from "./api.ts"
import type { Post } from "../types.ts"

export const postsApi = api.injectEndpoints({
  endpoints: (build) => ({
    createPost: build.mutation<Post, { content: string }>({
      query: ({ content }) => ({
        url: "/posts",
        method: "POST",
        body: { content },
      }),
      invalidatesTags:[{ type: "Posts" }],
    }),
    getPosts: build.query<Post[], void>({
      query: () => ({
        url: "/posts",
      }),
      providesTags: [{ type: "Posts" }],
    }),
    getPost: build.query<Post, { id: string }>({
      query: ({ id }) => ({
        url: `/posts/${id}`,
      }),
      providesTags: (result) => [{ type:"Post",id: result?.id }],
    }),
    deletePost: build.mutation<void, { id: string }>({
      query: ({ id }) => ({
        url: `/posts/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (_result, _error,arg) => [
        { type: "Posts" },
        { type: "Post", id: arg.id },
      ] ,
    }),
  }),
})

export const {
  useCreatePostMutation,
  useGetPostsQuery,
  useLazyGetPostsQuery,
  useGetPostQuery,
  useLazyGetPostQuery,
  useDeletePostMutation,
} = postsApi