# CLI

[Reference here](https://docs.aws.amazon.com/cli/latest/)

## Setup

[Install it based on your OS](https://docs.aws.amazon.com/cli/latest/userguide/install-cliv2.html).

Config location: `~/.aws/config`

## Usage

```bash
aws --profile <profile_name> s3 ls
```

## Examples

### [s3](https://docs.aws.amazon.com/cli/latest/reference/s3/index.html)

```bash
aws --profile rest-connect-nonprod s3 cp ~/ s3://bucket/ --recursive --exclude "*" --include "*.jpg"
```

```bash
aws --profile rest-connect-nonprod s3 sync ./deployment/ s3://rest-connect-transcribe/deployment/
```

### [ec2](https://docs.aws.amazon.com/cli/latest/reference/ec2/index.html)

> Grab all ec2 instances that don’t have the “Platform” key, and return the value for the tag ‘Name’

```bash
aws ec2 describe-instances --query 'Reservations[].Instances[?!not_null(Platform)].Tags[][?Key==`Name`].Value[]'
```

Note:  
`–query` uses [JMESPath](https://jmespath.org/) to parse json.
