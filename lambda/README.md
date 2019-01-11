# Push to SQS lambda
This lambda stands behind API gateway and pushes new requests into SQS.

Requests are then picked up from SQS by the autoentry service.

## Request
`POST` requests made to API Gateway have to have `Authorization` token in format `Bearer {user_id}-{access_token}`.
This is then authorized in authorizer and lambda gets tokens in `event.requestContext.authorizer`.

In event body, there has to be an array of objects that have following properties:
- `method` which is a string enum with possible values of `like`, `follow` or `retweet`
- `id` which is an information for the `method` as to which entity is the method bond to

## Response
Unless something goes wrong, the lambda will always return empty `202` response.

### [403] NotAuthorized
This error is returned if tokens are not in correct format.

### [422] InvalidActions
Each action has to have `method` and `id`.

### [500] InternalServerError
On unexpected errors such as failed SQS connection or unsuccessful JSON parsing.
