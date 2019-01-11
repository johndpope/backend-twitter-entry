
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
   * AWS SQS service.
   *
   * @var {AWS.SQS}
   */
  private sqs: AWS.SQS

  /**
   * SQS queue url.
   *
   * @var {string}
   */
  private queue: string

  /**
   * Message body.
   *
   * @var {MessageBody}
   */
  private body: MessageBody

  /**
   * Message receipt handle.
   *
   * @var {string}
   */
  private receipt: string

  /**
   * @constructor
   *
   * @param {AWS.SQS} sqs
   * @param {string} queue
   * @param {any} content
   */
  constructor (sqs: AWS.SQS, queue: string, content: any) {
    this.sqs = sqs
    this.queue = queue
    this.receipt = content.ReceiptHandle
    this.body = new MessageBody(JSON.parse(content.Body))
  }

  /**
   * Changes visibility timeout of the message.
   *
   * @param {number} secs
   * @return {Promise<any>}
   */
  public changeVisibility (secs: number) : Promise<any> {
    const request: any = {
      QueueUrl: this.queue,
      ReceiptHandle: this.receipt,
      VisibilityTimeout: secs,
    }

    return this.sqs.changeMessageVisibility(request).promise()
  }

  /**
   * Deletes the message from queue.
   *
   * @return {Promise<any>}
   */
  public delete () : Promise<any> {
    const request: any = {
      QueueUrl: this.queue,
      ReceiptHandle: this.receipt,
    }

    return this.sqs.deleteMessage(request).promise()
  }

  /**
   * Getter for message body.
   *
   * @return {MessageBody}
   */
  public getBody () : MessageBody {
    return this.body
  }
}
