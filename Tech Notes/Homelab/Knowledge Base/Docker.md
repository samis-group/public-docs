
# Docker

## InfluxDB

### Flux

[Documentation](https://docs.influxdata.com/influxdb/cloud/query-data/flux/)

Example ‘Flux DB’ query to map value field with a more human readable string for grafana to display in legend:

```flux
from(bucket: "home_assistant")  
 |> range(start: v.timeRangeStart, stop: v.timeRangeStop)  
 |> filter(fn: (r) => r["entity_id"] == "dining_sami_pc_cpu_load")  
 |> filter(fn: (r) => r["_field"] == "value")  
 |> aggregateWindow(every: 30s, fn: median, createEmpty: false)  
 |> map(fn: (r) => ({ _value:r._value, _time:r._time, _field:"CPU Used" }))
```

[Regex in flux](https://docs.influxdata.com/influxdb/cloud/query-data/flux/regular-expressions/)

### Using InfluxQL instead of Flux on Influxdb v2+

[Resource to get it working](https://github.com/VictorRobellini/pfSense-Dashboard/issues/33#issuecomment-804361000)

Use IP of the docker host instead of hostname because the container doesn’t have DNS access out. Use admin token and org name (not id).

```bash
influx config create --config-name influxadm_config \
 --host-url http://X.X.X.X:8086 \
 --org NAME \
 --token XXXXXXXXXXXXXXXXXXXXXXXXXX \
 --active
```

Now map the bucket (use bucket id, not name):

```bash
influx v1 dbrp create \
 --db pfsense \
 --rp autogen \
 --bucket-id XXXXXXXXXXXX \
 --default
```

Now the v1 database is mapped to the v2 bucket so the old influxQL queries can happen on the Flux buckets.

[To test an InfluxQL query on a DB that is mapped to a bucket, use curl](https://docs.influxdata.com/influxdb/v2.0/query-data/influxql/#query-a-mapped-bucket-with-influxql)

#### Adding the data source

[Add the token as a header](https://github.com/influxdata/influxdb/issues/20761#issuecomment-907701204)

#### If you remove the bucket/update the token for pfsense

First, jump into pfsense telegraf config, and update the token at the bottom (in the config box)

[Then configure influxdb by following step 5 on this post](https://github.com/VictorRobellini/pfSense-Dashboard/issues/33#issuecomment-804361000)

TL;DR: Jump into the influxdb container and issue the commands:

1. Update your auth token: `influx config update --config-name influxadm_config --token "XXXXXXXXXXXXXXX=="`
2. Map the DB to the new DB ID:

```bash
influx v1 dbrp create \
 --db pfsense \
 --rp autogen \
 --bucket-id XXXXXXXXX \
 --org-id XXXXXXXXXXX \
 --default
```

#### Telegraf Configuration to send to influxdb_v2

Configuration for sending metrics to InfluxDB:

```config
[[outputs.influxdb_v2]]
  urls = ["http://IP_OR_HOSTNAME:8086"]
  token = "TOKEN_HERE"
  organization = "ORG_NAME"
  bucket = "BUCKET_NAME"
```

#### Adding User (v1)

```bash
sudo docker exec -it influxdb /bin/bash
influx v1 auth create --username pfsense --write-bucket <STRING_ID> --read-bucket <STRING_ID> -o <ORG_NAME> --password <PASSWORD>
# Then confirm with command:
influx v1 auth list
```

## Grafana

### Creating Alert

**TBD**.

### Loki and PromQL

Parse traefik json logs example:

```promql
{job="traefik.log"} | json | OriginStatus =~ "500"
RequestHost =~ hass.domain.com
ClientHost =~ XX.XX.XX.XX (your WAN IP)
```

## Home Assistant (HASS)

### Conbee II

To setup the conbee II

## Authelia

In order to ensure the LAN networked is bypassed for authentication to specific services in the authelia config, you need to override DNS lookups for your domain address (in this example, example.com, fittingly).

[I specifically use pfsense as a DNS resolver and set it up using Host Overrides:](https://docs.netgate.com/pfsense/en/latest/services/dns/resolver-host-overrides.html)
![pfsense dns resolver](/artifacts/homelab/images/authelia-pfsense-dns.png)

## MQTT

To Subscribe and Publish messages to the queue, SSH into home assistant:

```bash
mosquitto_sub -h 10.10.0.20 -p 1883 -u <mqtt-user> -P <PASS> -v -t "#"
mosquitto_pub -h 10.10.0.20 -p 1883 -u <mqtt-user> -P <PASS> -t hass/test -m "test"
```

### In Docker

```bash
docker run --rm -it hivemq/mqtt-cli shell
con -h <docker_ip/fqdn> -p <port> -u <user> -pw <pass>
sub -s -t "#"
```

[Resource for commands](https://hivemq.github.io/mqtt-cli/docs/shell/subscribe/)

## Motioneye

### Default Logins

Username: `admin`

Password: *<leave_blank>*

### RTSP URL

This is for my reolink cameras.

*Note*: can omit `username:pass@` for just the URL link

```url
rtsp://username:password@X.X.X.X:554/h265Preview_01_main
```
