import { youtube } from '@googleapis/youtube'

const yt = youtube({ version: 'v3' })


export default async function getChannel(channelId) {

  const getChannelResponse = await yt.channels.list({
    key: process.env.YOUTUBE_API_KEY,
    id: [channelId],
    part: ['snippet']
  })

  const channel = getChannelResponse.data.items[0]
  return channel
}
