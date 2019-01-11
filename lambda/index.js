const run = require('./src/main')

exports.handler = async (event, _, callback) => {
  try {
    await run(event)

    return callback(null, {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*'
      }
    })
  } catch (e) {
    console.error(e)

    const status = e.status || 500
    const error = e.error || 'InternalServerError'

    return callback(null, {
      statusCode: status,
      headers: {
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify({ error })
    })
  }
}
