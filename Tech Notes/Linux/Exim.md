# Exim

## Commands

> List of emails currently in queue:

```shell
exim -bp
```

> See the count of emails backed up

```shell
exim -bpc
```

> View Message Body:

```shell
exim -Mvb message-id
```

> Remove all Emails with joe@example as the sender:

```shell
exiqgrep -i -f '<joe@example.com>' | xargs exim -Mrm
```

> emove all frozen emails

```shell
exiqgrep -z -i | xargs exim -Mrm
```

## Understanding the exim log

The first thing when looking at a log is to determine what happened to it. Let's take a quick look at the breakdown of those entries.

Direction and status:

| Item        | Description |
| ----------- | ----------- |
| <=          | Indicates the arrival of a message to Exim for handling |
| =>          | Shows a normal message delivery |
| ->          | Additional address for the same delivery, i.e. an Email forwarder |
| >>          | This option requests delivery be attempted while the item is being received |
| *>          | delivery suppressed by -N |
| **          | delivery failed; address bounced |
| ==          | delivery deferred; temporary problem |
| <>          | For `<>`. Additionally, you will often find A bounce message is shown with the sender address `<>` |
| (=          | message fakereject |

Logs:

| Item        | Description |
| ----------- | ----------- |
| U=          | Local user |
| T=          | On `<=` lines - Topic / Subject. On `=> ** ==` lines - The relay used to transmit the message, e.g. remote_smtp, local_delivery |
| R=          | The router used (routers in this sense are those configured in the exim conf dictating how to route the mail). The address immediately following “<=` is the envelope sender address. A bounce message is shown with the sender address “<>”, and if it is locally generated, this is followed by an item of the form: R=message id. |
| H=          | Represents the host name and IP address |
| A=          | If A= is present, then SMTP AUTH was used for the delivery |
| P=          | On “<=” lines - Protocol used. On “=> **” This is the return_path_on_delivery |
| S=          | Delivery size of the message |
| ID=         | Incoming message ID |
| from        | From whom the mail was received |
| for         | Who the email is for |
| X=          | TLS cipher suite |
| C=          | SMTP confirmation on delivery (failure or success) |
| S=          | Size of message |
| CV=         | Certificate Verification Status |
| CWD=        | Current working directory |

## Troubleshooting massive Exim backlogs

`exim -bpc` <- Gives you count of emails backed up

You then run exim -bp and see a suspicious message ID, you can run it through this

```shell
exim -Mvh <MESSAGE_ID>
```

Key parts are:

- `host_address` (IP that is logging in and sending the spam)
- `host_auth` dovecot_plain (Confirms that the username/password of the email account is compromised)
- `auth_id` (Says which email account is compromised)

It's also worth checking if the IP comes from somewhere suss

Then block it with `csf -d 91.197.135.136 "spammy IP"`

Others:

```shell
exiqgrep -ir julia@athertonrealestate.com.au | xargs exim -Mrm
exiqgrep -i -f julia@athertonrealestate.com.au | xargs exim -Mt
exiqgrep -i -f julia@athertonrealestate.com.au | xargs exim -Mf
exim -bp | awk '/<julia@athertonrealestate.com.au>/{print $3}' | xargs exim -Mrm
```

## Troubleshooting 421 too many concurrent connections error

Choose one of these commands to run to see which IP’s are connecting the most:

```shell
grep 'temporarily rejected' /var/log/exim_mainlog | grep -oP 'H=..*.\d{3}' | cut -d [ -f 2 | cut -d ] -f 1 | sort | uniq -c | sort -n | tail
grep 'temporarily rejected' /var/log/exim_mainlog | grep -oP 'H=..*.\d{3}' | awk -F[ '{prt $2}' | awk -F] '{print $1}' | sort | uniq -c | sort -n | tail
```

## Null Sender

```shell
ssh -t -q vmse01.mailcluster.com.au 'echo -e "Outgoing:               $(exim -C /var/lib/exim4/outgoing-config.autogenerated  -bpc)\n";echo -e "Outgoing (Null Sender): $(exim -C /var/lib/exim4/outgoing-config.autogenerated -qGnull-sender -bpc)\n";echo -e "Incoming:               $(exim -C /var/lib/exim4/incoming-config.autogenerated -qGnull-sender -bpc)\n";echo -e "Incoming (Null Sender): $(exim -C /var/lib/exim4/incoming-config.autogenerated  -bpc)\n";'
```

## Others

```shell
grep -lr 'Mail delivery failed' /var/spool/exim/input/ | sed -e 's/^.*\/\([a-zA-Z0-9-]*\)-[DH]$/\1/g' | xargs exim -Mrm
service dovecot restart;service exim restart;exim -bp | awk '/^ *[0-9]+[mhd]/{print "exim -Mrm " $3}' | bash
```

> Locate directory of scripts sending to exim

```shell
grep cwd /var/log/exim_mainlog | grep -v /var/spool | awk -F"cwd=" '{print $2}' | awk '{print $1}' | sort | uniq -c | sort -n
```

> Display list of scripts using POST command in Apache logs

```shell
grep POST /home/user1/access-logs/example.com | awk '{print $7}' | sort -n | uniq -c | sort -n
```

> Display what IP's are using script in Apache access logs

```shell
grep "mailer.php" /home/userna5/access-logs/example.com | awk '{print $1}' | sort -n | uniq -c | sort -n
```

> show subjects of all emails, locates duplicate subjects

```shell
awk -F"T=\"" '/<=/ {print $2}' /var/log/exim_mainlog | cut -d\" -f1 | sort | uniq -c | sort -n
```

> show user sending particular subject

```shell
grep "test subject" /var/log/exim_mainlog | awk '{print $5}' | sort | uniq -c | sort -n
```

> show IP's using particular account

```shell
grep "<= user01@example.com" /var/log/exim_mainlog | grep -o "\[[0-9.]*\]" | sort -n | uniq -c | sort -n
```

> clear exim mail queue - SEARCHTERM

```shell
exim -bp | awk '/SEARCHTERM/{print $3}' | xargs exim -Mrm | bash
```

> clear exim mail queue - Spread out names (when sender is on next line)

```shell
exim -bp | paste - - - | grep "_*@kingsfordsmithparking.com.au" | awk '{print $3}' | grep -v "^$" | xargs exim -Mrm
```

> Grabs the search term and line before it, filters only message ID and removes them

```shell
exim -bp | grep -B 1 <SEARCHTERM> | grep \< | awk '{print $3}' | xargs exim -Mrm
```

> Grabs the receiver (line after exim ID), Sorts based on number of times in exim. This is to see the user receiving the most emails

```shell
exim -bp | grep -E -v '^ *[0-9]+'\|^$ | sed 's/ *//g' | sort | uniq -c | sort -n
```

> Searches all message ID’s for the string “Subject: BLAH” (CHANGE THIS) from the exim -Mvh output and removes those

```shell
for i in $(exiqgrep -i); do MSG="Subject: BLAH"; if [[ -n $(exim -Mvh $i | grep "${MSG}") ]]; then echo "Removing $i as it matches - ${MSG}"; exim -Mrm $i; fi; done
```

> Alternatively to the above, if all bounces are from ‘<>’ then this will be way easier and quicker

```shell
exim -bp | awk '/<>/{print $3}' | xargs exim -Mrm
```

> Trace a bounce back email to it’s source in exim_mainlog

```shell
grep 1iN4Ps-00B3ZR-6B /var/log/exim_mainlog | awk '/<>/{print substr($6,3)}' | xargs -I {} grep {} /var/log/exim_mainlog
```