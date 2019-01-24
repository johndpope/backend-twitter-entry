/**
 * Resolves enviroment variable or defaults it.
 *
 * @throws {Error}
 * @param {string} key Key in process.env
 * @param {string} def Default value if the key is missing from env vars.
 * @return {string}
 */
export function env (key: string, def?: string) : string {
  const val: string = process.env[key] || def

  if (val === undefined) {
    throw new Error(`
      Enviroment variable ${key}
      is not set nor has a default value.
    `)
  }

  return val
}

export const SQS_URL = env('SQS_URL')
export const S3_PATH = env('S3_PATH')
export const S3_BUCKET = env('S3_BUCKET')
export const TWITTER_KEY = env('TWITTER_KEY')
export const TWITTER_SECRET = env('TWITTER_SECRET')
export const TWITTER_CALLBACK_URI = env('TWITTER_CALLBACK_URI')

export const WAIT_TIME = env('WAIT_TIME', '5')
export const AWS_REGION = env('AWS_REGION', 'eu-west-1')
export const POLLING_INTERVAL = env('POLLING_INTERVAL', '1000')
export const VISIBILITY_TIMEOUT = env('VISIBILITY_TIMEOUT', '30')
