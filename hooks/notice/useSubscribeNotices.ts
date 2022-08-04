import { useQueryClient } from 'react-query'
import { useEffect } from 'react';
import { supabase } from '../../utils/supabase';
import { SupabaseRealtimePayload } from '@supabase/supabase-js';
import { Notice } from '../../types';

export const useSubscribeNotices = () => {
  const queryClient = useQueryClient()
  useEffect(() => {
    const subsc = supabase
      .from('notices')
      .on('INSERT', (payload: SupabaseRealtimePayload<Notice>) => {
        let previousNotices = queryClient.getQueryData<Notice[]>(['notices'])
        if (!previousNotices) {
          previousNotices = []
        }
        // キャッシュ内容の更新
        queryClient.setQueryData(
          ['notices'],
          [
            ...previousNotices,
            {
              id: payload.new.id,
              created_at: payload.new.created_at,
              content: payload.new.content,
              user_id: payload.new.user_id,
            },
          ]
        )
      })
      .on('UPDATE', (payload: SupabaseRealtimePayload<Notice>) => {
        let previousNotices = queryClient.getQueryData<Notice[]>(['notices'])
        if (!previousNotices) {
          previousNotices = []
        }
        queryClient.setQueryData(
          ['notices'],
          previousNotices.map((notice) =>
            notice && notice.id === payload.new.id
              ? {
                  id: payload.new.id,
                  created_at: payload.new.created_at,
                  content: payload.new.content,
                  user_id: payload.new.user_id,
                }
              : notice
          )
        )
      })
      .on('DELETE', (payload: SupabaseRealtimePayload<Notice>) => {
        let previousNotices = queryClient.getQueryData<Notice[]>(['notices'])
        if (!previousNotices) {
          previousNotices = []
        }
        queryClient.setQueryData(
          ['notices'],
          previousNotices.filter((notice) => notice.id !== payload.old.id)
        )
      })
      .subscribe()

    const removeSubscriptionn = async () => {
        await supabase.removeSubscription(subsc)
    }
    return () => {
        removeSubscriptionn()
    }
  }, [queryClient])
}
