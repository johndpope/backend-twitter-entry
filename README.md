# Twitter autoentry
This repository consists of a lambda that pushes user requests to SQS
and a microservice that reads these requests and based on previous calls
it fulfills them in a manner that prevents app or user getting flagged
for being a spammy account.
