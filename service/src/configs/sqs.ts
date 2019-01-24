import { QueueConsumerConfig } from '../consumer'
import { POLLING_INTERVAL, SQS_URL } from './index'

export const config = new class implements QueueConsumerConfig {
  Interval: number = parseInt(POLLING_INTERVAL)
  QueueUrl: string = SQS_URL
}
