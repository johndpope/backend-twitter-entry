# Push to SQS lambda
This lambda stands behind API gateway and pushes new requests into SQS.

Requests are then picked up from SQS by the autoentry service.