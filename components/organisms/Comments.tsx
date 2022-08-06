import { FC, memo, useState } from "react"
import { useQueryComments } from "../../hooks/comment/useQueryComments"
import { useSubscribeComments } from "../../hooks/comment/useSubscribeComments"
import { Comment, EditedComment } from "../../types"
import { CommentItem } from "../atoms/CommentItem"
import { CommentForm } from "../molecules/CommentForm"

type Props = {
    postId: string
}

export const CommentsMemo: FC<Props> = ({
    postId
}) => {

  const [editedComment, setEditedComment] = useState<EditedComment>({
    id: '',
    comment: ''
  })
  const { data: comments } = useQueryComments(postId)
  useSubscribeComments(postId)

  return (
    <div className="w-60">
      <CommentForm
        postId={postId}
        editedComment={editedComment}
        setEditedComment={setEditedComment}
      />
      <ul data-testid="ul-comment" className="my-5">
        {comments?.map((comment: Comment) => (
          <CommentItem
            key={comment.id}
            id={comment.id}
            comment={comment.comment}
            user_id={comment.user_id}
            setEditedComment={setEditedComment}
          />
        ))}
      </ul>
    </div>
  )
}

export const Comments = memo(CommentsMemo)