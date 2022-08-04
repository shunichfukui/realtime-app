import { useMutation } from 'react-query'
import useStore from '../../store'
import { EditedNotice, Notice } from '../../types'
import { supabase } from '../../utils/supabase'

export const useMutateNotice = () => {
  const reset = useStore((state) => state.resetEditedNotice)

  //  作成処理
  const createNoticeMutation = useMutation(
    async (notice: Omit<Notice, 'id' | 'created_at'>) => {

        const { data, error } = await supabase.from('notices').insert(notice)

        if (error) throw new Error(error.message)
        return data
    },
    {
        onSuccess: () => {
            reset()
        },
        onError: (err: any) => {
            alert(err.message)
            reset()
        },
    }
  )

  // 更新処理
  const updateNoticeMutation = useMutation(
    async (notice: EditedNotice) => {

        const { data, error } = await supabase
          .from('notices')
          .update({ content: notice.content })
          .eq('id', notice.id)

        if (error) throw new Error(error.message)
        return data
    },
    {
        onSuccess: () => {
            reset()
        },
        onError: (err: any) => {
            alert(err.message)
            reset()
        },
    }
  )

  // 削除処理
  const deleteNoticeMutation = useMutation(
    async (id: string) => {

        const { data, error } = await supabase
          .from('notices')
          .delete()
          .eq('id', id)

        if (error) throw new Error(error.message)
        return data
    },
    {
        onSuccess: () => {
            reset()
        },
        onError: (err: any) => {
            alert(err.message)
            reset()
        },
    }
  )
  
  return { createNoticeMutation, updateNoticeMutation, deleteNoticeMutation }
}
