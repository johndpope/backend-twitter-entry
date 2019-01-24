import client from './Client'
import { Action } from './Action'
import { ActionConfig } from './ActionConfig'

/**
 * Transforms sqs message body into desired type.
 *
 * @param {string} body
 * @return {}
 */
export default (body: string) : Action => {
  const content: any = JSON.parse(body)

  const config: ActionConfig = {
    method: content.method,
    id: content.id,
    token: content.access_token,
    tokenSecret: content.access_token_secret
  }

  return new Action(client, config)
}
