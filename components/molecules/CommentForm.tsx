import { Dispatch, FC, FormEvent, memo, SetStateAction } from "react"
import useStore from "../../store"
import { EditedComment } from "../../types"
import { useMutateComment } from '../../hooks/comment/useMutateComment';
import { ArrowRightIcon } from "@heroicons/react/solid";

type Props = {
  postId: string,
  editedComment: EditedComment,
  setEditedComment: Dispatch<SetStateAction<EditedComment>>
}

export const CommentFormMemo: FC<Props> = ({
    postId,
    editedComment,
    setEditedComment,
}) => {
  const session = useStore((state) => state.session)
  const { createCommentMutation, updateCommentMutation } = useMutateComment()

  const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (editedComment.id === '') {
        await createCommentMutation.mutateAsync({
            post_id: postId,
            user_id: session?.user?.id,
            comment: editedComment.comment,
        })
        setEditedComment({ id: '', comment: '' })

    } else {
        await updateCommentMutation.mutateAsync({
            id: editedComment.id,
            comment: editedComment.comment,
        })
        setEditedComment({ id: '', comment: '' })
    }
  }

  return (
    <form onSubmit={submitHandler}>
      <div className="flex items-center justify-center">
        <input
          type="text"
          className="my-2 rounded border border-gray-300 px-3 py-2 text-sm focus:outline-none"
          placeholder="コメントする"
          value={editedComment.comment}
          onChange={(e) =>
            setEditedComment({ ...editedComment, comment: e.target.value })
          }
        />
        <button
          data-testid="btn-comment"
          type="submit"
          disabled={!editedComment.comment}
        >
          <ArrowRightIcon
            className={`ml-3 h-6 w-6 cursor-pointer ${
              editedComment.comment ? 'text-indigo-500' : 'text-gray-500'
            }`}
          />
        </button>
      </div>
    </form>
  )
}

export const CommentForm = memo(CommentFormMemo)