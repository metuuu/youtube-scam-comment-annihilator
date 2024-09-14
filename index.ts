import dotenv from 'dotenv'
import fs from 'fs'
import redFlagInputs from './input/red-flags.ts'
import analyzeComment from './src/comment-analysis/analyzeComment.js'
import getChannel from './src/getChannel.js'
import getComments from './src/getComments.ts'
import getThreads from './src/getThreads.ts'

// Read env variables from env files
dotenv.config({ path: `.env.local` })
dotenv.config({ path: `.env` })

export const Config = {
  redFlagWeightThreshold: parseFloat(process.env.RED_FLAG_WEIGHT_THRESHOLD || '1'),
  channelId: process.env.YOUTUBE_CHANNEL_ID,
  youtubeVideoId: process.env.YOUTUBE_VIDEO_ID,
  youtubeApiKey: process.env.YOUTUBE_API_KEY,
}

const commentsToAnnihilate = {}

const redFlags = redFlagInputs

// Get channel author
const channel = await getChannel(Config.channelId)


// Get threads for video
const { threads } = await getThreads({ videoId: Config.youtubeVideoId })


// Analyze thread comments
await Promise.all(
  (threads || []).map(async (thread) => {
    // if (!thread.snippet.isPublic) continue // TODO: What do "not public" threads mean and should we ignore them?

    const topLevelComment = thread.snippet?.topLevelComment!
    const topLevelCommentId = topLevelComment.id!

    // Analyze
    const analysisResults: any = []

    if (thread.snippet?.totalReplyCount === 0) { // single comment
      const result = await analyzeComment({ channel, comment: topLevelComment, redFlags })
      analysisResults.push(result)
    }
    else { // multiple comments
      const { comments } = await getComments({ parentId: topLevelCommentId })
      const results = await Promise.all([
        analyzeComment({ channel, comment: topLevelComment, redFlags }),
        ...(comments || []).map((comment) => analyzeComment({ channel, comment, redFlags }))
      ])
      analysisResults.push(...results)
    }

    // Process analysis results
    for (const result of analysisResults) {
      if (result.totalRedFlagWeight >= Config.redFlagWeightThreshold) {
        if (!commentsToAnnihilate[topLevelCommentId]) commentsToAnnihilate[topLevelCommentId] = []
        commentsToAnnihilate[topLevelCommentId].push({
          ...result,
          comment: {
            id: result.comment.id,
            authorChannelId: result.comment.snippet.authorChannelId.value,
            authorChannelUrl: result.comment.snippet.authorChannelUrl,
            authorProfileImageUrl: result.comment.snippet.authorProfileImageUrl,
            authorDisplayName: result.comment.snippet.authorDisplayName,
            textOriginal: result.comment.snippet.textOriginal,
            likeCount: result.comment.snippet.likeCount,
          }
        })
      }
    }
  })
)

// Save commentsToAnnihilate to "output/<video-id>.json" file
fs.writeFileSync(`output/${Config.youtubeVideoId}.json`, JSON.stringify(commentsToAnnihilate, null, 2))
