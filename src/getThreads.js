import { youtube } from '@googleapis/youtube'

const yt = youtube({ version: 'v3' })


export default async function getThreads({ videoId, maxResults, pageToken }) {

  const listCommentThreadsResponse = await yt.commentThreads.list({
    key: process.env.YOUTUBE_API_KEY,
    videoId,
    // order: 'time', // Comment threads are ordered by time. This is the default behavior.
    order: 'relevance', // Comment threads are ordered by relevance.
    part: ['snippet'],
    pageToken,
    maxResults, // Acceptable values are 1 to 100, inclusive. The default value is 20.
    // part: ['snippet', 'replies'], // With replies
  })

  const threads = listCommentThreadsResponse.data.items
  return {
    nextPageToken: listCommentThreadsResponse.data.nextPageToken,
    threads,
  }
}
