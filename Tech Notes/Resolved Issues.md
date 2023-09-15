# Resolved issues

## DDOS Mitigation

### Slow Loris

Slowloris is a highly-targeted attack, enabling one web server to take down another server, without affecting other services or ports on the target network. Slowloris does this by holding as many connections to the target web server open for as long as possible. It accomplishes this by creating connections to the target server, but sending only a partial request. Slowloris constantly sends more HTTP headers, but never completes a request. The targeted server keeps each of these false connections open. This eventually overflows the maximum concurrent connection pool, and leads to denial of additional connections from legitimate clients.

[Resource here](https://confluence2.cpanel.net/display/EA/How+To+Mitigate+Slowloris+Attacks)

1. Ensure Modsec is installed/enabled and look at installing mod-evasive (if it's bad)? Also look at installing "mod_reqtimeout" module and set it up as per above guide (or below):

```apache
<IfModule mod_reqtimeout.c>  
  RequestReadTimeout header=20-40,MinRate=500 body=20-40,MinRate=500  
</IfModule>
```

2. In CSF, you can enable and tweak parameters such as SYNFLOOD and PORTFLOOD to limit the connections on Apache web server ports. Moreover, you can tweak CSF connection tracking parameters like CT_LIMIT, CT_INTERVAL, CT_BLOCK_TIME, etc. to limit the number of connections.

3. Use netstat to check incoming requests and sort by most connections:

```shell
netstat -ntu | awk '{print $5}' | cut -d: -f1 | sort | uniq -c | sort -n
```

4. Tweak Apache Configuration parameters like RequestReadTimeout, Timeout, KeepAliveTimeout, MaxRequestWorkers:

## Swap File Creation

[Resource](https://www.tecmint.com/create-a-linux-swap-file/)

In this example, we will create a swap file of size 2GB using the `dd` command as follows. **Note** that `bs=1024` means read and write up to 1024 bytes at a time and `count = (1024 x 2048)MB` size of the file. 7GB would be 1024*7168 for count

```shell
dd if=/dev/zero of=/mnt/swapfile bs=1024 count=2097152
```

Alternatively, use the fallocate command as follows:

```shell
fallocate --length 2GiB /mnt/swapfile
```

And then set the appropriate permissions on the file; make it readable only by root user as follows

```shell
chmod 600 /mnt/swapfile
```

Now setup the file for swap space with the mkswap command

```shell
mkswap /mnt/swapfile
```

Next, enable the swap file and add it to the system as a swap file

```shell
swapon /mnt/swapfile
```

Afterwards, enable the swap file to be mounted at boot time. Edit the /etc/fstab file and add the following line in it

```shell
/mnt/swapfile swap swap defaults 0 0
```

To set how often the swap file can be used by the kernel, open the /etc/sysctl.conf file and add the line below.

Note that the default value of how frequent swap space can be used is 60 (maximum value is 100). The higher the number, the more frequent swap space utilization by the kernel. When the value is set to 0, the swap file will only be used if the operating system has fully utilized memory.

```shell
vm.swappiness=10
```

Now verify the swap file was created using the swapon command

```shell
swapon  -s
# OR
free
# OR
cat  /proc/swaps
```

We can optionally reboot the system to effect the above changes using the following command.

```shell
reboot
```

## PHP

### Increasing and modifying PHP session info to RAM

in php ini, put:

```shell
session.save_handler => mm => mm
session.save_path => /tmp/ramdisk => /tmp/ramdisk
```

Then edit fstab:

```shell
echo "tmpfs /tmp/ramdisk tmpfs size=512M,mode=0777 0 0" >> /etc/fstab
```

### Enable PHP error logging

In htaccess:

```ini
php_flag log_errors on
php_value error_log /home/CPANELUSERNAME/public_html/error_log
```

OR IN PHP.INI:

```ini
error_log = /home/CPANELUSERNAME/public_html/error_log
```

### Find Module/extension from rpm query

> Find what gives a specific extension in PHP

```shell
repoquery -q --whatprovides 'ea-php56-php-<ITEM_LOOKING_FOR>' | sort -V | tail -1
```

> Example finding mysqli

```shell
repoquery -q --whatprovides 'ea-php56-php-mysqli' | sort -V | tail -1
```

### Enable gzip compression - cPanel

Go into WHM > EasyApache 4 > Apache Modules > Enable Mod_deflate

Now go to MultiPHP INI Editor > Tick "zlib.output_compression" (Do this for all PHP versions the client is using.

Advise them to enable it in cPanel "Optimize Websites" button and compress all.

OPTIONAL:

You can also edit apache config to tell everything to use mod_deflate by putting this in pre - vhosts:

```shell
<IfModule mod_deflate.c>
    # Insert filter
    SetOutputFilter DEFLATE

    # Netscape 4.x has some problems...
    BrowserMatch ^Mozilla/4 gzip-only-text/html

    # Netscape 4.06-4.08 have some more problems
    BrowserMatch ^Mozilla/4\.0[678] no-gzip
 
    # MSIE masquerades as Netscape, but it is fine
    BrowserMatch \bMSIE !no-gzip !gzip-only-text/html
    # Don't compress images
    SetEnvIfNoCase Request_URI \
        \.(?:gif|jpe?g|png|swf|flv|mp3|mp4|mpe?g|avi|mov|pdf|rar|zip|gz)$ no-gzip dont-vary

    # Make sure proxies don't deliver the wrong content
    Header append Vary User-Agent env=!dont-vary
</IfModule>
```

## Rebuild Corrupted RPM Database

```shell
mkdir /backups/
tar -zcvf /backups/rpmdb-$(date +"%d%m%Y").tar.gz /var/lib/rpm
rm -f /var/lib/rpm/__db*
/usr/lib/rpm/rpmdb_verify /var/lib/rpm/Packages
```

Now to check the database headers, query all installed packages using the -q and -a flags, and try to carefully observe any error(s) sent to the stderror:

```shell
rpm -qa >/dev/null
```

Last but not least, rebuild the RPM database using the following command, the -vv option allows for displaying lots of debugging information:

```shell
rpm -vv --rebuilddb
yum check-update
puppet agent -t --debug
```

## Kernel Panic - recover broken FS (Onapp)

Reboot in Recovery

Find the device that mounts to / (something like /dev/vda1 - NOT VDA, VDA is the device itself, vda1 is the logical volume):

```shell
fdisk -l | less
```

Mount the partition:

```shell
mkdir /mnt/vda
sudo mount /dev/your-partition /mnt/vda
mount --bind /proc /mnt/vda/proc
mount --bind /sys /mnt/vda/sys
mount --bind /dev /mnt/vda/dev
```

Now chroot into new mount:

```shell
chroot /mnt/vda
```

use 'ctrl + d' to exit chroot

## DNSSEC enabled

Some resolvers will not propagate DNS records if DNSSEC is enabled on the domain at the registrar. This is a security measure to ensure the DNS query and it’s chain is validated the whole way through. Follow this guide to check if DNSSEC is enabled and if so, disable it.

[Resource](https://www.cyberciti.biz/faq/unix-linux-test-and-validate-dnssec-using-dig-command-line/?fbclid=IwAR26jikJHBV6RIvFYzMYXUFctJRszN7dj-V8wYi0qruLe3BB9htYjGq7_ac)

### How to test and validate DNSSEC using dig

Firstly, check if this dig returns a result at our name server (try them all and if it does, it means DNSSEC is enabled):

```shell
dig +cdflag domain.com.au @ns1.panthur.com
dig +dnssec domain.com.au @ns1.panthur.com
```

1. Open the terminal application on your Linux/Unix/macOS desktop
2. Use dig to verify DNSSEC record, run: dig YOUR-DOMAIN-NAME +dnssec +short
3. Grab the public key used to verify the DNS record, execute: dig DNSKEY YOUR-DOMAIN-NAME +short
4. Show the DNSSEC chain of trust with dig command: dig DS YOUR-DOMAIN-NAME +trace
5. Do DNSSEC verification with dig, running the following two commands:

```shell
dig . DNSKEY | grep -Ev '^($|;)' > keys  
dig +sigchase +trusted-key=./keys YOUR-DOMAIN-NAME. A | less  
dig +sigchase +trusted-key=./keys YOUR-DOMAIN-NAME. A | grep -i validation
```

## Timeout Issues

Check which type of timeout is occurring and at which service in the stack:

Apache logs:

```shell
/usr/local/apache/logs/error_log
/usr/local/apache/logs/stderr.log
/usr/local/apache/logs/suexec_log
```

PHP logs -> (check phpinfo() for error log location for website, generally in `/home/username/public_html/error_log`)

MySQL logs -> `/var/lib/mysql/hostname.err`

### Troubleshooting 503 Errors

[Source](https://www.litespeedtech.com/support/wiki/doku.php/litespeed_wiki:php:503-errors?s[]=stderr)

503 errors are often caused by a malfunction in PHP, and are not related to Apache or LiteSpeed Web Server. One of the common reasons for a 503 error is a PHP crash.

If your server is running on a control panel, such as cPanel or Plesk, and runs into a 503 error, you should temporarily switch to Apache for a test. Most of the time, it will run into the same 503 issue with Apache. This means that it is not a LiteSpeed Web Server issue.

#### Quick Troubleshooting Guide

You may like to try a few of these simple steps to see if you can fix the error:

- Check the phpinfo page of the problematic user account. ([Create a phpinfo.php file](https://www.litespeedtech.com/support/wiki/doku.php/litespeed_wiki:php:php_info) if no phpinfo page exists.)
- Generally, server error_log/stderr.log should provide some hints as to the problem. For example, it may be a memory issue.
- Disable opcode cache for that PHP version and verify from the phpinfo page.
- Disable unsafe PHP extensions such as ZendGuardLoader, Suhosin, ionCube, etc.
- Check disk space.
- If CloudLinux is used, check the LVE memory limit to see if it needs to be increased.
- If CloudLinux is used, check the LVE process limit to see if it needs to be increased.
- Try increasing the PHP memory limit.

These are just a few simple quick fixes for you to try first. If they don't help, you can refer to the source link for detailed steps/reasons.

### MySQL config

Mysql config changes (made in file /etc/my.cnf on server):

When the connection is established it uses connection_timeout (increasing max connections too, as we'll be leaving connections open longer so we need more of them):

[Connect_timeout](https://dev.mysql.com/doc/refman/8.0/en/server-system-variables.html#sysvar_connect_timeout)

[Max_connections](https://dev.mysql.com/doc/refman/8.0/en/server-system-variables.html#sysvar_max_connections)

When it waits for the next query it uses wait_timeout:

[Wait_timeout](https://dev.mysql.com/doc/refman/8.0/en/server-system-variables.html#sysvar_wait_timeout)

When it doesn't receive the query in the specific time it uses net_read_timeout (The number of seconds to wait for more data from a connection before aborting the read):

[Net_read_timeout](https://dev.mysql.com/doc/refman/8.0/en/server-system-variables.html#sysvar_net_read_timeout)

it also uses net_write_timeout (The number of seconds to wait for a block to be written to a connection before aborting the write):

[Net_write_timeout](https://dev.mysql.com/doc/refman/8.0/en/server-system-variables.html#sysvar_net_write_timeout)

### Apache config

[TimeOut](http://httpd.apache.org/docs/2.4/mod/core.html#timeout)

### PHP config

[Default_socket_timeout](https://www.php.net/manual/en/filesystem.configuration.php#ini.default-socket-timeout)

[Max_execution_time](https://www.php.net/manual/en/info.configuration.php#ini.max-execution-time)

[max_input_time (-1 means it will read 'max_execution_time' value above instead)](https://www.php.net/manual/en/info.configuration.php#ini.max-input-time)

[Session.gc_maxlifetime](https://www.php.net/manual/en/session.configuration.php#ini.session.gc-maxlifetime)
