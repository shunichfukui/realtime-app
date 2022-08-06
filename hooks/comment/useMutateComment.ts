import { useMutation } from 'react-query'
import { Comment, EditedComment } from '../../types'
import { supabase } from '../../utils/supabase'

export const useMutateComment = () => {

  //  作成
  const createCommentMutation = useMutation(
    async (comment: Omit<Comment, 'id' | 'created_at'>) => {
      const { data, error } = await supabase.from('comments').insert(comment)

      if (error) throw new Error(error.message)

      return data
    },
    {
      onError: (err: any) => {
        alert(err.message)
      },
    }
  )

  //  更新
  const updateCommentMutation = useMutation(
    async (comment: EditedComment) => {
      const { data, error } = await supabase
        .from('comments')
        .update({ comment: comment.comment })
        .eq('id', comment.id)

      if (error) throw new Error(error.message)

      return data
    },
    {
      onError: (err: any) => {
        alert(err.message)
      },
    }
  )

  // 削除
  const deleteCommentMutation = useMutation(
    async (id: string) => {
      const { data, error } = await supabase
        .from('comments')
        .delete()
        .eq('id', id)

      if (error) throw new Error(error.message)

      return data
    },
    {
      onError: (err: any) => {
        alert(err.message)
      },
    }
  )

  return { deleteCommentMutation, createCommentMutation, updateCommentMutation }
}