import { useEffect, useState } from "react"
import { supabase } from "../../utils/supabase"

export const useDownloadUrl = (
    filePath: string | undefined,
    key: 'avatars' | 'posts'
) => {
  const [isLoading, setIsLoading] = useState(false)
  const [fullUrl, setFullUrl] = useState('')

  const bucketName = key === 'avatars' ? 'avatars' : 'posts'

  useEffect(() => {

    if (filePath) {
        const download = async () => {
            setIsLoading(true)

            // token付きのファイルパスを取得
            const { data, error } = await supabase.storage
              .from(bucketName)
              .download(filePath)

            if (error) {
                setIsLoading(false)
                throw error
            }

            // stringに変換
            setFullUrl(URL.createObjectURL(data!))
            setIsLoading(false)
        }
        download()
    }

  }, [filePath, bucketName])

  return { isLoading, fullUrl, setFullUrl }
}
