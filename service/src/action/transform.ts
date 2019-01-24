import client from './Client'
import { Action } from './Action'
import { Method } from './Method'
import { ActionConfig } from './ActionConfig'

/**
 * Transforms sqs message body into desired type.
 *
 * @param {string} body
 * @return {}
 */
export default (body: string) : Action => {
  const content: any = JSON.parse(body)

  const method: Method = {
    like: Method.LIKE,
    follow: Method.FOLLOW,
    retweet: Method.RETWEET,
  }[content.method]

  if (method === undefined) {
    throw new Error('Method has to be {like|follow|retwet}!')
  }

  const config: ActionConfig = {
    method,
    id: content.id,
    token: content.access_token,
    tokenSecret: content.access_token_secret
  }

  return new Action(client, config)
}
