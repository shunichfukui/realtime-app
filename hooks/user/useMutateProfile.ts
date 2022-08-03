import { useMutation, useQueryClient } from 'react-query'
import { Profile } from '../../types'
import { supabase } from '../../utils/supabase'

export const useMutateProfile = () => {
  const queryClient = useQueryClient()

  //  作成処理
  const createProfileMutation = useMutation(
    async (profile: Omit<Profile, 'updated_at' | 'created_at'>) => {
        const { data, error } = await supabase.from('profiles').insert(profile)
        if (error) throw new Error(error.message)
        return data
    },
    {
        onSuccess: (res) => {
            // 最初の一つだけキャッシュ
            queryClient.setQueryData(['profile'], res[0])
        },
        onError: (err: any) => {
            alert(err.message)
        },
    }
  )

  //  更新処理
  const updateProfileMutation = useMutation(
    async (profile: Omit<Profile, 'updated_at' | 'created_at'>) => {
        const { data, error } = await supabase
          .from('profiles')
          .update(profile)
          .eq('id', profile.id)

        if (error) throw new Error(error.message)
        return data
    },
    {
        onSuccess: (res) => {
            // 最初の一つだけキャッシュ
            queryClient.setQueryData(['profile'], res[0])
        },
        onError: (err: any) => {
            alert(err.message)
        },
    }
  )

  return { createProfileMutation, updateProfileMutation }
}
