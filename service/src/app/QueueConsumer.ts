import * as AWS from 'aws-sdk'
import { Message } from './Message'
import { ListenerBag } from './ListenerBag'
import { QueueConsumerRequest } from './QueueConsumerRequest'

export class QueueConsumer {

  /**
   * Listener bag to publish messages to.
   *
   * @var {ListenerBag<Message>}
   */
  public onMessage: ListenerBag<Message> = new ListenerBag()

  /**
   * Listener bag to publish errors to.
   *
   * @var {ListenerBag<Error>}
   */
  public onError: ListenerBag<Error> = new ListenerBag()

  /**
   * Interval id that polls the queue.
   *
   * @var {NodeJS.Timeout}
   */
  private runnable: NodeJS.Timeout

  /**
   * @constructor
   *
   * @param {AWS.SQS} sqs
   * @param {QueueConsumerRequest} request
   */
  constructor (
    private sqs: AWS.SQS,
    private request: QueueConsumerRequest
  ) {
    //
  }

  /**
   * Starts polling in interval.
   */
  public run () : void {
    this.runnable = setInterval(() => {
      // Polls data, puts it into message and sends it to the listeners.
      // Also catches errors and handles them.
      this.poll()
        .then(messages => messages.forEach(m => this.onMessage.dispatch(m)))
        .catch(e => this.onError.dispatch(e))
    }, this.request.Interval)
  }

  /**
   * Clears next and every subsequential scheduled polling.
   */
  public stop () : void {
    clearInterval(this.runnable)

    this.runnable = undefined
  }

  /**
   * Whether the consumer is polling or not.
   *
   * @return {boolean}
   */
  public isRunning () : boolean {
    return this.runnable === undefined
  }

  /**
   * Polls the sqs and emits appropriate events.
   *
   * @return {Promise<Message[]>}
   */
  private async poll () : Promise<Message[]> {
    const { Messages } = await this.sqs
      .receiveMessage(this.request)
      .promise()

    if (!Array.isArray(Messages)) {
      return []
    }

    return Messages.map(raw => new Message(this.sqs, this.request.QueueUrl, raw))
  }
}
