# Cloudwatch

## Log Insights

If the message contents are formatted in json, cloudwatch logs insights already makes those properties available to you, here's an example insights query to get you extracting the data you need if the @message contents are already in `json`:

```cwlogs
fields @timestamp, @message
| filter level!="debug"
| filter level!="info"
| sort @timestamp desc
```
