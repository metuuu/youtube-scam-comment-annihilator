import { youtube } from '@googleapis/youtube'

const yt = youtube({ version: 'v3' })


export default async function getThreads(videoId) {

  const listCommentThreadsResponse = await yt.commentThreads.list({
    key: process.env.YOUTUBE_API_KEY,
    videoId,
    part: ['snippet'],
    // part: ['snippet', 'replies'], // With replies
  })


  const threads = listCommentThreadsResponse.data.items
  return threads
}
