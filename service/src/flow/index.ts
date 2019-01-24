import { Action } from '../action'
import { QueueMessage } from '../consumer'

/**
 * Starts new flow with received message.
 *
 * @param {QueueMessage<Action>} message
 */
export const flow: (m: QueueMessage<Action>) => void = (message) => {
  console.log('Starting new flow with', message)
}
