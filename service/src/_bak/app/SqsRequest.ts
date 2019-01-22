import * as AWS from 'aws-sdk'

export class SqsRequest implements AWS.SQS.ReceiveMessageRequest {

  /**
   * @inheritdoc
   */
  public QueueUrl: string

  /**
   * @inheritdoc
   */
  public MaxNumberOfMessages: number = 10

  /**
   * @inheritdoc
   */
  public VisibilityTimeout: number = parseInt(process.env.VISIBILITY_TIMEOUT) || 15

  /**
   * @inheritdoc
   */
  public WaitTimeSeconds: number = parseInt(process.env.WAIT_TIME) || 0

  /**
   * @constructor
   *
   * @param {string} queue
   */
  constructor (queue) {
    this.QueueUrl = queue
  }
}
