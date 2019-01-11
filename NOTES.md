# Twitter APIs Research

## Resources
- https://developer.twitter.com/en/docs/basics/rate-limiting
- https://help.twitter.com/en/rules-and-policies/twitter-rules
- https://blog.cotten.io/common-twitter-error-codes-6b324396042e
- https://aws.amazon.com/blogs/opensource/rust-runtime-for-aws-lambda/
- https://docs.aws.amazon.com/AWSSimpleQueueService/latest/APIReference/API_ChangeMessageVisibility.html

## Requirements
This service should be able to track the activity of Prizeprofile users and distribute their actions across larger window span to avoid breaking Twitter Rules:

> Some of the factors that we take into account when determining what conduct is considered to be spamming include:
> if you have followed and/or unfollowed a large number of accounts in a short time period, particularly by automated means (aggressive following or follower churn);
> if you are randomly or aggressively engaging with Tweets (e.g., likes, Retweets, etc.) or users (e.g., following, adding to lists or Moments, etc.) to drive traffic or attention to unrelated accounts, products, services, or initiatives;

In order to achive that, we will have to implement some smarter rules than just the `x-rate-limit` headers checking.

## Service evaluation function
The `x-rate-limit` headers apply for future requests, we so need an object that holds temp user data about
their previous actions. On building this object, we should call Twitters APIs for checking currect limitting. Then we can determine the delay for next request. Rate limits are easy to implement. This solution does not scale.

## Flows

### User to API
`POST` -> `API GATEWAY` -> `Authorizer` -> `lambda-autoentry-push-to-sqs` -> `SQS`

### Microservice to Twitter
`SQS` -> `SERVICE:EVAL` -> `TWITTER` -> `SERVICE:UPDATE_STATE`
