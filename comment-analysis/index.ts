import analyzeComment from './src/comment-analysis/analyzeComment.js'
import { RedFlag } from "./src/comment-analysis/RedFlags.js"
import getChannel from "./src/getChannel.js"
import getComments from './src/getComments.js'
import getThreads from "./src/getThreads.js"
import getVideo from './src/getVideo.js'

export type AnalyzeOptions = {
  redFlagWeightThreshold: number
  youtubeVideoId: string
  youtubeApiKey: string
  redFlags: RedFlag[]
  maxTopLevelComments?: number
  maxCommentsInThread?: number
  commentQueryOrder?: 'time' | 'relevance'
}

const analyze = async (options: AnalyzeOptions) => {
  const { redFlags, redFlagWeightThreshold, youtubeApiKey, youtubeVideoId, commentQueryOrder, maxTopLevelComments = 100, maxCommentsInThread = 100 } = options

  const output: Record<string, any[]> = {}

  // Get channel id from video
  const video = await getVideo({ videoId: youtubeVideoId, apiKey: youtubeApiKey })
  if (!video?.snippet?.channelId) throw new Error('Video not found')

  // Get channel author
  const channel = await getChannel({ channelId: video.snippet.channelId, apiKey: youtubeApiKey })


  // Get threads for video
  const threads = await getThreads({ videoId: youtubeVideoId, apiKey: youtubeApiKey, maxResults: maxTopLevelComments, order: commentQueryOrder })


  // Analyze thread comments
  await Promise.all(
    (threads || []).map(async (thread) => {
      // if (!thread.snippet.isPublic) continue // TODO: What do "not public" threads mean and should we ignore them?

      const topLevelComment = thread.snippet?.topLevelComment!
      const topLevelCommentId = topLevelComment.id!

      // Analyze
      const analysisResults: Awaited<ReturnType<typeof analyzeComment>>[] = []

      if (thread.snippet?.totalReplyCount === 0 || !maxCommentsInThread) { // single comment
        const result = await analyzeComment({ channel, comment: topLevelComment, redFlags })
        analysisResults.push(result)
      }
      else { // multiple comments
        const comments = await getComments({ parentId: topLevelCommentId, apiKey: youtubeApiKey, maxResults: maxCommentsInThread })
        const results = await Promise.all([
          analyzeComment({ channel, comment: topLevelComment, redFlags }),
          ...(comments || []).map((comment) => analyzeComment({ channel, comment, redFlags }))
        ])
        analysisResults.push(...results)
      }

      // Process analysis results
      for (const { comment, ...result } of analysisResults) {
        if (result.totalRedFlagWeight >= redFlagWeightThreshold) {
          if (!output[topLevelCommentId]) output[topLevelCommentId] = []
          const commentSnippet = comment!.snippet!
          output[topLevelCommentId].push({
            id: comment.id,
            authorChannelId: commentSnippet.authorChannelId!.value,
            authorChannelUrl: commentSnippet.authorChannelUrl,
            authorProfileImageUrl: commentSnippet.authorProfileImageUrl,
            authorDisplayName: commentSnippet.authorDisplayName,
            textOriginal: commentSnippet.textOriginal,
            likeCount: commentSnippet.likeCount,
            parentId: commentSnippet.parentId,
            updatedAt: commentSnippet.updatedAt,
              ...((!commentSnippet.parentId && thread.snippet?.totalReplyCount || 0) > 0 && {
              isCommentThread: true,
              numOfReplies: thread.snippet!.totalReplyCount!,
            }),
            ...result,
          })
        }
      }
    })
  )

  return output
}

export default analyze
