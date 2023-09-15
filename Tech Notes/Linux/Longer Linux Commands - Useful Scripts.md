# Longer Linux Commands / Useful Scripts

## Checking inode usage (file limit)

> Finds large inodes in current working directory

```bash
echo "Detailed inode usage for: $(pwd)" ; for d in `find -maxdepth 1 -type d |cut -d\/ -f2 |grep -xv '\.' |sort`; do c=$(find $d |wc -l) ; printf "$c\t\t- $d\n" ; done ; printf "Total: \t\t$(find $(pwd) | wc -l)\n"
```

> Finds large inode usage directories recursively in /home, sorts output

```bash
find /home -xdev -printf '%h\n' | sort | uniq -c | sort -k 1 -n
```

## IMAP sync test

imapsync --host1 outlook.office365.com --user1 info@preciouspreviews.com.au --password1 **XXXXXX** -host2 vmcp24.digitalpacific.com.au --user2 tester@yourdomain.net.au --password2 **XXXXXX**

**MY TEST IMAPSYNC**:

imapsync --host1 "216.121.104.178" --user1 "info@cheryn.com.au" --password1 **XXXXXXXX** -host2 "somethinglikesami.net" --user2 "sami@somethinglikesami.net" --password2 **XXXXXX**

## Find all .php files in a directory and output header to scan.txt

```bash
find . -type f -name '*.php' -exec echo {} \; -exec head {} \; > scan.txt
```

## List IP's connecting (or sending) in maillog

```bash
grep email@domain /var/log/maillog | awk -F ',' '{print substr($3,6) }' | sort | uniq -c | sort -n
grep email@domain /var/log/maillog | awk '{print $9}' | sort | uniq -c | sort -n
```

## make file editable / non-editable (chattr)

```bash
chattr +ai    # Turn on
chattr -ai    # Turn off
```

## Check if Filesystem is Read Only

> If this returns back with anything, those are mounted as read only. Also adds echo checks.

```bash
grep "[[:space:]]ro[[:space:],]" /proc/mounts | grep -v cagefs; echo "All Systems Operational" > ~/isfsro.txt && cat ~/isfsro.txt && rm -f ~/isfsro.txt
```

## Check disk space on server

[Reference](http://www.tecmint.com/check-linux-disk-usage-of-files-and-directories/)

```bash
find
du
ncdu
```

## FInd IP's attacking a web-server

> Top 10 IP addresses hitting access logs - Real-time

```bash
echo -e "\nTop 10 IP's Accessing Website Resources:\nHits\t | IP Address"; awk '{print $1}' /home/*/access-logs/* | sort | uniq -c | sort -n | tail -n 10 | awk '{print $1 "\t | " $2}'; echo;
```

```bash
> Top 10 IP addresses hitting access logs (by time as well) - Historic
zgrep "16/Apr/2020:13:5" /home/*/logs/* | awk -F ':' '{print $2}' | awk '{print " -> " $1}' | sort | uniq -c | sort -n | tail -10
```

> Same as above except on a per user/domain basis

```bash
awk '{print $1}' /home/$user/access_logs/$domain | sort | uniq -c | sort -n
```

> Finds IP accessing server resources BY POST and sorts most hits by IP

```bash
grep POST /home/*/access-logs/*  | awk '{print $1}' | sort | uniq -c | sort -n
```

> The bolded (date and time) needs adjusting, allows you to scroll through access logs at that time

```bash
grep POST /usr/local/apache/domlogs/* | grep "11/Jan/2017:16" | less -S
```

> Tails all access logs (real time)

```bash
tail -f /home/*/access-logs/*
```

Then geoiplookup IP_ADDRESS

> To block IP if it’s abusing

```bash
csf -d 78.47.205.181 “IP Attacking Server”
```

## RAM issues

```bash
echo -e "\nTop 10 processes of Ram:"; echo -e "USER\t| PID \t| %MEM \t| COMMAND"; ps aux | awk 'BEGIN{OFS="\t"} {print $1, "| " $2, "| " $4, "| " $11}' | sort -k5,5rn -k3r | head -n 10; echo
```

*Then you can*:

```bash
lsof -p <PID>
# or
lsof -lu <user>
```

## Finding what is using SWAP memory

```bash
for file in /proc/*/status ; do awk '/VmSwap|Name/{printf $2 " " $3}END{ print ""}' $file 2>/dev/null; done | sort -nk2 | tail -n 5 | sed -e 's/^/SWAP Used by process: /'
```

## check cron log

Log location -> `/var/log/cron` or `/var/log/syslog` (depending on how syslog is configured to log cron logs)

If a service crashes or OOM's predictably a certain time every time, it's likely that crons are causing the issues.

You can see every users’ cron jobs in here:

```bash
ls /var/spool/cron
```

There's also this directory where crons can be stored:

```bash
/etc/:
    crontab
    cron.d
    cron.daily
    cron.deny
    cron.hourly
    cron.monthly
    crontab
    cron.weekly
```

Then you can use this command to see these users cronjobs:

```bash
crontab -e -u <username>
```

Or you could simply list them out instead of edit them (like cat):

```bash
crontab -l -u <username>
```

## change reserve blocks (ext3 and ext4 File Systems)

> Shows Reserve Blocks (in actual blocks)

```bash
tune2fs -l /<Device> | grep "Reserved"
```

> Manually Sets Reserve Blocks to 5% (Above is L3 script)

```bash
tune2fs -m5 /dev/sda1
```

## check ram memory usage history (from ‘sa’ log files)

```bash
sar -r -f /var/log/sa/sa29
```

## mass update dns records (named)

```bash
cd /var

cp -R named named.backup110527

replace "ns1.theonlinemediaacdgency.com" "ns1.submitee.com." -- /var/named/*.db

replace "ns2.theonlinemediaagency.com" "ns2.submitee.com." -- /var/named/*.db

grep "serial, todays" /var/named/*.db | sed "s/://g" | cut -d/ -f4 | awk {'system("replace "$2" "strftime("%Y%m%d")"00 -- /var/named/"$1)'}

service named restart

replace "v=spf1 +a +mx +ip4:182.160.163.143 +ip4:182.160.167.216 +include:spf.mailcluster.com.au ~all" "ns1.submitee.com." -- /var/named/*.db
```

## Grab Modsec ID’s from error_log and count them

```bash
grep 49.195.68.20 /usr/local/apache/logs/error_log | grep id | awk -F 'id "' '{print substr($2,1,6)}' | sort | uniq -c | sort -n
```

## Temporarily disable iptables and restore it after testing

[Resource](https://kerneltalks.com/howto/how-to-disable-iptables-firewall-temporarily/)

**Save iptables policies**:

```bash
iptables-save > /root/firewall_rules.backup
```

**Stop/disable iptables firewall**:

```bash
iptables -F
iptables -X
iptables -P INPUT ACCEPT
iptables -P OUTPUT ACCEPT
iptables -P FORWARD ACCEPT
```

**Now check firewall rules are cleared**:

```bash
iptables -L
```

**Restore firewall policies**:

```bash
iptables-restore < /root/firewall_rules.backup
```

**Now check firewall rules are back to how they were**:

```bash
iptables -L
```

## Others

> Contact form spamming

```bash
grep cwd /var/log/exim_mainlog | grep -v /var/spool | awk -F"cwd=" '{print $2}' | awk '{print $1}' | sort | uniq -c | sort -n
```

> Lists the amount of semaphores. [You can then do this to clean unused](https://confluence.hostopia.com.au/display/SRVD/Check+Semaphore+Arrays)

```bash
ipcs -s | wc -l
```

> Iterates through semaphores and shows the PID using it

```bash
ipcs -s | awk '{print $2}' | while read line; do ipcs -s -i $line | tail -n 2 | awk '{print $5}' | grep -vP '^$' | while read line; do ps aux | grep $line | grep -v grep; done; done
```

> To see which PID's relate to a Semaphore Array

```bash
ipcs -s -i $semid
```

> then to see what’s process is holding semaphores

```bash
ps aux | grep <PID> | grep -v grep
```

> Look for server OOMing

```bash
grep -i 'out of memory' /var/log/messages
grep -i 'oom' /var/log/messages
```
