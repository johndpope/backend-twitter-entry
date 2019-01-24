import * as OAuth from 'oauth'
import {
  TWITTER_KEY, TWITTER_SECRET, TWITTER_CALLBACK_URI
} from '../configs'

export default new OAuth(
  'https://api.twitter.com/oauth/request_token',
  'https://api.twitter.com/oauth/access_token',
  TWITTER_KEY,
  TWITTER_SECRET,
  '1.0',
  TWITTER_CALLBACK_URI,
  'HMAC-SHA1'
)
