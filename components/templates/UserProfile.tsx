import { CameraIcon } from '@heroicons/react/solid'
import { format } from 'date-fns'
import Image from 'next/image'
import { FC } from 'react'
import { useDownloadUrl } from '../../hooks/user/useDownloadUrl'
import { useMutateProfile } from '../../hooks/user/useMutateProfile'
import { useQueryProfile } from '../../hooks/user/useQueryProfile'
import { useUploadAvatarImg } from '../../hooks/user/useUploadAvatarImg'
import useStore from '../../store'
import { Spinner } from '../atoms/Spinner'

export const UserProfile: FC = () => {
  const session = useStore((state) => state.session)
  const editedProfile = useStore((state) => state.editedProfile)
  const update = useStore((state) => state.updateEditedProfile)

  const { data: profile } = useQueryProfile()
  const { updateProfileMutation } = useMutateProfile()
  const { useMutateUploadAvatarImg } = useUploadAvatarImg()
  const { fullUrl: avatarUrl, isLoading } = useDownloadUrl(
    editedProfile.avatar_url,
    'avatars'
  )

  const updateProfile = () => {
    updateProfileMutation.mutate({
        id: session?.user?.id,
        username: editedProfile.username,
        favorites: editedProfile.favorites,
        avatar_url: editedProfile.avatar_url,
    })
  }

  return (
    <>
      <p className='mb-4'>{profile?.username}</p>
      {profile?.created_at && (
        <p className='my-1 text-sm'>
            {format(new Date(profile.created_at), 'yyyy-MM-dd HH:mm:ss')}
        </p>
      )}
      {profile?.updated_at && (
        <p className='text-sm'>
            {format(new Date(profile.updated_at), 'yyyy-MM-dd HH:mm:ss')}
        </p>
      )}

      {/* input要素 */}
      <p className='mt-4'>ユーザー名</p>
      <input
        className='my-2 mx-2 rounded border border-gray-300 px-3 py-2 text-sm focus:outline-none'
        type="text"
        value={editedProfile.username || ''}
        onChange={(e) => update({ ...editedProfile, username: e.target.value })}
      />

      <p className='mt-4'>好み</p>
      <input
        className='my-2 mx-2 rounded border border-gray-300 px-3 py-2 text-sm focus:outline-none'
        type="text"
        value={editedProfile.favorites || ''}
        onChange={(e) => update({ ...editedProfile, favorites: e.target.value })}
      />

      {/* 更新ボタン */}
      <button
        className={`my-5 rounded 
          ${updateProfileMutation.isLoading || !editedProfile.username
            ? 'bg-gray-400'
            : 'bg-indigo-600'
          } px-3 py-2 text-sm font-medium text-white`}
        onClick={updateProfile}
        disabled={updateProfileMutation.isLoading || !editedProfile.username}
      >
        {updateProfileMutation.isLoading ? '読み込み中 ...' : '更新' }
      </button>

      {/* アバター画像 */}
      {avatarUrl && (
        <Image
          src={avatarUrl}
          alt={editedProfile.username ? editedProfile.username : "アバター画像"}
          className="rounded-full"
          width={150}
          height={150}
        />
      )}
      {isLoading && <Spinner />}

      {/* 画像アップロード  htmlForとidで紐付けてる */}
      <div className='flex justify-center'>
        <label htmlFor='avatar'>
            <CameraIcon className='my-3 h-7 w-7 cursor-pointer text-gray-500' />
        </label>
        <input
          className='hidden'
          type="file"
          id="avatar"
          accept="image/*"
          onChange={(e) => useMutateUploadAvatarImg.mutate(e)}
        />
      </div>
    </>
  )

}
