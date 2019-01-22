import * as AWS from 'aws-sdk'

export class Persistor {
  constructor (private s3: AWS.S3, private config: any) {
    //
  }

  public retrieve (id: string) : Promise<any> {
    const req: any = {
      Bucket: this.config.bucket,
      Key: `${this.config.path}/${id}`
    }

    return this.s3.getObject(req).promise()
  }
}
