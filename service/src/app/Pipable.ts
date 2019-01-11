import { Message } from './Message'

export interface Pipable {
  /**
   * Receives a message.
   *
   * @param {Message} message
   */
  receive (message: Message) : void
}
