import { api } from "./api.ts"
import type { CommentProps, CommentRequestProps } from "./types.ts"


export const commentsApi = api.injectEndpoints({
  endpoints: (build) => ({
    createComment: build.mutation<CommentProps, CommentRequestProps>({
      query: ({ content, postId }) => ({
        url: "/comments",
        method: "POST",
        body: { content, postId },
      }),
      invalidatesTags:(_result,_error,arg) => [
        { type:"Post",id:arg.postId },
      ],
    }),
    deleteComment: build.mutation<void, { postId: string, commentId: string }>({
      query: ({ commentId }) => ({
        url: `/comments/${commentId}`,
        method: "DELETE",
      }),
      invalidatesTags:(_result,_error,arg) => [
        { type:"Post",id:arg.postId },
      ],
    }),
  }),
})

export const { useCreateCommentMutation, useDeleteCommentMutation } = commentsApi