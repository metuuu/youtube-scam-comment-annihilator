```
  __     __      _______    _
  \ \   / /     |__   __|  | |
   \ \_/ /__  _   _| |_   _| |__   ___    ___  ___ __ _ _ __ ___
    \   / _ \| | | | | | | | '_ \ / _ \  / __|/ __/ _` | '_ ` _ \
     | | (_) | |_| | | |_| | |_) |  __/  \__ \ (_| (_| | | | | | |
     |_|\___/ \__,_|_|\__,_|_.__/ \___|  |___/\___\__,_|_| |_| |_|    _ _     _ _       _
                                           | |                       (_) |   (_) |     | |
    ___ ___  _ __ ___  _ __ ___   ___ _ __ | |_      __ _ _ __  _ __  _| |__  _| | __ _| |_ ___  _ __
   / __/ _ \| '_ ` _ \| '_ ` _ \ / _ \ '_ \| __|    / _` | '_ \| '_ \| | '_ \| | |/ _` | __/ _ \| '__|
  | (_| (_) | | | | | | | | | | |  __/ | | | |_    | (_| | | | | | | | | | | | | | (_| | || (_) | |
   \___\___/|_| |_| |_|_| |_| |_|\___|_| |_|\__|    \__,_|_| |_|_| |_|_|_| |_|_|_|\__,_|\__\___/|_|

```


## Setup

### **Give access for the app to clean your channel comments**

The app needs to read and delete your channel comments and compare your profile with commenter profiles, so we need to get API key which gives access for it.

1. Create new project in the [Google Developers Console](https://console.developers.google.com/)\
The app name can be `YouTube scam comment cleaner` for example.

2. Enable [YouTube Data API v3](https://console.cloud.google.com/apis/library/browse?q=youtube%20data%20api%20v3)

3. Select [Credentials](https://console.cloud.google.com/apis/credentials) from the left side menu -> then press `+ CREATE CREDENTIALS` button and select `API key`

4. Create [.env.local](.env.local) file and configure `YOUTUBE_API_KEY` to it
    ```
    YOUTUBE_API_KEY=<your-api-key>
    ```

5. Open the API key settings and configure API restriction to only allow `YouTube Data API v3`

6. Add `IP address` restriction so other people won't be able to use your API key even if they steal it *(optional but recommended)*
