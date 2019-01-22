import * as dotenv from 'dotenv'
import * as AWS from 'aws-sdk'
import { App } from './app/index'
import { Listener } from './core/Listener'
import { Persistor } from './core/Persistor'

dotenv.config()

AWS.config.update({
  region: process.env.AWS_REGION,
  accessKeyId: process.env.AWS_ACCESS_TOKEN,
  secretAccessKey: process.env.AWS_ACCESS_TOKEN_SECRET
})

const app = new App(new AWS.SQS(), process.env.QUEUE_URL)

app.onError(e => console.log(`[${new Date()}] Error:`, e))

app.pipe(new Listener(new Persistor(new AWS.S3(), {
  bucket: process.env.S3_BUCKET,
  path: process.env.S3_PATH,
})))

app.start()
