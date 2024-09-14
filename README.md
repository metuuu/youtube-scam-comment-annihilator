# YouTube scam comment cleaner

This application can be used for analyzing your YouTube video for scam/bot comments and hiding them.
Note that this application doesn't delete any comments. It only changes comments [moderation status](https://developers.google.com/youtube/v3/docs/comments/setModerationStatus) which hides the comments displaying in your video.

```
"moderationStatus": "rejected"
Rejects a comment as being unfit for display. This action also effectively hides all replies to the rejected comment.
```

The `red flags` for scam/bot comment detection are hardcoded for now.\
See: [comment-analysis/src/comment-analysis/RedFlags.ts](comment-analysis/src/comment-analysis/RedFlags.ts)

## Prerequisites

Having NodeJS installed: https://nodejs.org/en

## Getting started

First of all run `npm install`

### Running development server
```bash
npm run dev
```

### Building and running the app locally
```bash
npm run build
npm start
```


## Creating YouTube API key

**WARNING: BEFORE YOU CREATE AN API KEY. PLEASE UNDERSTAND WHAT IT IS USED FOR AND DO NOT SHARE IT WITH ANYONE!**

See: https://developers.google.com/youtube/v3/docs

This application only uses these endpoints:
 - [Videos: list](https://developers.google.com/youtube/v3/docs/videos/list)
 - [Channels: list](https://developers.google.com/youtube/v3/docs/channels/list)
 - [CommentThreads: list](https://developers.google.com/youtube/v3/docs/commentThreads/list)
 - [Comments: list](https://developers.google.com/youtube/v3/docs/comments/list)
 - [Comments: setModerationStatus](https://developers.google.com/youtube/v3/docs/comments/setModerationStatus)



1. Create a Google Cloud Project: https://console.cloud.google.com/projectcreate
2. Enable YouTube Data API v3: https://console.cloud.google.com/apis/api/youtube.googleapis.com
3. Create the `API key` https://console.cloud.google.com/apis/api/youtube.googleapis.com/credentials from `+ CREATE CREDENTIALS` button.
4. Restrict the API key for your liking from by clicking three dots at right in api key list item and selecting `Edit API key`.\
Configure `API restrictions` -> `Restrict key` -> `YouTube Data API 3v`.\
And you could set an IP address restriction for the API key for example.


## Configuring the API key

You can either paste the YouTube API key to the input field or pre configure it to environment file by creating `.env.local` file with content:
```
NEXT_PUBLIC_YOUTUBE_API_KEY=<youtube-api-key>
```
Note that the input field is hidden when the API key is configured via the env file.

## API Key quota

Projects that enable the YouTube Data API have a default quota allocation of 10,000 units per day.

The only significant quota usages are:
- **Listing comments**\
  Single "list comments" request uses `1 unit` and returns up to 100 comments.\
  When listing more than 100 comments, the list comment endpoint is called multiple times.
- **Hiding comments (setModerationStatus)**\
  Hiding a comments uses `50 units`. You can hide max 200 comments with a single API key unless you request more quota from Google.

You can check your remaining quota from: https://console.cloud.google.com/apis/api/youtube.googleapis.com/quotas

Please read more info from Google's documentation and verify the values:
- https://developers.google.com/youtube/v3/guides/quota_and_compliance_audits
- https://developers.google.com/youtube/v3/determine_quota_cost
