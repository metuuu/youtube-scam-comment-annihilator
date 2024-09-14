import commentsJson from './comments.json'

export type CommentRedFlag = {
  id: string
  name: string
  weight: number
}

export type Comment = {
  id: string
  authorChannelId: string
  authorChannelUrl: string
  authorProfileImageUrl: string
  authorDisplayName: string
  textOriginal: string
  likeCount: number
  updatedAt: string
  isCommentThread?: boolean
  numOfReplies?: number
  parentId?: string
  redFlags: CommentRedFlag[]
}

export const comments = Object.values<Comment[]>(commentsJson).flatMap((o) => o)
