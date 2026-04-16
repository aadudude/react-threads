import { api } from "./api.ts"

export const followsApi = api.injectEndpoints({
  endpoints: (build) => ({
    followUser: build.mutation<void, { followingId: string }>({
      query: ({ followingId }) => ({
        url: "/follow",
        method: "POST",
        body: { followingId },
      }),
    }),
    unfollowUser: build.mutation<void, { unfollowId: string }>({
      query: ({ unfollowId }) => ({
        url: `/unfollow/${unfollowId}`,
        method: "DELETE",
      }),
    }),
  }),
})

export const { useFollowUserMutation, useUnfollowUserMutation } = followsApi