import { api } from "./api.ts"

export const likesApi = api.injectEndpoints({
  endpoints: (build) => ({
    likePost: build.mutation<void, { postId: string }>({
      query: ({ postId }) => ({
        url: "/likes",
        method: "POST",
        body: { postId },
      }),
      invalidatesTags: (_result, _error, args) => [
        { type: "Post", id: args.postId },
      ],
    }),
    unlikePost: build.mutation<void, { postId: string, unlikePostId: string }>({
      query: ({ unlikePostId }) => ({
        url: `/likes/${unlikePostId}`,
        method: "DELETE",
      }),
      invalidatesTags: (_result, _error, args) => [
        { type: "Post", id: args.postId }],
    }),
  }),
})

export const { useLikePostMutation, useUnlikePostMutation } = likesApi