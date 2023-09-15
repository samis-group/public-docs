# CSF

[Resource](https://www.hostdime.com/kb/pages/viewpage.action?pageId=2228418)

## Commands

> Temp allow IP for 2 Hours

```shell
csf -ta [IP_address] 7200 'Temp Allow'
```

> TEMP DENY IP FOR 2 HOURS

```shell
csf -td [IP_address] 7200 'Temp Deny'
```

> PERM ALLOW IP

```shell
csf -a [IP.add.re.ss]
```

> PERM DENY IP

```shell
csf -d [IP_address] 'deny'
```

> GREP IP

```shell
csf -g [IP_address]
```

> ALLOW REMOVE IP

```shell
csf -ar [IP.add.re.ss]
```

> DENY REMOVE IP

```shell
csf -dr [IP.add.re.ss]
```

> TEMP ALLOW/DENY REMOVE

```shell
csf -tr [IP.add.re.ss]
```

> RESTART ALL (CSF incl. LFD)

```shell
csf -ra
```

> DISABLE CSF

```shell
csf -x
```

> ENABLE CSF

```shell
csf -e
```

> CSF STATUS

```shell
Csf -l
```

Seconds -> days conversions:

86400 -> 1 day

172800 -> 2 days

259200 -> 3 days

604800 -> 7 days

## Blocking Countries

Remove the ports in TCP_IN and UDP_IN etc, put them in CC_ALLOW_PORTS etc.

[Country code list](http://www.analysespider.com/ip2country/country_code.html).

## Whitelisting ports for certain IP's

```shell
echo "tcp|in|d=3306|s=58.96.30.250 # Whitelisting Client's IP Address for MySQL Port 3306 - HLL-759-78583" >> /etc/csf/csf.allow && csf -ra
echo "tcp|in|d=3306|s=101.0.100.18 # Whitelisting Staff IP Address for MySQL Port 3306 - HLL-759-78583" >> /etc/csf/csf.allow && csf -ra
# NOT THE BEST IDEA, JUST AN EXAMPLE FOR MULTIPLE THINGS IN ONE LINE
tcp/udp|in/out|s/d=3306|s/d=0.0.0.0/0
```

## Disabling Alerts / Email notifications

Disable the following if alerting is causing exim backlog:

`LF_EMAIL_ALERT`

`LF_PERMBLOCK_ALERT`

`LF_NETBLOCK_ALERT`

`LF_DISTFTP_ALERT`

`LF_DISTSMTP_ALERT`

`LT_EMAIL_ALERT`

`CT_EMAIL_ALERT`
