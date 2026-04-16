import { api } from "./api.ts"
import type { CommentEntity } from "../types.ts"
import type { CommentRequestProps } from "./types.ts"



export const commentsApi = api.injectEndpoints({
  endpoints: (build) => ({
    createComment: build.mutation<CommentEntity, CommentRequestProps>({
      query: ({ content, postId }) => ({
        url: "/comments",
        method: "POST",
        body: { content, postId },
      }),
      invalidatesTags:(_result,_error,arg) => [
        { type: "Posts" },
        { type:"Post",id:arg.postId },
      ],
    }),
    deleteComment: build.mutation<void, { postId: string, commentId: string }>({
      query: ({ commentId }) => ({
        url: `/comments/${commentId}`,
        method: "DELETE",
      }),
      invalidatesTags:(_result,_error,arg) => [
        { type: "Posts" },
        { type:"Post",id:arg.postId },
      ],
    }),
  }),
})

export const { useCreateCommentMutation, useDeleteCommentMutation } = commentsApi