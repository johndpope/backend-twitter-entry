import * as OAuth from 'oauth'

export default new OAuth(
  'https://api.twitter.com/oauth/request_token',
  'https://api.twitter.com/oauth/access_token',
  process.env.TWITTER_KEY,
  process.env.TWITTER_SECRET,
  '1.0',
  process.env.CALLBACK_URI,
  'HMAC-SHA1'
)
