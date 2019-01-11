export class MessageBody {
  access_token: string

  access_token_secret: string

  method: string

  id: string|number

  principalId: string

  /**
   * @constructor
   *
   * @param {any} data
   */
  constructor (data) {
    if (!data || typeof data !== 'object') {
      throw new Error('Message has empty body object')
    }

    const { access_token, access_token_secret, method, principalId, id } = data

    if (!access_token || !access_token_secret || !method || !id || !principalId) {
      throw new Error('Message body has missing parameters.')
    }

    this.id = id
    this.method = method
    this.principalId = principalId
    this.access_token = access_token
    this.access_token_secret = access_token_secret
  }
}

export class Message {

  /**
   * Message body.
   *
   * @var {MessageBody}
   */
  private body: MessageBody

  /**
   * Message id.
   *
   * @var {string}
   */
  private id: string

  /**
   * Message receipt handle.
   *
   * @var {string}
   */
  private receipt: string

  /**
   * @constructor
   *
   * @param {string} id
   * @param {any} body
   * @param {receipt} receipt
   */
  constructor (id: string, body: any, receipt: string) {
    this.id = id
    this.receipt = receipt
    this.body = new MessageBody(body)
  }
}
