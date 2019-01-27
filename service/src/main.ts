import * as AWS from 'aws-sdk'
import { config } from './configs/sqs'
import { transform, Action } from './action'
import { QueueConsumer } from '@bausano/sqs-consumer'

/**
 * Creates new sqs consumer with configuration loaded from
 * enviroment variables and tranform function that assigns
 * type of Action as message body.
 *
 * @var {QueueConsumer<Action>}
 */

const app: QueueConsumer<Action> = new QueueConsumer(
  new AWS.SQS(),
  config,
  transform
)

/**
 * Adds message listener that handle the message.
 * It checks the cache for recent user actions,
 * evaluates if the user did not hit their limits
 * and either returns the message back to the queue
 * with changed visibility or processses the message
 * and deletes it.
 */

import { flow } from './flow'

app.onMessage.addListener(m => flow(m))

/**
 * If the app catches an error, it publishes it
 * to an SNS topic, which then resends it as an email,
 * and prints it to console.
 */

import { publish } from './notification'

app.onError
  .addListener(console.log)
  .addListener(e => publish(e))

/**
 * Starts the queue consumer.
 */

app.run()
