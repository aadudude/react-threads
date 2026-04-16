import { PostCard } from "../../components/postCard"
import { useGetPostsQuery } from "../../app/services/postsApi.ts"
import { CreatePost } from "../../components/createPost"

export const Posts = () => {
  const { data: posts } = useGetPostsQuery()
  return (
    <div className='flex flex-col gap-6 '>
      <CreatePost/>
      <div className='flex flex-col gap-1.5'>
        {posts?.map(post => (<PostCard key={post.id} postId={post.id} avatarUrl={post.author.avatarUrl}
          authorName={post.author.name}
          createdAt={new Date(post.createdAt).toLocaleDateString("ru-RU")}
          content={post.content} likes={post.likes} comments={post.comments}
          isDetails={false}/>))}
      </div>

    </div>
  )
}