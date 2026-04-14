import { PostCard } from "../../components/postCard"
import { useGetPostsQuery } from "../../app/services/postsApi.ts"

export const Posts =() => {
  const { data:posts,isLoading } = useGetPostsQuery()
  return (
    <div>
      <div className='flex flex-col gap-1.5' >
        {posts?.map(post => (<PostCard key={post.id} postId={post.id} avatarUrl={post.author.avatarUrl}
          authorName={post.author.name}
          createdAt={new Date(post.createdAt).toLocaleDateString("ru-RU")}
          content={post.content} likes={[]} comments={[]} isDetails={false} />))}
      </div>

    </div>
  )
}