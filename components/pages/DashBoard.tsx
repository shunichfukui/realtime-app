import { FC, Suspense } from 'react'
import { LogoutIcon, ExclamationCircleIcon } from '@heroicons/react/solid'
import { supabase } from '../../utils/supabase'
import { ErrorBoundary } from 'react-error-boundary'
import { Spinner } from '../atoms/Spinner'
import { UserProfile } from '../templates/UserProfile'
import { useQueryClient } from 'react-query'
import useStore from '../../store'

export const DashBoard: FC = () => {
  const queryClient = useQueryClient()
  const resetProfile = useStore((state) => state.resetEditedProfile)

  const signOut = () => {
    supabase.auth.signOut()
    // キャッシュクリア
    resetProfile()
    queryClient.invalidateQueries(['profile'])    
  }

  return (
    <>
        <LogoutIcon
          className='my-6 h-6 w-6 cursor-pointer text-blue-500'
          onClick={signOut}
        />
        <div className='flex flex-col items-center'>
            <ErrorBoundary
              fallback={
                <ExclamationCircleIcon className="my-5 h-10 w-10 text-pink-500" />
              }
            >
                <Suspense fallback={<Spinner />}>
                    <UserProfile />
                </Suspense>
            </ErrorBoundary>
        </div>
    </>
  )
}
