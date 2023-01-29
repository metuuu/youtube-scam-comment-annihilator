import { youtube } from '@googleapis/youtube'

const yt = youtube({ version: 'v3' })


export default async function getThreadComments({ topLevelCommentId, maxResults, pageToken }) {

  const listCommentsResponse = await yt.comments.list({
    key: process.env.YOUTUBE_API_KEY,
    maxResults,
    pageToken,
    parentId: topLevelCommentId,
    part: ['snippet'],
  })

  return {
    comments: listCommentsResponse.data.items,
    nextPageToken: listCommentsResponse.data.nextPageToken,
  }
}
