import * as AWS from 'aws-sdk'
import { config } from './configs/sqs'
import { Action } from './queue/Action'
import { QueueConsumer } from './consumer'
import transformer from './queue/transformer'

const sqs = new AWS.SQS()

const app: QueueConsumer<Action> = new QueueConsumer(sqs, config, transformer)
