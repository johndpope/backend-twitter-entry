import * as OAuth from 'oauth'
import { Method } from './Method'
import { Response } from './Response'
import { ActionConfig } from './ActionConfig'

export class Action {
  constructor (
    private client: OAuth,
    private config: ActionConfig
  ) {
    //
  }

  /**
   * Posts authorized request to Twitter API.
   *
   * @return {Promise<Response>}
   */
  public perform () : Promise<Response> {
    return new Promise((resolve) => {
      /**
       * Puts together the correct url, request parameters and tokens.
       *
       * @var {any[]}
       */
      const args: any[] = this.prepareRequest(this.config.method, this.config.id)

      // Makes an OAuth request.
      this.client.post(
        ...args,
        (e, body, info) => resolve(new Response(e, body, info))
      )
    })
  }

  /**
   * Creates a post object for like Twitter action.
   *
   * @param {Method} method
   * @param {string} id
   * @return {any[]}
   */
  private prepareRequest (method: Method, id: string) : any[] {
    let url
    let params

    switch (method) {
      case Method.LIKE:
        url = `https://api.twitter.com/1.1/favorites/create.json`,
        params = { id }
        break

      case Method.FOLLOW:
        url = `https://api.twitter.com/1.1/friendships/create.json?user_id=${id}&follow=false`,
        params = null
        break

      case Method.RETWEET:
        url = `https://api.twitter.com/1.1/statuses/retweet/${id}.json`,
        params = null
        break
    }

    return [url, this.config.token, this.config.tokenSecret, params, null]
  }
}
