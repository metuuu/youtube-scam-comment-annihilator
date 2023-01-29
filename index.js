import dotenv from 'dotenv'
import fs from 'fs'
import analyzeComment from './src/comment-analysis/analyzeComment.js'
import getChannel from './src/getChannel.js'
import getThreadComments from './src/getThreadComments.js'
import getThreads from './src/getThreads.js'
import loadImage from './src/loadImage.js'

// Read env variables from env files
dotenv.config({ path: `.env.local` })
dotenv.config({ path: `.env` })


// Init variables
const commentsToAnnihilate = {}


// Get channel author
const channel = await getChannel(process.env.YOUTUBE_CHANNEL_ID)
const channelProfileImage = await loadImage(channel.snippet.thumbnails.default.url)


// Get threads for video
const threads = await getThreads(process.env.YOUTUBE_VIDEO_ID)


// Analyze thread comments
for (const thread of threads) {
  // if (!thread.snippet.isPublic) continue // TODO: What do "not public" threads mean and should we ignore them?

  const topLevelComment = thread.snippet.topLevelComment

  // Analyze
  const analysisResults = []

  if (thread.snippet.totalReplyCount === 0) { // single comment
    const result = await analyzeComment({ channel, channelProfileImage, comment: topLevelComment })
    analysisResults.push(result)
  }
  else { // multiple comments
    const comments = await getThreadComments({
      topLevelCommentId: topLevelComment.id,
      maxResults: 10,
    })
    const results = await Promise.all([
      analyzeComment({ channel, channelProfileImage, comment: topLevelComment }),
      ...comments.map((comment) => analyzeComment({ channel, channelProfileImage, comment }))
    ])
    analysisResults.push(...results)
  }

  // Process analysis results
  for (const result of analysisResults) {
    if (result.totalRedFlagWeight >= process.env.RED_FLAG_WEIGHT_THRESHOLD) {
      if (!commentsToAnnihilate[topLevelComment.id]) commentsToAnnihilate[topLevelComment.id] = []
      commentsToAnnihilate[topLevelComment.id].push(result.comment)
    }
  }
}

// Save commentsToAnnihilate to "output/<video-id>.json" file
fs.writeFileSync(`output/${process.env.YOUTUBE_VIDEO_ID}.json`, JSON.stringify(commentsToAnnihilate, null, 2))
