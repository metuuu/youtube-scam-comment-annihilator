import { youtube, youtube_v3 } from '@googleapis/youtube'
import { Config } from '..'

const yt = youtube({ version: 'v3' })


export default async function getChannel(channelId) {

  return channel

  const getChannelResponse = await yt.channels.list({
    key: Config.youtubeApiKey,
    id: [channelId],
    part: ['snippet']
  })

  // const channel = getChannelResponse.data.items[0]
  // return channel
}


const channel: youtube_v3.Schema$Channel = {
  "kind": "youtube#channel",
  "etag": "QQRLFFMVvoFJUz9ggiZ5JeuWO-c",
  "id": "UC4PZGdFS6D9j3r8pQWBNSww",
  "snippet": {
    "title": "NCashOfficial - Daily Crypto News",
    "description": "Hello, I am NCashOfficial delivering you the hard truth with technical analysis without any fake hopium. I make strong and unwanted calls that are highly probable. Don’t get caught in the bear traps, stay strong and HODL on through the moonboy/girl hopium.\n\nI do not have any other social media accounts, I would never ask for you to send me crypto in exchange for information, I would never ask for any logins, etc. Please be cautious about sharing any information in this market as scamming is a BIG issue.\n\nDISCLAIMER: I am not a financial adviser, & all information given in my videos or on my social media platforms is for entertainment purposes only and is not financial advice. Investing/trading is a risk that is your own responsibility. You can easily lose your money in this market. None of my information should be used to make any investment decisions. Thank you all for the continued support, I appreciate you all.\n",
    "customUrl": "@ncash",
    "publishedAt": "2021-02-26T09:54:29.309837Z",
    "thumbnails": {
      "default": {
        "url": "https://yt3.ggpht.com/IdRZsonsRHpU3BiTQC2WS-gbanIRIoditwb4pZtN58bpgTwMvtFZ4P4xgYSa6EkIZndanibvIZ4=s88-c-k-c0x00ffffff-no-rj",
        "width": 88,
        "height": 88
      },
      "medium": {
        "url": "https://yt3.ggpht.com/IdRZsonsRHpU3BiTQC2WS-gbanIRIoditwb4pZtN58bpgTwMvtFZ4P4xgYSa6EkIZndanibvIZ4=s240-c-k-c0x00ffffff-no-rj",
        "width": 240,
        "height": 240
      },
      "high": {
        "url": "https://yt3.ggpht.com/IdRZsonsRHpU3BiTQC2WS-gbanIRIoditwb4pZtN58bpgTwMvtFZ4P4xgYSa6EkIZndanibvIZ4=s800-c-k-c0x00ffffff-no-rj",
        "width": 800,
        "height": 800
      }
    },
    "localized": {
      "title": "NCashOfficial - Daily Crypto News",
      "description": "Hello, I am NCashOfficial delivering you the hard truth with technical analysis without any fake hopium. I make strong and unwanted calls that are highly probable. Don’t get caught in the bear traps, stay strong and HODL on through the moonboy/girl hopium.\n\nI do not have any other social media accounts, I would never ask for you to send me crypto in exchange for information, I would never ask for any logins, etc. Please be cautious about sharing any information in this market as scamming is a BIG issue.\n\nDISCLAIMER: I am not a financial adviser, & all information given in my videos or on my social media platforms is for entertainment purposes only and is not financial advice. Investing/trading is a risk that is your own responsibility. You can easily lose your money in this market. None of my information should be used to make any investment decisions. Thank you all for the continued support, I appreciate you all.\n"
    },
    "country": "US"
  }
}
