
module.exports = class Sqs {
  /**
   * @constructor
   *
   * @param {AWS.SQS} sqs
   * @param {any} tokens
   * @param {string} tokens.access_token
   * @param {string} tokens.access_token_secret
   */
  constructor (sqs, tokens) {
    if (
      !tokens || typeof tokens !== 'object' ||
      !tokens.access_token || !tokens.access_token_secret
    ) {
      throw ({ status: 403, error: 'NotAuthorized' })
    }

    this.sqs = sqs
    this.tokens = tokens
  }

  /**
   * Pushes new message to SQS.
   *
   * @param {any} body
   * @return {Promise<any>}
   */
  push (body) {
    return sqs.sendMessage({
      MessageBody: body,
      QueueUrl: process.env.QUEUE_URL,
      MessageGroupId: Date.now() + [],
    }).promise()
  }
}
