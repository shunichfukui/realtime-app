import { FC } from 'react'
import { useQueryPosts } from '../../hooks/post/useQueryPosts'
import { useSubscribePosts } from '../../hooks/post/useSubscribePosts'
import { Post } from '../../types'
import { PostItem } from '../molecules/PostItem'
import { PostForm } from '../molecules/PostForm'

export const Feed: FC = () => {
  const { data: posts } = useQueryPosts()
  useSubscribePosts()
  
  return (
    <>
      <p className="mb-4 text-center">投稿</p>
      <PostForm />
      <ul data-testid="ul-post" className="my-5">
        {posts?.map((post: Post) => (
          <PostItem
            key={post.id}
            id={post.id}
            title={post.title}
            post_url={post.post_url}
            user_id={post.user_id}
          />
        ))}
      </ul>
    </>
  )
}
