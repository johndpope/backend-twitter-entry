import * as AWS from 'aws-sdk'
import { Pipable } from './Pipable'
import { Message } from './Message'
import { SqsRequest } from './SqsRequest'

export class App {

  /**
   * Queue polling interval.
   *
   * @var {number}
   */
  public static INTERVAL: number = 1000

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
   * Message listener.
   *
   * @var {any}
   */
  private listeners: any = {
    message: [],
    error: []
  }

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
   * @param {string} queue
   */
  constructor (sqs: AWS.SQS, queue: string) {
    this.sqs = sqs
    this.queue = queue
  }

  /**
   * Sets app listener.
   *
   * @param {Pipable} listener
   * @return {App}
   */
  public pipe (listener: Pipable) : App {
    this.listeners.message.push(listener)

    return this
  }

  /**
   * Sets app listener.
   *
   * @param {Function} receive
   * @return {App}
   */
  public onError (receive: Function) : App {
    this.listeners.error.push({ receive })

    return this
  }

  /**
   * Starts polling in interval.
   */
  public start () : void {
    this.runnable = setInterval(() => {
      this.poll()
        .catch(e => this.trigger('error', e))
    }, App.INTERVAL)
  }

  /**
   * Clears next scheduled polling.
   */
  public stop () : void {
    clearInterval(this.runnable)
  }

  /**
   * Triggers
   *
   * @param {string} event
   * @param {any} payload
   */
  protected trigger (event: string, payload: any) : void {
    for (const listener of this.listeners[event]) {
      try {
        listener.receive(payload)
      } catch (e) {
        this.trigger('error', `${event} listener crashed: ${e.message}`)
      }
    }
  }

  /**
   * Polls the sqs and emits appropriate events.
   *
   * @return {Promise<void>}
   */
  private async poll () : Promise<void> {
    const { Messages } = await this.sqs
      .receiveMessage(new SqsRequest(this.queue))
      .promise()

    for (const message of Messages) {
      try {
        const { MessageId, Body, ReceiptHandle } = message

        this.trigger('message', new Message(MessageId, JSON.parse(Body), ReceiptHandle))
      } catch (e) {
        this.trigger('error', e)
      }
    }
  }
}

