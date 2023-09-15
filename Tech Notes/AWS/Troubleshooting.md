# Troubleshooting in AWS

## Access denied issues

1. Modify the role you are using to allow you to assume the role you want to test
2. Assume the role with: aws sts assume-role
3. Run the aws command you want to run with the role. e.g. `aws apigateway tag-resource --resource-arn $stage_arn --tags MyKey=MyValue`
4. Read the error you get and add the right permission to the role to perform this task
