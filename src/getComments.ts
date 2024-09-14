import { youtube, youtube_v3 } from '@googleapis/youtube'

const yt = youtube({ version: 'v3' })


export default async function getComments({ parentId, maxResults, pageToken }: Pick<youtube_v3.Params$Resource$Comments$List, 'parentId' | 'maxResults' | 'pageToken'>) {

  const listCommentsResponse = await yt.comments.list({
    key: process.env.YOUTUBE_API_KEY,
    maxResults, // Acceptable values are 1 to 100, inclusive. The default value is 20.
    pageToken,
    parentId,
    part: ['snippet'],
  })

  return {
    comments: listCommentsResponse.data.items,
    nextPageToken: listCommentsResponse.data.nextPageToken,
  }
}
