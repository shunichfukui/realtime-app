import { FC } from "react"
import { useQueryNotices } from "../../hooks/notice/useQueryNotices"
import { useSubscribeNotices } from "../../hooks/notice/useSubscribeNotices"
import { NoticeForm } from "../molecules/NoticeForm"
import { NoticeItem } from "../atoms/NoticeItem"

export const Notification: FC = () => {
  const { data: notices } = useQueryNotices()
  // リアルタイム更新対応
  useSubscribeNotices()

  return (
    <>
      <p className="mb-4 text-center">Notification</p>
      <NoticeForm />
      <ul data-testid="ul-notice" className="my-5">
        {notices?.map((notice) => (
          <NoticeItem
            key={notice.id}
            id={notice.id}
            content={notice.content}
            user_id={notice.user_id}
          />
        ))}
      </ul>
    </>
  )
}
