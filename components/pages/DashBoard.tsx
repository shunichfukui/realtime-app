import { FC, Suspense } from 'react'
import { LogoutIcon, ExclamationCircleIcon } from '@heroicons/react/solid'
import { supabase } from '../../utils/supabase'
import { ErrorBoundary } from 'react-error-boundary'
import { Spinner } from '../atoms/Spinner'
import { UserProfile } from '../templates/UserProfile'
import { useQueryClient } from 'react-query'
import useStore from '../../store'
import { Notification } from '../templates/Notification'
import { Feed } from '../organisms/Feed'

export const DashBoard: FC = () => {
  const queryClient = useQueryClient()
  const resetProfile = useStore((state) => state.resetEditedProfile)
  const resetEditedNotice = useStore((state) => state.resetEditedNotice)
  const resetEditedPost = useStore((state) => state.resetEditedPost)

  const signOut = () => {
    supabase.auth.signOut()
    // ログアウトの際はキャッシュクリア
    resetProfile()
    resetEditedNotice()
    resetEditedPost()
    queryClient.invalidateQueries(['profile'])    
    queryClient.invalidateQueries(['notices'])    
    queryClient.invalidateQueries(['posts'])    
  }

  return (
    <>
        <LogoutIcon
          className='my-6 h-6 w-6 cursor-pointer text-blue-500'
          onClick={signOut}
        />
        <div className="grid grid-cols-3 gap-4">
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

          <div className='flex flex-col w-96 items-center'>
              <ErrorBoundary
                fallback={
                  <ExclamationCircleIcon className="my-5 h-30 w-30 text-pink-500" />
                }
              >
                  <Suspense fallback={<Spinner />}>
                      <Feed />
                  </Suspense>
              </ErrorBoundary>
          </div>

          <div className='flex flex-col items-center'>
            <ErrorBoundary
              fallback={
                <ExclamationCircleIcon className="my-5 h-10 w-10 text-pink-500" />
              }
            >
              <Suspense fallback={<Spinner />}>
                <Notification />
              </Suspense>
            </ErrorBoundary>
          </div>
        </div>
    </>
  )
}
