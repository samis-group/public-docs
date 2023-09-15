# Zabbix

## Adding items to a single host for testing

1. Go to Configuration -> Hosts.

## Creating a zabbix check

[Documentation](https://www.zabbix.com/documentation/3.2/manual/config)

It’s good to pull up one that’s already created and use it as a template for yours. This example, is a custom script we created and we are getting a zabbix proxy to probe this script and the script will return a value.

**Example**:

1. First we create the item (that will collect the data):
   1. Go to Configuration > Templates
   2. Click on a template which contains the hosts you wish to create a check for, or create a new template altogether (not explained here)
   3. Click “Create Item” on the top right corner.
   4. Fill in the details as per the documentation or another item as a template.
   5. Click add
2. Then we create the trigger that will alert:
   1. Click “Triggers”
   2. Click “Create Trigger” on the top right corner

## Using zabbix_get to probe a value from zabbix-proxy

**Example**:

```shell
zabbix_get -s vmsh50.ha-node.net -p 10050 -k custom.linksafe_matches
```
