import * as AWS from 'aws-sdk'

export interface QueueConsumerRequest extends AWS.SQS.Types.ReceiveMessageRequest {
  Interval: number
}
