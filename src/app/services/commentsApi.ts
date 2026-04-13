import {api} from "./api.ts";
import type {CommentProps, CommentRequestProps} from "./types.ts";


export const commentsApi = api.injectEndpoints({
    endpoints: (build) => ({
        createComment: build.mutation<CommentProps, CommentRequestProps>({
            query: ({content, postId}) => ({
                url: '/comments',
                method: 'POST',
                body: {content, postId}
            })
        }),
        deleteComment: build.mutation<void, { id: string }>({
            query: ({id}) => ({
                url: `/comments/${id}`,
                method: 'DELETE'
            })
        })
    })
})

export const {useCreateCommentMutation,useDeleteCommentMutation} = commentsApi