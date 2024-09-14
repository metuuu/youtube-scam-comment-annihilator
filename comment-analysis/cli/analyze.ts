import dotenv from 'dotenv'
import fs from 'fs'
import analyze from '../index.js'
import redFlagInputs from './red-flag-inputs.js'

dotenv.config({ path: `.env.local` })
dotenv.config({ path: `.env` })

const result = await analyze({
  redFlagWeightThreshold: parseFloat(process.env.RED_FLAG_WEIGHT_THRESHOLD || '1'),
  // channelId: process.env.YOUTUBE_CHANNEL_ID!,
  youtubeVideoId: process.env.YOUTUBE_VIDEO_ID!,
  youtubeApiKey: process.env.YOUTUBE_API_KEY!,
  redFlags: redFlagInputs,
})

fs.writeFileSync(`output/${process.env.YOUTUBE_VIDEO_ID}.json`, JSON.stringify(result, null, 2))
