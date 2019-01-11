import * as OAuth from 'oauth'
import { ActionBag } from './ActionBag'
import { Message, MessageBody } from '../app/index'

export class Action {
  /**
   * Message that holds information on what actions should be performed
   * and what credentials should be user.
   *
   * @var {MessageBody}
   */
  private message: MessageBody

  /**
   * Posts on Twitter.
   *
   * @var {OAuth}
   */
  private client: OAuth

  /**
   * @constructor
   *
   * @param {OAuth} client
   * @param {Message} message
   */
  constructor (client: OAuth, message: Message) {
    this.client = client
    this.message = message.getBody()
  }

  /**
   * Posts authorized request to Twitter API.
   *
   * @return {Promise<void>}
   */
  public perform () : Promise<any> {
    return new Promise((resolve, reject) => {
      const { url, params } = ActionBag.from(this.message.method, this.message.id)

      this.client.post(
        url,
        this.message.access_token,
        this.message.access_token_secret,
        params,
        null,
        (error, body) => error ? reject(error) : resolve(body)
      )
    })
  }
}
