const Sqs = require('./Sqs')
const AWS = require('aws-sdk')
const Action = require('./Action')

AWS.config.update({region: 'eu-west-1'})

/**
 * @param {any} event
 * @return {Promise<any>}
 */
module.exports = async (event) => {
  /**
   * Class that pushes actions to sqs.
   *
   * @var {Sqs}
   */
  const sqs = new Sqs(new AWS.SQS(), event.requestContext.authorizer)

  // Parse the event body with JSON information.
  const { actions } = JSON.parse(event.body)

  /**
   * Array of messages to be pushed to sqs.
   *
   * @var {string[]}
   */
  const messages = actions.map(action => Action.from(action).toMessage())

  return Promise.all(
    messages.map(message => sqs.push(message)),
  )
}
