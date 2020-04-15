# Demo Node App with React, MongoDB, Redis, Google Auth and AWS S3

1. Setup
* Clone Repo
* Run `npm install`
* Create an `.env` file in project's root directory and add the following properties:

| Prop        | Value           | Description  |
| ------------- |:-------------:| -----:|
| AWS_ACCESS_KEY_ID | String | Your AWS access key |
| AWS_ACCESS_KEY_SECRET | String |Your AWS access key scret |
| AWS_BUCKET | String      |Your AWS S3 Bucket name |
| AWS_REGION | String      |Your AWS S3 Bucket region |
| GOOGLE_CLIENT_ID | String | Your Google Credential ID |
| GOOGLE_CLIENT_SECRET | String | Your Google Credential Secret |
| MONGO_URI | String      | MongoDB connectio  URL |
| APP_COOKIE_KEY | String      | Random string to be used with cookies |
| REDIS_URL | String | Redis instance URL |
