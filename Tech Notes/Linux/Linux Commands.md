# Linux Commands

Common linux commands, args and examples.

## Template

Linux

***Options:***

| Flag        | Description |
| ----------- | ----------- |
| -h          | Options go here |
| -o          | Other Option    |

***Examples:***

>
```bash
# command goes here
```

>
```bash
# command goes here
```

## bash command

Creates a bash sub-shell - GNU Bourne-Again SHell

***Options:***

| Flag        | Description |
| ----------- | ----------- |
| -c          | Commands are read from the first non-option argument command_string |
| -i          | Makes the shell interactive    |
| -l          | Make bash act as if it had been invoked as a login shell    |

***Examples:***

>
```bash
# command goes here
```

## echo command

Display a line of text

***Options:***

| Flag        | Description |
| ----------- | ----------- |
| -e          | Enable interpretation of backslash escapes |
| -n          | Do not output the trailing newline    |

***Examples:***

> Outputs newline - Hey - No newline at end

```bash
echo -en "/nHey"
```

## at command

at, batch, atq, atrm - queue, examine or delete jobs for later execution.

at and batch read commands from standard input or a specified file which are to be executed at a later time, using /bin/sh.

***Options:***

| Flag        | Description |
| ----------- | ----------- |
| -l          | Alias for 'atq'. Lists jobs. |
| -r          | Alias for 'atrm'. Remove a job    |

***Examples:***

> Schedule a reboot at 1am the next day

```bash
echo "reboot" | at 01:00 tomorrow
```

> Schedule a reboot at 11pm today

```bash
echo "reboot" | at 23:00
```

## ping command

Used to test the reachability of a host on an Internet Protocol network

***Options:***

| Flag        | Description |
| ----------- | ----------- |
| -c count    | Stop after sending count ECHO_REQUEST packets. |

***Examples:***

> ping google 4 times

```bash
ping -c 4 google.com
```

## curl command

A tool to transfer data from or to a server, using one of the supported protocols (DICT, FILE, FTP, FTPS, GOPHER, HTTP, HTTPS, IMAP, IMAPS, LDAP, LDAPS, POP3, POP3S, RTMP, RTSP, SCP, SFTP, SMB, SMBS, SMTP, SMTPS, TELNET and TFTP)

***Options:***

| Flag        | Description |
| ----------- | ----------- |
| -L    | (HTTP) If the server reports that the requested page has moved to a different location (indicated with a Location: header and a 3XX response code), this option will make curl redo the request on the new place. |
| -I    | Fetch the headers only! HTTP-servers feature the command HEAD which this uses to get nothing but the header of a document. When used on an FTP or FILE file, curl displays the file size and last modification time only. |
| -X    | Specifies a custom request method to use when communicating with the HTTP server. This option only changes the actual word used in the HTTP request, it does not alter the way curl behaves. |
| -H    | Extra header to include in the request when sending HTTP to a server. |

***Examples:***

> Retrieve the headers of google.com.au webserver response using HTTPS protocol.

```bash
curl -I https://google.com.au
```

> Sending slack message via curl using headers and post.

```bash
curl -X POST -H 'Content-type: application/json' --data '{"text":"Allow me to reintroduce myself!"}' YOUR_SLACK_WEBHOOK_URL
```

> Send a request to a web server and redo the action on the redirected page as well. The host header specifies which website or web application should process an incoming HTTP request (vhost) (because there can be many hosts on the same web server these days)

```bash
curl -I -L -v -H "Host: pre.web.rest.com.au" https://preprodcms.rest.com.au/employer/work-place-education-sessions
```

## dig command

Tool used for querying Domain Name System (DNS) servers

***Options:***

| Flag        | Description |
| ----------- | ----------- |
| @ns1...    | Query DNS record at a specific name server. |
| MX, A, NS, etc. | What type of query is required (i.e. mx record) |
| +short    | Provides only the result, without all other information |
| -x    | Reverse lookup (PTR) of an IP address (RDNS). |
| +cdflag | Set the CD (checking disabled) bit in the query. This requests the server to not perform DNSSEC validation of responses. Good way of testing if DNSSEC issue or not |
| +nssearch | Attempts to find the authoritative name servers for the zone containing the name being looked up and display the SOA record that each name server has for the zone. |
| +trace | Toggle tracing of the delegation path from the root name servers to the authoritative name servers for the record being looked up. |
| +dnssec | Requests DNSSEC records be sent by setting the DNSSEC OK bit (DO) in the OPT record in the additional section of the query. |

***Examples:***

> Would return the PTR record of that IP (RDNS)

```bash
dig -x 172.217.25.46
```

> Would dig for the MX of digitalpacific.com.au at googles' name servers and result is short

```bash
dig MX digitalpacific.com.au @ns1.google.com +short
```

## host command

Utility for performing DNS lookups which translate domain names to IP addresses and vice versa and can also be used to list and verify various types of DNS records such as NS and MX.

***Examples:***

> Would return the DNS information of the domain

```bash
host digitalpacific.com.au
```

## nslookup command

nslookup is a program to query Internet domain name servers interactively.

***Options:***

| Flag        | Description |
| ----------- | ----------- |
| -type=***X*** | Type of record e.e. any, txt, ns, etc. |

***Examples:***

> example nslookup command

```bash
nslookup -type=a www.google.com
```

## tracert command / traceroute command

Used for displaying the route (at every hop) and measuring transit delays of packets across an Internet Protocol network.

***Examples:***

> Would show the entire route per hop to google.com server

```bash
traceroute google.com
```

## clear command (ctrl + L)  (UP TO!)

Clears the screen.

***Examples:***

```bash
clear
```

## ls command

List directory contents.

***Options:***

| Flag        | Description |
| ----------- | ----------- |
| -a          | Do not ignore entries starting with '`.`' |
| -l          | use a long listing format    |
| -h          | with `-l` and/or `-s`, print human readable sizes |

***Examples:***

> Prints hidden stuff in long listing format and human readable sizes

```bash
ls -alh
```

## cd command

Change directory.

***Options:***

| Flag        | Description |
| ----------- | ----------- |
| ..          | Takes you one directory up |
| /           | Takes you to the root directory    |
| ~ (Tilda)   | This means HOME directory i.e. root of YOUR users directory. To use tilda properly within your home directory, you can use for e.g. cd ~/ |

***Examples:***

> Go up one directory and into path folder

```bash
cd ../path
```

## cut command

Remove sections from each line of files.

***Options:***

| Flag        | Description |
| ----------- | ----------- |
| -d ***N***  | Use ***N*** instead of TAB for field delimiter |
| -f ***N[-n]*** | Select only fields ***N*** i.e. Field 1 [optional '-' to/from field n (leave blank to cut to/from end or beginning)]  |

***Examples:***

> Cuts using the delimiter '.' and outputs the first field only

```bash
cut -d '.' -f 1
```

> Grabs the TOR for the GW using the delimiter '.' and outputs the second field to the end.

```bash
host 101.0.72.213 | grep -oP '(?<=vlan).*' | cut -d '.' -f 2-
```

## pwd command

Print name of current/working directory.

## less command

Less is a terminal pager program used to view the contents of a text file one screen at a time.

## grep command

Searches for a pattern in each file and returns the line containing the matched pattern.

***Options:***

| Flag        | Description |
| ----------- | ----------- |
| -v          | Invert the sense of matching, to select non-matching lines |
| -i          | Ignore case distinctions, so that characters that differ only in case match each other.    |
| -l          | Suppress normal output; instead prints the name of the file where it returns a result |
| -L          | Suppress normal output; instead prints the name of the file where NO grep result |
| -B 20       | Outputs the 20 lines before the grep (number can change) |
| -A 20       | Outputs the 20 lines after the grep (number can change) |
| -C 2        | Provides context of 2 lines before and after every match (number can change) |
| -c          | Counts the amount of times it was matched instead of normal output |
| -n          | Prefix each line of output with the 1-based line number within its input file. |
| --exclude-dir=GLOB | Skip any command-line directory with a name suffix that matches the pattern GLOB. |
| --exclude=GLOB | Skip any command-line file with a name suffix that matches the pattern GLOB. |

***Examples:***

> Grep multiple things from /var/log/messages

```bash
grep -i 'logout\|notice\|info' /var/log/messages
```

> Excludes folders from recursive search for 'hello', ignoring case from / in the FS.

```bash
grep -ir --exclude-dir={ece,pytorch,sys,proc} 'hello' /
```

## zgrep command

[Grep](#grep-command) but in compressed (gzipped) files. Same options and everything.

## pgrep command

pgrep looks through the currently running processes and lists the process IDs which match the selection criteria to stdout.

***Options:***

| Flag        | Description |
| ----------- | ----------- |
| -l          | List the process name and the PID |
| -u          | Only match processes whose user ID is listed (-u UID) |
| -f          | Full command line is searched (useful for searching script names and returning PID) |
| -v          | Negates the matching (inverse) |

***Examples:***

> Kill all processes owned by a user and using search term

```bash
pgrep -u <USERNAME> -l | grep <SEARCH_TERM> | awk '{print $1}' | xargs kill -15
```

## pkill command

Kill signal processes (same options as pgrep).

***Options:***

| Flag        | Description |
| ----------- | ----------- |
| -9          | Send -9 signal to kill |
| -u          | Only match processes run by user ID. Numeric or symbolic can be used. |

***Examples:***

> Kill all processes owned by user 'grapecoa' using sigterm -9

```bash
pkill -9 -u grapecoa
```

## tail command

Print the last 10 lines of each FILE to standard output.

***Options:***

| Flag        | Description |
| ----------- | ----------- |
| -f          | follows what's happening in the file so you can track what's happening live |
| -n          | Output the last NUM lines (tail -n 20) [Can also use + to indicate starting point e.g. +3 starts from line 3] |

***Examples:***

> Outputs last 20 lines and follows appended lines to stdout

```bash
tail -n 20 -f /var/log/messages
```

## sort command

Sort lines of text files.

***Options:***

| Flag        | Description |
| ----------- | ----------- |
| -b          | Ignore leading blanks |
| -d          | consider only blanks and alphanumeric characters (dictionary order) |
| -i          | consider only printable characters (no whitespace etc.) |
| -h          | compare human readable numbers (e.g., 2K 1G) |
| -n          | compare according to string numerical value |
| -r          | reverse the result of comparisons |
| -k          | sort via a key |

***Examples:***

> Outputs last 20 li

```bash
tail -n 20 -f /var/log/messages
```

## history command

Shows you the users' command history (bash history).

## date command

Print or set the system date and time.

***Examples:***

```bash
date +"%Y-%m-%d"
```

## cat command

Concatenate files and print on the standard output. Can concatenate multiple files or use it to print only one file to stdout.

## zcat command

Like 'cat' but prints a zipped file to stdout

## tee command

Read from standard input and write to standard output and files.

***Options:***

| Flag        | Description |
| ----------- | ----------- |
| -a          | Append to the given files, do not overwrite |

***Examples:***

> Adds debug=1 to r1soft log if it doesn't exist

```bash
if [[ $(grep -i debug /usr/sbin/r1soft/conf/agent_config | wc -l) -eq 0 ]]; then echo "Debug=1" | tee -a /usr/sbin/r1soft/conf/agent_config; fi
```

## diff command

Compare files line by line. It works by telling you how to make file 1 the same as file 2 (arguments).

The important thing to remember is that when **diff** is describing these differences to you, it's doing so in a prescriptive context: it's telling you how to change the **first** file to make it match the **second** file.

The first line of the diff output will contain:

- line numbers corresponding to the first file,
- a letter (a for add, c for change, or d for delete), and
- line numbers corresponding to the second file.

E.g. "**2,4c2,4**" means: "Lines **2** through **4** in the **first file** need to be changed to match lines **2** through **4** in the **second file**".

E.g. "**4d3**" means: "You need to **d**elete line **4** in the first file so that both files sync up at line **3**."

E.g. "**105,124d91**" means: delete lines **105** to **124** in **file 1**, to make it match with line **91** on **file 2**.

It then tells us what those lines are in each file:

- Lines preceded by a `<` are lines from the first file;
- lines preceded by `>` are lines from the second file.
- The three dashes (`---`) merely separate the lines of file 1 and file 2.

***Options:***

| Flag        | Description |
| ----------- | ----------- |
| -y          | output in two columns |

***Examples:***

> diff `file` and `file.bak`

```bash
diff file{,.bak}
```

## jobs command

Job control is nothing but the ability to stop/suspend the execution of processes (command) and continue/resume their execution as per your requirements.

Note: `%n` is optional (below). Use it if you have more than 1 job running.

***Examples:***

> Lists all jobs

```bash
jobs
```

> Places the current or specified job in the background, where n is the job ID

```bash
bg %n
```

> Brings the current or specified job into the foreground, where n is the job ID

```bash
fg %n
```

> Stops the foreground job and places it in the background as a stopped job

```bash
Control-Z
```

> Kills the job number `n`

```bash
kill %n
```

## chkconfig command

**This applies to older centos 5/6 servers**.

Control the system and service manager (initd style)

***Examples:***

> Enable service on startup

```bash
chkconfig <service> on
```

> Disable service on startup

```bash
chkconfig <service> off
```

> List services

```bash
chkconfig --list <service>
```

## ps command

Report a snapshot of the current processes.

***Options:***

*Note: The differences between some flags having `-` and others not*
| Flag        | Description |
| ----------- | ----------- |
| a           | this option causes ps to list all processes with a terminal (tty), or to list all processes when used together with the 'x' option |
| u           | Display user-oriented format |
| x           | This option causes ps to list all processes owned by you (same EUID as ps), or to list all processes when used together with the 'a' option |
| -f          | Full-format listing |
| -e          | Select all processes |
| f           | ASCII art process hierarchy (forest style branches with ASCII) |
| w, -w       | Wide output. Use this option twice for unlimited width. |

***Examples:***

> Good for full command and tree of processes/children

```bash
ps auxfw
```

> See every process on the system using standard syntax

```bash
ps -ef
```

> To see every process on the system using BSD syntax

```bash
ps aux
```

## touch command

Creates a file (if it doesn't exist) or change existing file timestamps.

## xargs command

Build and execute command lines from standard input.

***Options:***

| Flag        | Description |
| ----------- | ----------- |
| -I **S**    | Replace occurrences of **S** in the initial-arguments with names read from standard input |

***Examples:***

> xargs is used here to execute grep (in place) on exim_mainlog from the stdout of the command before.

```bash
grep 1iN4Ps-00B3ZR-6B /var/log/exim_mainlog | awk '/<>/{print substr($6,3)}' | xargs -I {} grep {} /var/log/exim_mainlog
```

## ssh command

Program for logging into a remote machine and for executing commands on a remote machine.

***Options:***

| Flag        | Description |
| ----------- | ----------- |
| -t          | Force pseudo-terminal allocation. This can be used to execute arbitrary screen-based programs on a remote machine, and also aliases requiring terminal to load bashrc etc. |
| -q          | Quiet mode. Causes most warning and diagnostic messages to be suppressed. |
| -n          | Redirects stdin from /dev/null (actually, prevents reading from stdin). |
| -p **X**    | Port number **X** to connect to on the remote host. |
| -o **X**    | Can be used to give options **X** in the format used in the configuration file. E.g. ForwardAgent |

***Examples:***

> ssh on port 7022

```bash
ssh ded.somethinglikesami.net -p 7022
```

> ssh using terminal allocation and quiet verbosity to run alias command on remote server.

```bash
ssh -tq puppet02 "bash -ic pulldev"
```

> SSH using password (not key)

```bash
ssh -o PubkeyAuthentication=no -o PreferredAuthentications=password root@server
```

## ssh-keygen command

OpenSSH authentication key utility.

***Options:***

| Flag        | Description |
| ----------- | ----------- |
| -f          | Specifies the filename of the key file. |
| -i          | This option will read an unencrypted private (or public) key file in the format specified by the -m option and print an OpenSSH compatible private (or public) key to stdout. |
| -e          | This option will read a private or public OpenSSH key file and print to stdout a public key in one of the formats specified by the -m option. |
| -m **key_format** | Specify a key format. The supported key formats are: `RFC4716` (RFC 4716/SSH2 public or private key), `PKCS8` (PKCS8 public or private key) or `PEM` (PEM public key). When converting public keys for export/import the default format is `RFC4716`. |
| -F          | Search for a specified hostname in a known_hosts file. |

***Examples:***

> To generate a new key pair

```bash
ssh-keygen
```

> Generate ed25519 key with comment specifying filename to output

```bash
ssh-keygen -t ed25519 -C "Gitlab key to deploy workloads via CD" -f ~/.ssh/id_ed_gitlab
```

> To Convert the public key to the RFC 4716 version of the public key to the OpenSSH format

```bash
ssh-keygen -i -f ~/.ssh/sami.pub > ~/.ssh/sami-openssh.pub
```

> To Convert the public key from OpenSSH format to the RFC 4716 version of the public key using ssh-keygen

```bash
ssh-keygen -e -f ~/.ssh/id_dsa > ~/.ssh/id_dsa_com.pub
```

> For those who get "It is required that your private key files are NOT accessible by others" error like I had run

```bash
cd ~/.ssh && chmod 600 id_rsa
```

> This command will load all keys (specify the key file to load only one)

```bash
ssh-agent && ssh-add ~/.ssh/*
```

> Copy SSH key to remote server

```bash
ssh-copy-id -i ~/.ssh/sami-openssh-private-key.ppk root@host
```

> Then, you can test your key with

```bash
ssh -v user@example.com -i sami-openssh-private-key.ppk
```

## puttygen command

Public-key generator for the PuTTY tools.

***Options:***

| Flag        | Description |
| ----------- | ----------- |
| -O **output-type** | Specify the type of output you want puttygen to produce. |
| -o **output-file** | Specify the file where puttygen should write its output |

***Examples:***

> Install puttygen

```bash
apt/yum install putty-tools
```

> To convert the Private key PPK file to be used with SSH commands

```bash
puttygen sami.ppk -O private-openssh -o sami-openssh-key
```

## scp command

Secure copy protocol used to transfer files.

**Usage**: `scp [options] SOURCE DESTINATION`

***Options:***

| Flag        | Description |
| ----------- | ----------- |
| -P          | Specify port    |
| -i          | Specifies SSH key to use |
| -r          | Copies recursively |

***Examples:***

> Download FROM remote server TO home dir of PC

```bash
scp root@web.digitalpacific.com.au:/home/dpapidap/auth.sqlite3 ~/Downloads/
```

> Send TO remote server FROM PC

```bash
scp ~/Documents/auth.sqlite3 root@web.digitalpacific.com.au:/home/dpapidap/auth.sqlite3
```

> Use SSH key to copy folder recursively to remote server

```bash
scp -i ./my-openssh-key -r autoinstallssl root@someserver:~/
```

## rsync command

Rsync is a fast and extraordinarily versatile file copying tool.

**Usage**: `rsync [options] SOURCE... DESTINATION`

***Options:***

| Flag        | Description |
| ----------- | ----------- |
| -z          | Compress file data during the transfer |
| -a          | Archive mode (**see below note for breakdown on this**) |
| -r          | Recurse into directories |
| -v          | Increase verbosity |
| -h          | Output numbers in a human-readable format |
| -n          | Perform a trial run with no changes made (shows what will be done) |
| --progress  | Show progress during transfer (alias flag = -P) |
| -I          | don't skip files that match size and time (i.e. overwrite everything) |
| -u          | skip files that are newer on the receiver |

**Note**: `-a` (archive mode) includes all of the following flags and does the following:

- Traverse directories recursively (-r)
- Preserve:
  - symbolic links (-l)
  - other special and device files (-D)
- Transfer:
  - permissions (implied option -p)
  - user and group ownerships (-o for owner and -g for group)
  - timestamps (-t)
- Doesn't imply -H for hard links (this option can be set separately)
- Doesn't preserver ACL's (-A)
- Doesn't preserve extended attributes (-X)

**Slash or no slash**:
You can think of a trailing / on a source as meaning "copy the contents of this directory" as opposed to "copy the directory by name":

```bash
rsync -avPzu test  login@remote:/home/login/test
# "test" directory is copied inside of existing "test" on remote (structure is then test/test/...)
rsync -avPzu test  login@remote:/home/login/test/
# same as above
rsync -avPzu test/ login@remote:/home/login/test
# content of "test" directory is synchronized with the remote "test" directory
rsync -avPzu test/ login@remote:/home/login/test/
# same as above
rsync -avPzu test  login@remote:/home/login/
# same as above
rsync -avPzu test  login@remote:/home/login
# same as above
```

***Examples:***

> Tim's rsync that will work for 9/10 occasions. **Trailing slash is important so you don't have srcdirception inside dstdir**

```bash
rsync -zaPvh <srcdir>/ <dstdir>
```

> Download FROM remote server to PC in /tmp

```bash
rsync -zavPh root@192.168.1.29:/opt/rpms_db /tmp
```

> Send TO remote server /opt FROM PC

```bash
rsync -zavPh /home/pkumar/techi root@192.168.1.29:/opt
```

> Copy or Sync files LOCALLY (rsync -zvh)

```bash
rsync -zvPh /home/pkumar/OpenStack-Networking.pdf /opt/backup
```

> Copy or Sync DIRECTORY LOCALLY (rsync -zavh)

```bash
rsync -zavPh /home/pkumar /opt/backup
```

> Copying multiple backup disk safes (GUID) to remote server (no src slash means copy the whole dir to vd0 on remote)

```bash
rsync -zavPh /vd0/GUID /vd0/GUID /vd0/GUID root@nxsrv51.cp.voc.panthur.com.au:/vd0/
```

## ftp / sftp command

File transfer program.

**Usage**: `sftp [host [port]]`

**Note**: Any action like `cd` has a local counterpart by adding `l` (lowercase L) at the beginning of the command, e.g. `lcd` to change LOCAL directory and `lmkdir` to make local dir etc.

***Commands*** (if you connected from local machine to remote server):

> Get file from the remote computer.

```bash
get [-afPpr] remote-path [local-path]
```

> Send one file.

```bash
put [-afPpr] local-path [remote-path]
```

> Change remote directory to path.

```bash
cd path
```

***Examples:***

> Connect via sftp protocol to remote server

```bash
sftp 101.0.104.58
```

> put filename

```bash
puts filename on remote server
```

## rm command

Remove files or directories.

***Options:***

| Flag        | Description |
| ----------- | ----------- |
| -r          | Recursively remove directories and their contents |
| -f          | Never prompt (force remove based on arguments) |

***Examples:***

> Recursively remove Downloads folder and contents and not prompt us

```bash
rm -rf Downloads/
```

## cp command

Copy files and directories to another location (and name if desired).

**Usage**: `cp SOURCE(S) DESTINATION`

***Options:***

| Flag        | Description |
| ----------- | ----------- |
| -r          | copy directories recursively |
| -a          | Archive. Copies recursively and preserves links and everything |
| -v          | Verbose. Explain what is being done. |
| -n          | Ignore duplicates (skip) |

***Examples:***
> Using brace expansion to make it easier. Otherwise it would be `cp meme.jpg meme.bak`

```bash
cp meme.{jpg,bak}
```

> Same as above, will copy 'file' to 'file.old'

```bash
cp file{,.old}
```

> verbose, archive, recursively

```bash
cp -var folder/ ~/
```

## openssl command

OpenSSL is a cryptography toolkit implementing the Secure Sockets Layer (SSL v2/v3) and Transport Layer Security (TLS v1) network protocols and related cryptography standards required by them.

**Man pages**:

`man openssl`

or

`man openssl s_client` (for s_client man page)

[Reference for more openssl commands such as generating certificate files etc.](https://www.freecodecamp.org/news/openssl-command-cheatsheet-b441be1e8c4a/)

***Options:***

| Flag        | Description |
| ----------- | ----------- |
| s_client    | This implements a generic SSL/TLS client which can establish a transparent connection to a remote server speaking SSL/TLS |
| -quiet      | Inhibit printing of session and certificate information |
| -showcerts  | Displays the server certificate list as sent by the server |
| -starttls **S** | Starts tls connections where S = protocol, e.g. ftp or imap |
| -connect **host:port** | This specifies the host and optional port to connect to |
| -verify_hostname | Set various certificate chain validation options. See verify(1) manual |

***Examples:***

> Test connectivity to SMTP service without showing certs

```bash
openssl s_client -connect smtp.mandrillapp.com:465 -quiet
```

> Verify that certificate served by a remote server covers given host name. Useful to check your mutlidomain certificate properly covers all the host names

```bash
openssl s_client -verify_hostname www.example.com -connect example.com:443
```

> Connect to a server and show full certificate chain

```bash
openssl s_client -showcerts -connect google.com:443 </dev/null
```

> Extract the certificate from a host, outputs to a pem file

```bash
openssl s_client -connect example.com:443 2>&1 < /dev/null | sed -n '/-----BEGIN/,/-----END/p' > certificate.pem
```

> Override SNI (Server Name Indication) extension with another server name. Useful for testing when multiple secure sites are hosted on the same IP address

```bash
openssl s_client -servername www.example.com -connect example.com:443
```

> Test TLS connection by forcibly using specific cipher suite, e.g. ECDHE-RSA-AES128-GCM-SHA256. Useful to check if a server can properly talk via different configured cipher suites, not one it prefers

```bash
openssl s_client -connect example.com:443 -cipher ECDHE-RSA-AES128-GCM-SHA256 2>&1 </dev/null
```

> Measure SSL connection time without/with session reuse

```bash
openssl s_time -connect example.com:443 -new
openssl s_time -connect example.com:443 -reuse
```

> Tests tls connection of FTP on port 21

```bash
openssl s_client -starttls ftp -connect boreelanewines.com.au:21
```

> Same as above, except shows certs

```bash
openssl s_client -showcerts -starttls ftp -connect boreelanewines.com.au:21
```

> Checks certificate start and end dates (the -servername is what you need for openssl do an SNI request)

```bash
openssl s_client -showcerts -servername ns1.aussiedns.net.au -connect ns1.aussiedns.net.au:443 | openssl x509 -noout -dates
```

> prints the certificate chain issuers

```bash
echo | openssl s_client -connect ns1-dev.hostopia.com.au:8081 -servername ns1-dev.hostopia.com.au 2>/dev/null | awk '/Certificate chain/,/---/'
```

## nano editor

Nano is a text editor

***Options:***

| Flag        | Description |
| ----------- | ----------- |
| ^x          | Exit out of the file |

## vim editor

An advanced user editor.

***Options:***

| Flag        | Description |
| ----------- | ----------- |
| i           | Insert mode     |
| :wq!        | This will `WRITE`, `QUIT` then `GET OUT` of the file |
| esc         | Back to moving around 'mode' (takes you out of insert or visual mode etc) |
| Shift + c   | Removes everything from cursor to end of line |
| Shift + $   | Moves cursor to end of line |
| Shift + ^   | Moves cursor to start of line |
| cc          | Cuts line |
| yy          | Copies line |
| dd          | Deletes line |
| p           | Paste content of the buffer |
| cw          | Change word (c2w changes 2 words) |
| dw          | Delete word (d2w deletes 2 words) |
| a           | Append at cursor |
| Shift + G   | Move cursor to the bottom of the file |
| gg          | Move cursor to the start of the file |
| :s/old/new/g | Substitute 'new' for 'old' where g is globally in the line |
| :%s/foo/bar/gci | Search and replace all occurrences with confirmation in the whole file globally |
| :!          | Run shell commands like :!dir, :!ls in vim |
| Shift + R   | 'Replace' mode |
| o           | Opens line below cursor |
| Shift + O   | Opens line above cursor |
| e           | moves cursor to the end of a word |
| /<search_term> | Search and then cycle through matches with n (forward) and N (Backward) |
| Shift + I   | Insert mode at the beginning of the line |
| Shift + A   | Append mode at end of line |
| Shift + H   | Move to the top of the screen |
| Shift + M   | Move to the middle of the screen |
| Shift + L   | Move to the Bottom of the screen |
| n + (Shift + G) | Move to line number n - e.g 5G |
| gg > dG     | Deletes everything in file (from top to bottom, no need to type '>') |
| :e          | Reloads the file (you can get syntax highlighting this way) |

![vim cheatsheet](/artifacts/images/linux/vim.png)

***Examples:***

> Deleting the first '#' character of every line (visual mode)

  1. Place cursor on first or last #
  2. Press Ctrl+v to enter Visual Block mode
  3. Use arrow keys to select the # characters you want to delete   (or the other "first few characters")
  4. Press x to delete them all at once

> OR you can use regex if it's the whole file (search for starting with # and replace with nothing)

```regex
:%s/^#//
```

***Set commands:***

**Note**: In order to undo a set command, just add an exclamation point at the end of the same command you used to set it.

> Remove numbering

```bash
:set number!
```

> This displays hidden characters in VIM

```bash
:set list
:set number
:set listchars=tab:→\ ,space:·,nbsp:␣,trail:•,eol:¶,precedes:«,extends:»
```

## sed command

Stream editor for filtering and transforming text

**Usage**: `sed '/address/ s/regex_search/replace_matches/g' file`

`address` = [optional] command will only be executed for input lines which match that address (regex). If not specified, then sed will parse ALL lines of the file

`s` = search

`g` = globally

***Options:***

| Flag        | Description |
| ----------- | ----------- |
| -i[SUFFIX]  | Edit files in place i.e. Overwrites file (makes backup if SUFFIX supplied) |
| -n          | suppress automatic printing of pattern space |

***Examples:***

> Replaces `=` with `+`

```bash
sed 's/=/+/g'
```

> The `-n` tells sed not to automatically print all lines. The `p` at the end tell sed to print the lines that match your search effectively only printing changed lines

```bash
sed -n "/HostHeader/ s/domain.com/${DOMAIN_NAME}/gp" ${DOCKERDIR}/traefik/rules/*
```

> Create a 'clipboard.bak' backup file while replacing 8 with contents of variable `$RANDINT` in bash environment

```bash
sed -i.bak s/8/$RANDINT/g ~/Documents/clipboard
```

> Searches for line containing ‘exclude=’ and then searches for ‘ MariaDB*’ and replaces with nothing

```bash
sed -i '/exclude=/ s/ MariaDB\*//' yum.conf
```

> Opposite of above

```bash
sed -i '/exclude=/ s/$/ MariaDB*/' yum.conf
```

> Deletes the lines containing `1.1.1.1` interactively

```bash
sed -i '/1.1.1.1/d' *
```

> Deletes the second and third lines from the outputsssss

```bash
sed 2,3d filename
```

## awk command

Pattern scanning and processing language

***Options:***

| Flag        | Description |
| ----------- | ----------- |
| -F 'd'      | Specifies the input field separator, i.e. delimits the input columns by d |
| -v **var=X** | Assign the value **X** to the variable **var**, before execution of awk begins. This allows the assigned var to be available in awk to be used. ***NOTE***: this option will make escape sequences be interpreted so `\t` becomes a real tab and not '\t' |

***Usage:***

> keep a current count of the number of input records

`NR`

> keep a count of the number of fields

`NF`

> Used to select a substring from the input. It returns `b` number of chars (optional) from string `s`, starting at position `a`.

`substr(s, a, b)`

> Search target for all matching substrings “a” that it can find and replace them with replacement “b”. The ‘g’ in gsub() stands for “global,” which means replace everywhere.

`gsub(“a”, “b”)`

***Examples:***

> Printing lines that match a pattern

```bash
awk '/<SEARCH_TERM>/ {print}'
```

> Printing only columns (1 and 4 for e.g. default is delimited by whitespace)

```bash
awk '{print $1,$4}'
```

> prints all but very first column (or second column)

```bash
awk '{$1=""; print $0}'
awk '{$1=$2=""; print $0}'
```

> **Note**: You can also use 'cut' to pull everything after a point, delimited by space, e.g cuts all up to col 4, delimited by space

```bash
history | cut -d \  -f4-
```

> Grabs history of a date and cuts only the commands

```bash
history | awk '/2019-11-06/{$1=$2=$3=""; print substr($0,4)}'
```

> Replaces all occurrences of the string ‘Britain’ with ‘United Kingdom’ for all input records

```bash
awk ‘{ gsub(/Britain/, "United Kingdom"); print }’ file.txt
```

> Searches for row containing ‘apipass’ in settings.conf and replaces “ with nothing for returned string

```bash
awk -F '=' '/apipass/{gsub("\"",""); print $2}' /etc/prospamfilter/settings.conf
```

> Finds lines with > 400 characters in them. That specific command finds dkim records > 255 characters

```bash
grep domainkey /var/named/* | awk 'length($0) > 400’
```

## printf command

Format and print data.

[Resource](http://www.cplusplus.com/reference/cstdio/printf/)

***Examples:***

> Prints 256 numbers in hex format (%x is hex, see resource above) and it expands 0-255 with newline after each

```bash
printf '%.2x\n' {0..255}
```

## auditctl command

Used to configure kernel options related to auditing, to see status of the configuration, and to load discretionary audit rules.

This tool is very useful for determining what exact process is modifying a file in linux.

***Options:***

| Flag        | Description |
| ----------- | ----------- |
| -w **path** | Insert a watch for the file system object at `path` |
| -W **path** | Remove a watch for the file system object at `path` |
| -p          | Describe the permission access type that a file system watch will trigger on. `r` = read, `w` = write, `x` = execute, `a` = attribute change |
| -k **KEY**  | Set a filter key on an audit rule. It can uniquely identify the audit records produced by a rule so you can find it easier in the logs |
| -l          | List all rules 1 per line. This can take a key option (-k), too |
| -D          | Delete all rules and watches. This can take a key option (-k), too |

***Example:***

> Auditing cpaneluserlist file for write, append and read. Keyword for search is cloudpuppet

```bash
auditctl /etc/cagefs/exclude/cpaneluserlist -p war -k cloudpuppet
```

***Full Explanation:***

```bash
auditctl -w /path/to/that/file -p war -k issue
```

Where:

`-w`: is for specifying file path

`-p`: is for permission access (read,write,execute and attribute change)

`-k`: key name,you can give name you can use to filter audit rule

Then you can search for it using the `ausearch` command:

```bash
ausearch -ts today -k issue
```

Alternatively, watch for entries to be written to `/var/log/audit/audit.log`.

For eg, I used this:

1. create this file `/tmp/test` and then write some random data: `auditctl -w /tmp/test -p warx -k test`
2. Then execute this command: `ausearch -ts today -k test`

`--ts`: for start date
`-k`: for key string

With the output of this:

```bash
type=SYSCALL msg=audit(1407949301.821:63216): arch=c000003e syscall=191 success=no
exit=-61 a0=eacca0 a1=3600005db7 a2=7fff15265180 a3=84 items=1 ppid=2384 pid=16921
auid=0 uid=0 gid=0 euid=0 suid=0 fsuid=0 egid=0 sgid=0 fsgid=0 tty=pts0 ses=10096
comm="vim" exe="/usr/bin/vim" key="test"
```

So if you check the last line of output it will show command executed is vim and with uid=0 which is root

If you want to make these changes persistent across reboot, inside `/etc/audit/audit.rules` add the entry like this:

```bash
-w /tmp/test -p warx -k test
```

and make sure auditd service is up and running:

```bash
service auditd status
```

To remove (capital W):

```bash
auditctl -W /path/to/that/file -p war -k issue
```

## top command

Displays processor activity of your Linux box and also displays tasks managed by kernel in real-time.

***Options (command line):***

| Flag        | Description |
| ----------- | ----------- |
| -n **NUM**  | Specifies the maximum number of iterations or frames top outputs before ending |
| -u **USER** | Display specific User process details |

***Options (Inside top utility):***

| Flag        | Description |
| ----------- | ----------- |
| h           | Displays help options |
| Shift + O   | Sort field via field letter |
| z           | Will display running process in color |
| c           | Display absolute path of running process |
| k           | Kill a process after finding PID of process |
| r           | Change the priority of the process (aka Renice) |
| Shift + P   | Sort processes as per CPU utilization |

***Examples:***

> Save the running top command results output to a file

```bash
top -n 1 -b > top-output.txt
```

## iftop command

iftop listens to network traffic on a named interface, or on the first interface it can find.

***Options:***

| Flag        | Description |
| ----------- | ----------- |
| -i          | Listen to packets on specific interface (e.g. eth0) |

## iotop command

Watches I/O (disk reading/writing) usage information output by the Linux kernel.

***Options:***

| Flag        | Description |
| ----------- | ----------- |
| -d          | Set the delay between iterations in seconds |
| -o          | Only show processes or threads actually doing I/O, instead of showing all processes or threads |

## atop command

Advanced System & Process Monitor to view the load on a Linux system. It shows the occupation of the most critical hardware resources (from a performance point of view) on system level, i.e. cpu, memory, disk and network.

***Options (command-line):***

| Flag        | Description |
| ----------- | ----------- |
| -1          | Launch with average-per-second total values |
| -a          | Launch with active processes only |
| -c          | Launch with command line per process |
| -d          | Launch with disk info |
| -m          | Launch with memory info |
| -n          | Launch with network info |
| -s          | Launch with scheduling info |
| -v          | Launch with various info (ppid, user, time) |
| -y          | Launch with individual threads |
| -r **X**    | View contents of raw file **X** |

***Options (inside atop):***

| Flag        | Description |
| ----------- | ----------- |
| a           | Sort in order of most active resource |
| c           | Revert to sorting by cpu consumption (default) |
| d           | Sort in order of disk activity |
| m           | Sort in order of memory usage |
| n           | Sort in order of network activity |

***Notes:***

By default after install, the atop daemon writes snapshots to a compressed log file (eg. `/var/log/atop/atop_20140813`).

Access atop log files for historic atop viewing with:

```bash
atop -r /var/log/atop/atop_20140813
```

Once you open a log file (eg. `atop -r /var/log/atop/atop_20140813`) then use 't' to go forward in 10 minute intervals and 'T' to go back. You can analyse specific times by pressing 'b' then entering the time. The above shortcut keys also work in this mode… a, c, d, m,n.

Installing atop also installs `atopsar` which is an Advanced System Activity Report (atop related). You can use shortcuts with atopsar. For example, using the flag `-c 30 5` with atopsar will generate a report for current CPU utilization for 5 minutes (ten times with intervals of 30 seconds):

```bash
atopsar -c 30 5
```

Using the flag -A with return all available reports:

```bash
atopsar -A
```

But you can limit this to a specific time window using beginning "-b" and end "-e" flags:

```bash
atopsar -A -b 11:00 -e 11:15
```

## sar command

Checks historical memory and CPU usage (like logs). Sar shows the contents of selected cumulative activity counters in the operating system.

***Options:***

| Flag        | Description |
| ----------- | ----------- |
| -r          | Report memory utilization statistics (RAM) |
| -q          | Queue length and load averages |
| -b          | Report I/O and transfer rate statistics |
| -f          | Specify file to load stats from (/var/log/sa/sa<day_no>) |
| -B          | Report paging statistics (e.g. kilobytes the system paged in/out from disk per second). Good indicator for SWAP. |
| -s          | Set the starting time of the data |

***Examples:***

> Check ram memory usage history

```bash
sar -r -f /var/log/sa/sa29
```

> This reports I/O statistics. “1 3” reports for every 1 seconds a total of 3 times

```bash
sar -b 1 3
```

> Checks historic logs and outputs what time the highest load occurred

```bash
echo; echo -e "time \t  =>\tCPU load / 100%"; echo "--------------------------------"; sar -f /var/log/sa/sa01 | awk '{print $1 "  =>\t" $3}' | sort -k3 -n | tail
```

## watch command

Execute a program periodically, showing output fullscreen.

***Options:***

| Flag        | Description |
| ----------- | ----------- |
| -d          | Highlight the differences between successive updates |
| -n          | Specify update interval in seconds |

***Examples:***

> checks hot-copy every 1 second and highlights changes

```bash
watch -d -n 1 'hcp -l'
```

## ss command

utility to investigate sockets also allows showing information similar to netstat.

***Options:***

| Flag        | Description |
| ----------- | ----------- |
| -a          | Display both listening and non-listening sockets. (for TCP this means established connections) |
| -t          | Display TCP sockets |
| -u          | Display UDP sockets |
| -x          | Display Unix domain sockets |
| -n          | Numeric instead of process name (Do not try to resolve service names) |
| -l          | Display only listening sockets (these are omitted by default) |
| -p          | Show process and PID using socket |
| -s          | Print summary statistics |
| -4          | Display only IP version 4 sockets |
| -6          | Display only IP version 6 sockets |
| -state      | The state of the connection i.e. ‘listening’ or ‘established’ |
| -dst        | Specifies the destination IP to look at it’s connections to/from your server |

***Examples:***

> TCP - UDP - Numeric - Listening - Processes

```bash
ss -tunlp
```

> Display all TCP sockets and associated processes

```bash
ss -tap
```

> Display all established ssh connections

```bash
ss state established '( dport = :ssh or sport = :ssh )'
```

> Search for ipv4 with established connections

```bash
ss -4 state established
```

> Show connected sockets from specific address

```bash
ss dst 192.168.1.139
```

> Find all local processes connected to X server

```bash
ss -x src /tmp/.X11-unix/*
```

> Shows all TCP/UDP Listening ports on 22 (source port). Use "dport" for destination

```bash
ss -tunlp 'sport = :22'
```

> List all the tcp sockets in state FIN-WAIT-1 for our apache to network 193.233.7/24 and look at their timers

```bash
ss -o state fin-wait-1 '( sport = :http or sport = :https )' dst 193.233.7/24
```

> Grabs all http(s) connections and counts the amount of connections per IP

```bash
ss '( sport = :http or sport = :https )' | awk '{print $6}' | awk -F: '{print $1}' | sort | uniq -c | sort -n
```

## netstat command

Print network connections, routing tables, interface statistics, masquerade connections, and multicast memberships. (DEPRECATED NOW, Use SS if you can).

***Examples:***

> Finds the most connections from an IP address (established or closed) and sorts them

```bash
netstat -ntu | awk '{print $5}' | cut -d: -f1 | sort | uniq -c | sort -n
```

## tcpdump command

Prints out a description of the contents of packets on a network interface that match the boolean expression.

***Options:***

| Flag        | Description |
| ----------- | ----------- |
| -c **N**    | Exit after receiving count N packets |
| -nn         | Don’t convert host addresses to names (to avoid DNS lookups to reduce overhead), protocol and port numbers etc. to names either |
| -i **X**    | Listen on interface X |
| -w **X**    | Save capture in pcap format to X |
| -v          | Verbose output |

***tcpdump Filters:***

On most firewalls running tcpdump with no filters will produce so much output that it will prove very difficult to find traffic of interest. There are numerous filtering expressions available that limit the traffic displayed or captured.

***Host filters:***

To filter for a specific host, append host and the IP address to the tcpdump command. To filter for host 192.168.1.100 use the following command:

```bash
tcpdump -ni igb1 host 192.168.1.100
```

That will capture all traffic to and from that host. To only capture traffic being initiated by that host, use the src directive:

```bash
tcpdump -ni igb1 src host 192.168.1.100
```

Similarly, filtering for traffic destined to that IP address is possible by specifying dst:

```bash
tcpdump -ni igb1 dst host 192.168.1.100
```

***Network filters:***

Network filters narrow the capture to a specific subnet using the net expression. Following net, specify a dotted quad ( 192.168.1.1 ), dotted triple ( 192.168.1 ), dotted pair ( 192.168 ) or simply a number ( 192 ). A dotted quad is equivalent to specifying host, a dotted triple uses a subnet mask of 255.255.255.0, a dotted pair uses 255.255.0.0, and a number alone uses 255.0.0.0.

The following command displays traffic to or from any host with a 192.168.1.x IP address:

```bash
tcpdump -ni igb1 net 192.168.1
```

The next command will capture traffic to or from any host with a 10.x.x.x IP address:

```bash
tcpdump -ni igb1 net 10
```

A CIDR mask can also be passed as an argument to net:

```bash
tcpdump -ni igb1 src net 172.16.0.0/12
```

***TCP/UDP port filters:***

To filter on TCP and UDP ports, use the port directive. This captures both TCP and UDP traffic using the specified port either as a source or destination port. It can be combined with tcp or udp to specify the protocol, and src or dst to specify a source or destination port.

Capture all HTTP traffic:

```bash
tcpdump -ni igb1 tcp port 80
```

Capture all DNS traffic (usually UDP, but some queries use TCP):

```bash
tcpdump -ni igb1 port 53
```

***Protocol filters:***

Specific protocols can be filtered using the proto directive or by using the protocol name directly. Parameters passed to the proto directive can be specified using the IP protocol number or one of the names icmp, igmp, igrp, pim, ah, esp, carp, vrrp, udp, or tcp. Because the normal protocol names are reserved words, they must be escaped with one or two backslashes when used with the proto directive, depending on the shell. The shell available in pfSense requires two backslashes to escape these protocol names. If a syntax error is returned, check that the protocol name is properly escaped.
The following capture will show all ICMP traffic on the igb1 interface:

```bash
tcpdump -ni igb1 proto \icmp
```

***Negating a filter match***

In addition to matching specific parameters, a filter match can be negated by specifying not in front of the filter expression. When troubleshooting something other than CARP, and its multicast heartbeats are cluttering the capture output, exclude it as follows:

```bash
tcpdump -ni igb1 not proto \\carp
```

***Combining filters***

Any of the aforementioned filters can be combined using and or or. The following sections provide some examples.

Display all HTTP traffic to or from 192.168.1.11:

```bash
tcpdump -ni igb1 host 192.168.1.11 and tcp port 80
```

***Logical or operator***

Examples:

```bash
tcpdump src net 10.43.13.66 or src net 10.43.13.119
tcpdump src net 10.43.12.120 or src net 10.43.12.110
```

***Examples:***
> just read it..

```bash
tcpdump -nn -i p1p1 “tcp[tcpflags] & (tcp-syn|tcp-ack) = tcp-syn”
```

> Prints the start and end packets (the SYN and FIN packets) of each TCP conversation that involves the IP range ‘112.160.0.0/11’ on interface p1p1 and doesn’t convert hostnames or port etc

```bash
tcpdump -nn -i p1p1 "tcp[tcpflags] & (tcp-syn|tcp-ack) != 0" and net 112.160.0.0/11
```

> just read it..

```bash
tcpdump -c 100000 -nn -i p1p1 "tcp[tcpflags] & (tcp-syn|tcp-ack) != 0" | awk '{print $3}' | cut -d. -f 1-3 | sort | uniq -c | sort -nr | head -20
```

> Capture all packets to/from IP “202.124.241.70” from any interface

```bash
tcpdump -vvvv host 202.124.241.70
```

## ip command

Show / manipulate routing, devices, policy routing and tunnels.

***Options:***

| Flag        | Description |
| ----------- | ----------- |
| route       | Routing table management (Manipulate route entries in the kernel routing tables) |
| address     | Shows addresses assigned to all network interfaces |

***Examples:***

> Displays ip addresses (shorthand form). Can do the same for routes -> ip r

```bash
ip a
```

> Other Examples

```bash
ip route add {NETWORK/MASK} via {GATEWAYIP}
ip route add {NETWORK/MASK} dev {DEVICE}
ip route add {NETWORK/MASK} via {GATEWAYIP} dev {DEVICE}
ip route add default {NETWORK/MASK} dev {DEVICE}
ip route add default {NETWORK/MASK} via {GATEWAYIP}
```

```bash
ip r add 172.19.34.0/24 via 172.16.36.137 dev bond0.101
Ip r del 172.19.34.0/24 via 172.16.36.137 dev bond0.101
```

## iptables command

Iptables and ip6tables are used to set up, maintain, and inspect the tables of IPv4 and IPv6 packet filter rules in the Linux kernel. Several different tables may be defined. Each table contains a number of built-in chains and may also contain user-defined chains.

**Note:** [It may be best to read the fundamentals on iptables if you don’t already know them (or need a refresher)](https://www.thegeekstuff.com/2011/01/iptables-fundamentals/)

**The options and flags that are recognized by iptables can be divided into several different groups:**

### TARGETS

A firewall rule specifies criteria for a packet and a target. If the packet matches a rule, then the next rule is specified by the value of the target. It can be a user-defined chain or one of the following:

| Rule      | Description |
| ----------- | ----------  |
| ACCEPT | let the packet through |
| DROP | Drop the packet/connection, act like it never happened. This is best if you don’t want the source to realize your system exists |
| RETURN | stop traversing this chain and resume at the next rule in the previous (calling) chain |

### TABLES

| flag        | Description |
| ----------- | ----------- |
| -t **table** | This option specifies the packet matching table which the command should operate on. The tables are as follows: `filter`, `nat`, `mangle`, `raw`, `security`  |

| table       | Description |
| ----------- | ----------- |
| **filter**  | This is the default table (if no -t option is passed) |
| **nat**     | This table is consulted when a packet that creates a new connection is encountered |
| **mangle** | This table is used for specialized packet alteration |
| **raw** | This is used mainly for configuring exemptions from connection tracking in combination with the NOTRACK target |
| **security** | This table is used for Mandatory Access Control (MAC) networking rules |

***Options:***

---

***Commands:***

These options specify the desired action to perform. Only one of them can be specified on the command line unless otherwise stated below.

| Command     | Description |
| ----------- | ----------- |
| `-A chain rule-spec` | Append one or more rules to the end of the selected chain |
| `-C chain rule-spec` | Check whether a rule matching the specification does exist in the selected chain |
| `-D chain rulenum` | Delete one or more rules from the selected chain |
| `-I chain [rulenum] rule-spec` | Insert the rule at line number ‘rulenum’ |
| `-R chain rulenum rule-spec` | Replace a rule in the selected chain at line number ‘rulenum’ |
| `-S [chain]` | Print all rules in the selected chain |
| `-L [chain]` | Print all rules in the selected chain |

***Parameters:***

The following parameters make up a rule specification (used in the add, delete, insert, replace and append commands).

| Parameter   | Description |
| ----------- | ----------- |
| `-p protocol` | Protocol of the rule or the packet to check. The protocol can be one of tcp, udp, udplite, icmp etc |
| `-s address[/mask][,...]` | Source address can be a network name, hostname, IP address (with /mask) |
| `-d address[/mask][,...]` | Destination address (same as above) |
| `-m match` | Specifies a match to use, that is, an extension module that tests for a specific property |
| `-j target` | This specifies the target of the rule; i.e., what to do if the packet matches it |
| `-i name` | Name of an interface via which a packet was received (only for packets entering the INPUT, FORWARD and PREROUTING chains) |
| `-o name` | Name of an interface via which a packet is going to be sent (for packets entering the FORWARD, OUTPUT and POSTROUTING chains) |
| `-v` | Verbose output |
| `--line-numbers` | When listing rules, add line numbers to the beginning of each rule |

***Examples:***

> List all rules without performing RDNS lookup and output line numbers (verbose)

```bash
iptables -vnL --line-numbers
```

> Same as above without verbosity of packets and line numbers

```bash
iptables -nL
```

> Append ACCEPT of zabbix proxy IP source (change this based on proxy used) for icmp echo request type with comment

```bash
iptables -A INPUT -s 101.0.101.20/32 -p icmp --icmp-type 8 -m comment --comment "Digital Pacific ICMP Monitoring" -j ACCEPT
```

***To delete a rule, there are two ways:***

1. By specification (i.e. extrapolated from the `-S` output above):
    - First, get the output of the rule from the -S display, then replace -A with -D to delete the rule instead of add it. So if my -S output was: `-A DENYIN -s 103.210.27.6/32 ! -i lo -j DROP`. I would remove this by replacing ‘-A’ with ‘iptables -D’ to issue a delete of this specific rule in the DENYIN chain: `iptables -D DENYIN -s 103.210.27.6/32 ! -i lo -j DROP`.

2. By line number (easier if you know the chain the rule is in already, otherwise use above):
    - The below will remove the second entry in the INPUT chain:
        - `iptables -D INPUT 2`

## iptables-save command

iptables-save  and  ip6tables-save are used to dump the contents of IP or IPv6 Table in easily parsable format to STDOUT.

***Options:***

| Flag        | Description |
| ----------- | ----------- |
| -t **table** | Restrict output to only one table |

## snmpwalk command

Retrieve a subtree of management values using SNMP GETNEXT requests.

***Options:***

| Flag        | Description |
| ----------- | ----------- |
| -v **X**    | Use SNMP Version **X** |
| -c          | Community name  |

***Examples:***

> Use version 2c, community name “DPSNMP2006”, then hostname and OID (it will list every OID after “.1.3.6.1.4.1.674” in the tree

```bash
snmpwalk -v2c -c DPSNMP2006 sansw06.cp.glsw.digitalpacific.com.au .1.3.6.1.4.1.674
```

## lsof command

Lists file information about files opened by processes (Lists open files)

***Options:***

| Flag        | Description |
| ----------- | ----------- |
| -p          | Open files from process ID |
| -i          | Open internet file via ipv4 (default). Specify -i 6 for IPv6 |
| -u          | Login user ID or Name (1234,abc) |
| -l          | inhibits the conversion of user ID numbers to login names |
| -n          | Inhibits the conversion of network numbers to host names for network files |
| +\|- L      | Enables (+) or disables (-) the listing of file link counts. When +L is followed by a number, only files having a link count less than that number will be listed |
| +D          | Causes lsof to search for all open instances of directory D and all the files and directories it contains to its complete depth |

***Examples:***

> list open files in path

```bash
lsof +D /path
```

> list open files from user with UID 1234

```bash
lsof -lu 1234
```

> To list all open IPv4 network files in use by the process whose PID is 1234

```bash
lsof -i 4 -a -p 1234
```

> Identify a file with open connection to a port (e.g. 3306 for mysql)

```bash
lsof -i TCP:3306
```

> To list all open Internet, x.25 (HP-UX), and UNIX domain files

```bash
lsof -i -U
```

> To list all files using any protocol on ports 513, 514, or 515 of host wonderland.cc.purdue.edu

```bash
lsof -i @wonderland.cc.purdue.edu:513-515
```

> Search for recent deleted files that are still open

```bash
lsof -n | grep deleted | less
```

> find out which process is using a deleted (unlinked) file

```bash
lsof +L1
```

> Checks which processes are running on which socket

```bash
lsof -i -P -n
```

**If trying to find if any process is touching a file**, use the command fuser (below)

## fuser command

identify processes using files or sockets.

***Options:***

| Flag        | Description |
| ----------- | ----------- |
| -k          | Kill processes accessing the file |

***Examples:***

> Checks file.txt and processes that have it open

```bash
fuser file.txt
```

## journalctl command

Query the systemd journal.

***Options:***

| Flag        | Description |
| ----------- | ----------- |
| -a          | Show all fields in full, even if they include unprintable characters or are very long. |
| -e          | Immediately jump to the end of the journal inside the implied pager tool. |
| -r          | Reverse output so that the **newest** entries are displayed **first**. |
| -x          | Augment log lines with explanation texts from the message catalog. |
| -k          | Show only kernel messages. |
| -u          | Show messages for the specified systemd unit UNIT (such as a service unit). |
| --no-pager  | Do not pipe output into a pager. |

***Examples:***

> Gets logs for jenkins service, last 50 lines and don't use a pager (i.e. wrap lines to stdout)

```bash
journalctl -u jenkins -n 50 --no-pager
```

> Reverse logs so new at top, jenkins service

```bash
journalctl -ru jenkins
```

## strace command

Intercepts and records the system calls which are called by a process. traces all system calls issued by a program along with their return codes.

[List of unix system calls here.](https://www.tutorialspoint.com/unix_system_calls/index.htm)

***Options:***

| Flag        | Description |
| ----------- | ----------- |
| -p          | Attach to the process with the process ID specified |
| -t          | Prefix each line of the trace with the wall clock time    |
| -tt         | If given twice, the time printed will include the microseconds |
| -T          | Show the time spent in system calls |
| -f          | Trace child processes as they are created by currently traced processes |
| -ff         | If the -o filename option is in effect, each processes trace is written to filename.pid where pid is the numeric process id of each process |
| -c          | Count time, calls, and errors for each system call and report a summary on program exit, suppressing the regular output |
| -r          | Print a relative timestamp upon entry to each system call. This records the time difference between the beginning of successive system calls |

***Examples:***

> Stack Trace 'lsphp' process and send output to file (regex [ ] removes grep process)

```bash
ps auxw | grep '[l]sphp' | awk '{print " -p " $2}' | xargs strace -o ~/strace.log
```

> strace PID 1234 - will tell you what's going on right now with this process

```bash
strace -p 1234
```

> strace PID for lsphp of one client and output to file

```bash
USRNAME="golfingo"
while true
do
    CLIENT_PIDS=$(pgrep -u ${USRNAME} -l | grep [l]sphp)
    if [[ -z ${CLIENT_PIDS} ]]; then
        continue
    else
        echo ${CLIENT_PIDS} | awk '{print " -p " $1}' | xargs strace -tt -ff -T -o ~/strace-$(date +%F_%R)
        break
    fi
done
```

> Then to grab the timings, sorted

```bash
awk '{print $NF}' strace-2021-02-23_13:27.4157722 | grep -oP '\d*\.\d*' | sort | uniq | sort
```

```bash
strace -vvtf -p 1234
```

```bash
strace -tt -T -f -p &> output1
```

***Notes:***

You can also use htop to attach to a process and view it’s stack trace with ‘s’ while in htop

## sysctl command

Reads and modifies the attributes of the system kernel.

***Options:***
| Flag        | Description |
| ----------- | ----------- |
| -a          | display all values currently available |
| -w          | change a sysctl or kernel parameter setting at runtime |

## systemctl command

Control the systemd system and service manager.

***Options:***

| Flag        | Description |
| ----------- | ----------- |
| -a          | show all loaded units, regardless of their state, including inactive units |

***Examples:***

> Boot into BIOS

```bash
systemctl restart --firmware-setup
```

> Enable service on startup

```bash
systemctl enable <service>
```

> List all service units

```bash
systemctl list-units
```

***Notes:***

Systemd took over the deprecated initd system

## free command

Display amount of free and used memory in the system

***Options:***

| Flag        | Description |
| ----------- | ----------- |
| -h          | Displays it in human readable sizes |

## find command

Search for files in a directory hierarchy

***Options:***

| Flag        | Description |
| ----------- | ----------- |
| -maxdepth **N** | Descend at most N (a non-negative integer) levels of directories |
| -mindepth **N** | Do not apply any tests/actions at levels less than N (a non-negative integer) |
| -atime **N** | File was last accessed N*24 hours ago |
| -amin **N** | File was last accessed N minutes ago |
| -mtime **N** | File's data was last modified N minutes ago |
| -mmin **N** | File's data was last modified N*24 hours ago |
| -empty      | File is empty and is either a regular file or a directory |
| -name P     | File name matches shell pattern **P** |
| -iname      | Like -name, but the match is case insensitive |
| -size **N[kMG]** | File uses N units of space, rounding up (kb, mb, gb sizes as kMG) |
| -type **C**     | File is of type C (d - Directory, f - File, l - Symlink) |
| -exec **command {} +** | This -exec action runs the specified command on the selected files, but the command line is built by appending each selected file name at the end |
| -user **uname** | File is owned by user uname (numeric user ID allowed) |
| -prune True | if the file is a directory, do not descend into it |
| **expr1** -o **expr2** | Or. expr2 is not evaluated if expr1 is true |
| -print      | If the output is not going to a terminal, it is printed as-is |
| -delete     | Delete files |

***Note:***

When trying to find a time greater/less than you must use +/-. Leaving default means exactly at that time e.g. -amin +60 means accessed more than 60mins ago. -60 means less than 60 mins ago.

***Examples:***

> Finds files in /home that are bigger than 300M, sorts them, outputs to log file

```bash
find /home/ /backup/ -size +300M -exec ls -lah {} \; | awk '{$1=$2=$3=$4=""; print substr($0,5)}' | sort -hr > ~/largefiles-sort.txt && cat ~/largefiles-sort.txt
```

> Find in “/home/*” size greater than 1GB

```bash
find /home/ -size +1G
```

> Find files larger than 200mb ONLY in home directory (non-recursive)

```bash
find /home -maxdepth 1 -type f -size +200M -exec ls -lah {} \+
```

> Find files > 100M in /*

```bash
find / -type f -size +100M -exec ls -lh {} \;
```

> Finds files in / larger than 100M

```bash
find / -type f -size +100M | xargs -I {} ls -lh {}
```

> Find “.trash” things

```bash
find /home/*/ -type d -iname ".trash" -exec du -sm {} \;
```

> Larger files command

```bash
find / -type d -path virtfs -prune -o -type d -path mail -prune -o -type f -size +100M  -exec ls -lah '{}' \; | tee /root/100mplus.txt
```

> finds files and grep’s search term in them

```bash
find . -type f -exec grep -i ‘<SEARCH_TERM>’ {} +
```

> Finds files ending in ‘.php’ and searches through them for SEARCH_TERM

```bash
find . -name '*.php' -type f -exec grep -i ‘SEARCH_TERM’ {} \;
```

> Finds files in / larger than 100M

```bash
find / -type f -size +100M | xargs -I {} ls -lh {}
```

> Finds files in / larger than 100M

```bash
find / -type f -size +100M | xargs -I {} ls -lh {}
```

> Searches for all 'oom_score_adj' for all PID's

```bash
find . -type f -name oom_score_adj -exec awk '{print FILENAME " : " $0}' {} \;
```

> Not as good as others, but some more options - Easier to read output

```bash
find / -type f -size +100M -exec ls -lh {} \; | awk -v PWD=$(basename $PWD) '{printf("%s/%s %s\n", PWD, $5, $9); }'
```

> Find command recursively searches for entries within every file

```bash
find . -type f -exec grep -i ‘<SEARCH_TERM>’ {} +
```

> Exclude dir1, dir2 and dir3, since in find expressions it is an action that acts on the criteria -path dir1 -o -path dir2 -o -path dir3 (if dir1 or dir2 or dir3), ANDed with type -d. Further action is -o print, just print

```bash
find . -type d \( -path dir1 -o -path dir2 -o -path dir3 \) -prune -o -print
```

> Conditionals

```bash
find . -type f -mtime +30 -name "*.log.*" -and -not -name "*.gz" -exec gzip {} \;
```

## du command

Estimate file space usage

A great alternative would be to use the `ncdu` program. Download it using your package manager

***Options:***

| Flag        | Description |
| ----------- | ----------- |
| -s          | Summarize (display only a total for each argument) |
| -S          | for directories do not include size of subdirectories (--separate-dirs) |
| -h          | Human Readable format sizes |
| --max-depth | Maximum number of directories to go down. |
| --exclude   |  `--exclude="./home/sami/mount/*"` - (example) |

***Examples:***

> Separates dirs and gives disk usage of them. Sorts, heads

```bash
du -Sh | sort -rh | head -15
```

> Usage with max depth

```bash
du -h --max-depth=0 /var/log
```

> File and folder disk usage (summarize and human readable)

```bash
du -sh /* | grep G
```

## df command

File system disk space usage.

***Options:***

| Flag        | Description |
| ----------- | ----------- |
| -h          | Human Readable format sizes |
| -i          | list inode information instead of block usage |

***Examples:***

> File system disk usage (Human readable flag)

```bash
df -h
```

## lsblk command

Lists information about all available or the specified block devices.

***Options:***

| Flag        | Description |
| ----------- | ----------- |
| -a          | Also list empty devices |
| -J          | JSON format     |
| -l          | Produce output in the form of a list |

## fsck command

Check and repair a Linux filesystem

***Options:***

| Flag        | Description |
| ----------- | ----------- |
| -N          | Doesn't execute it, just shows what it will do |
| -t          | Specify type of FS |
| -y          | This will cause the fs-specific fsck to always attempt to fix any detected filesystem corruption automatically |

***Examples:***

> Runs fs check and fixes issues on all devices

```bash
fsck -y
```

> Runs fs check and fixes issues on sda1

```bash
fsck /dev/sda1 -y
```

> Runs fsck on ext4 device /dev/xvfb1 and fixes issues

```bash
fsck.ext4 /dev/xvdb1 -y
```

***Note:***

Check a Linux ext2/ext3/ext4 family of file systems with the ‘e2fsck’ command. Option ‘-y’ Assumes an answer of ‘yes’ to all questions; allows e2fsck to be used non-interactively.

## parted command

A partition manipulation program.

**Note**: Use `fdisk` for drives that are < 2TB and either `parted` or `gdisk` for disk > 2TB.

***Options:***

| Flag        | Description |
| ----------- | ----------- |
| -l          | Lists partition layout on all block devices |

Commands:
| Flag        | Description |
| ----------- | ----------- |
| Help \| ?   | Print general help, or help on command if specified |
| mkpart [part-type name fs-type] start end |  |

## fdisk command

A program for managing partition tables and partitions on a hard disk.

**Note**: Use `fdisk` for drives that are < 2TB and either `parted` or `gdisk` for disk > 2TB

***Options:***

| Flag        | Description |
| ----------- | ----------- |
| -l          | List the partition tables for the specified devices and then exit |

***Steps:***

| Flag        | Description |
| ----------- | ----------- |
| p           | print existing partition table, take note of exact start and end sectors and the table id (usually 8e linux lvm, or 83 linux) |
| d           | delete the partition to be expanded (usually 2) |
| n           | create a new partition table, make it primary. By default will use all available sectors |
| t           | set the partition system id to what it's predecessors id was |
| p           | confirm your changes are sane, check ID, start and end sectors of the new partition |
| p           | write your changes |

## yum command

RPM based package manager for Red Hat and CentOS

[Cheatsheet](https://access.redhat.com/sites/default/files/attachments/rh_yum_cheatsheet_1214_jcs_print-1.pdf)

***Options:***

| Flag        | Description |
| ----------- | ----------- |
| -h          | Options go here |
| -o          | Other Option    |
| -h          | Options go here |
| -o          | Other Option    |
| -h          | Options go here |
| -o          | Other Option    |
| -h          | Options go here |
| -o          | Other Option    |
| -h          | Options go here |
| -o          | Other Option    |
| -h          | Options go here |
| -o          | Other Option    |
| -h          | Options go here |
| -o          | Other Option    |

***Examples:***

> install the latest version of a package

```bash
Yum install <Package_name>
```

> install all of the individual packages in a group, of the specified types

```bash
Yum group install <Package_group>
```

> list the available groups from all yum repos

```bash
Yum group list
```

> cleans the DB and metadata as if to start yum fresh - Cleans up yum cache directory

```bash
yum clean all
```

> Check the local RPM database for problems (runs for a long time)

```bash
yum check
```

> Query repositories for available package updates

```bash
yum check-update
```

> Will update every currently installed package

```bash
yum update
```

> Is the same as the update command with the --obsoletes

```bash
yum upgrade
```

> Searches yum transaction history - optional see info from specified transaction - Or undo that transaction

```bash
Yum history [info <ID>] [undo <ID>]
```

> Downgrades the package to an earlier version

```bash
# Can be the full package name with version number
Yum downgrade [package]
```

> Completes unfinished transactions when duplicate packages on the system

```bash
yum-complete-transaction
```

> lists duplicate packages

```bash
package-cleanup --dupes
```

> Removes duplicate packages

```bash
package-cleanup --cleandupes
```

> Remove package

```bash
yum remove package_name
```

> Find out which package provides some feature or file

```bash
yum provides <SEARCH_TERM>
```

> find packages when you know something about the package but aren't sure of it's name

```bash
yum search <SEARCH_TERM>
```

> Searches all packages configured in repos in yum.

```bash
yum list | grep <search>
```

> Produces a list of configured repositories

```bash
yum repolist
```

> Used to list a description and summary information about available packages

```bash
Yum info <Package_name>
```

> Installs nagios from the specific repo ‘epel’

```bash
yum --enablerepo=epel install nagios
```

> Disables the repo ‘epel-multimedia’

```bash
yum-config-manager --disable epel-multimedia
```

> Finds which packages provide a specific file or binary

```bash
yum whatprovides /usr/bin/identify
```

> Finds which package has installed the specified file or binary

```bash
rpm -q --whatprovides /usr/bin/identify
```

> Removes all but the 3 latest kernels. Helps remove old kernels if they’re filling up /boot partition

```bash
package-cleanup --oldkernels --count=2
```

## apt command

apt provides a high-level command line interface for the package management system

***Sub-Commands:***

| Command     | Description |
| ----------- | ----------- |
| install     | Installs package (can be regex) |
| update      | Update is used to download package information from all configured sources |
| remove      | Removes package (can be regex) |
| list        | Display a list of packages satisfying certain criteria. It supports glob patterns as well as options to list installed (--installed), upgradeable (--upgradeable) or all available (--all-versions) versions |
| upgrade     | Install available upgrades of all packages currently installed on the system from the sources configured |
| search      | Can be used to search for the given regex term(s) in the list of available packages and display matches |
| show        | Show information about the given package(s) including its dependencies, installation and download size |

***Examples:***

> install the latest version of a package

```bash
apt install <Package_name>
```

> Searches for which package contains the file

```bash
apt search <File_name>
```

> Lists all installed packages on the system

```bash
apt list --installed
```

## dpkg command

dpkg is a tool to install, build, remove and manage Debian packages

***Options:***

| Flag        | Description |
| ----------- | ----------- |
| -S          | Search for a filename from installed packages |
| -l          | List packages matching given pattern |
| -L          | List files installed to your system from 'package-name' |
| -i          | Install the (local?) package |
| --get-selections | Get list of package selections (without a pattern, defaults to list installed) |

***Examples:***

> Searches for which package owns 'htpasswd'

```bash
dpkg -S $(which htpasswd)
```

## rpm command

RPM Package Manager

***Options:***

| Flag        | Description |
| ----------- | ----------- |
| -q          | Query       |
| -U          | Upgrade package |
| -i          | Installs a new package |
| -v          | verbose     |
| -h          | Print 50 hash marks as the package archive is unpacked |

***Examples:***

> Downloads an RPM from a URL link to the RPM file

```bash
rpm -i <URL>
```

> Query for a package name

```bash
rpm -qa <package>
```

## dnf command

DNF is the next upcoming major version of YUM, a package manager for RPM-based Linux distributions

***Sub-Commands:***

| Command     | Description |
| ----------- | ----------- |
| install     | Installs local or repo packages |
| download    | Downloads the package instead |
| remove      | Uninstalls package |
| reinstall   | Reinstall a package that is having issues |
| repolist    | Lists enabled, disabled or all known repositories. Can add all to display all of them |
| search      | Search package metadata for keywords. Keywords are matched as case-insensitive substrings |
| provides    | Finds the packages providing the given search. Useful for finding files by file names provided |
| info        | Lists description and summary information about installed and available packages |
| history     | Allows the user to view what has happened in past transactions and act according to this information |
| clean all   | Performs cleanup of temporary files kept for repositories |
| list        | Prints lists of packages depending on the packages' relation to the system. (e.g. `list [installed|available]`) |
| group       | A virtual  collections  of packages. (e.g. `group [list|remove|install|info]`) |
| check-update | Non-interactively checks if any updates at all are available for your system |
| upgrade     | Updates each package to the latest version that is both available and resolvable |
| -v          | Verbose operation |
| -y          | Install without prompting the user for input |

***Examples:***

> install wget without prompting

```bash
sudo dnf -y install wget
```

> Installs a downloaded RPM

```bash
sudo dnf localinstall slack-3.4.0-0.1.fc21.x86_64.rpm
```

## snap command

The snap command lets you install, configure, refresh and remove snaps. Snaps are packages that work across many different Linux distributions, enabling secure delivery and operation of the latest apps and utilities.

***Sub-Commands:***

| Command     | Description |
| ----------- | ----------- |
| install     | Install snaps on the system |
| find        | Queries the store for available packages to install |
| remove      | Removes the named snap instance from the system |
| info        | Show detailed information about snaps |
| list        | Displays a summary of snaps installed in the current system |

***Examples:***

> Install spotify snap

```bash
snap install spotify
```

## php command

Running this alone opens PHP binary/interpreter (i.e. like running PHP scripting language).

***Options:***

| Flag        | Description |
| ----------- | ----------- |
| -m          | Show compiled in modules |
| -i          | Displays full PHP information and configuration |
| -v          | Display php version |
| -a          | Run PHP interactively (line by line in shell). This lets you enter snippets of PHP code that directly get executed |

***Examples:***

> spawns interactive php session, then gets memory_limit ini directive

```bash
php -a
echo ini_get('memory_limit');
```

## stow command

A "stow directory" is the root of a tree containing separate packages in private subtrees. When Stow runs, it uses the current directory as the default stow directory. The examples in this manual page will use /usr/local/stow as the stow directory, so that individual packages will be, for example, /usr/local/stow/perl and /usr/local/stow/emacs.

A "target directory" is the root of a tree in which one or more packages wish to appear to be installed. A common, but by no means the only such location is /usr/local. The examples in this manual page will use /usr/local as the target directory.

A "package" is a related collection of files and directories that you wish to administer as a unit -- e.g., Perl or Emacs -- and that needs to be installed in a particular directory structure -- e.g., with bin, lib, and man subdirectories.

To install:

```bash
apt install git stow -y
```

***Options:***

| Flag        | Description |
| ----------- | ----------- |
| -v          | verbose |
| -R          | tells stow to purge old links first making sure to clean up old references |
| -t **X**    | The target, or where this stow should be installed to (e.g. “-t ~”) |
| -D          | Unstow the packages that follow this option from the target directory rather than installing them |
| -n          | No-op (don’t do anything, just show me) |

***Examples:***

**Note**: Only use the `--adopt` flag if you intend to add an entire directory. If in doubt, RTFM: `man stow`.

**Note**: Use `--no-folding` flag if you don’t want stow to link an entire subdirectory, but rather all files in it.

> no-op, verbose, target directory = home directory and stow everything in this dotfiles repo to the local machine

```bash
stow -nvt ~ *
```

> same as above, but only stow the bash directory into the home directory (i.e. stow the directory of bash into home so that the original is tracked in git)

```bash
stow -nvt ~ bash
```

> Stow the git directory without symlinking (folding) the subdirs

```bash
stow --no-folding -nvt ~ git
```

> Execute the above instead of no-op

```bash
stow -vt ~ bash
```

> When you have a directory structure for different use cases or PC’s, you can cd into that and then deploy the links that way

```bash
cd bash; stow -nvt ~ wsl2
```

> THIS CAN BE DESTRUCTIVE, CARE! It adopts the files into stow/git dir (i.e. moves all the original files managed by stow and will adopt ALL the original files into the git dir)

```bash
stow --adopt -vt ~ *
```

> Adopts only the git dir tree into stow

```bash
cd ~/git/personal/dotfiles; stow --adopt -vt ~ git
```

> Unlinks the “bash” directory files from the home directory

```bash
stow -vDt ~ bash
```

## mysql command

Mysql simple SQL shell via cli.

Usage: `mysql [options] db_name`

***Options:***

| Flag        | Description |
| ----------- | ----------- |
| -B          | Print results using tab as the column separator, with each row on a new line |
| -s          | Silent mode. Produce less output. This option can be given multiple times to produce less and less output |
| -e          | Execute the statement and quit |
| -D          | The database to use (by name) |
| -N          | Do not write column names in results (removes headings and table format when used with -s) |

***Examples:***

> Counts the rows in the table from the database

```bash
mysql -Bse "SELECT COUNT(*) FROM table" database_name
```

## ab command

Tool for benchmarking your Apache Hypertext Transfer Protocol (HTTP) server. It is designed to give you an impression of how your current Apache installation performs

***Options:***

| Flag        | Description |
| ----------- | ----------- |
| -n **R**    | Number of requests (**R**) to perform for the benchmarking session |
| -c **X**    | Number of multiple requests to perform at a time (**X**). Default is one request at a time |
| -r          | Don't exit on socket receive errors |

***Examples:***

> 3 concurrent connections with 5 requests in total

```bash
ab -c 3 -n 5 https://itwire.com/business-it-news/storage.html
```

## tr command

Translate, squeeze, and/or delete characters from standard input, writing to standard output.

***Options:***

| Flag        | Description |
| ----------- | ----------- |
| -d          | delete characters |

***Examples:***

> Removes newlines

```bash
tr -d '\n'
```

## tar command

An archiving program designed to store multiple files in a single file (an archive), and to manipulate such archives.
Usage: `tar [options] [-f archive filename] FILE(S)`

***Options:***

| Flag        | Description |
| ----------- | ----------- |
| -c          | Create a new archive |
| -z          | Filter the archive through gzip |
| -v          | Verbosely list files processed |
| -f          | Use archive file or specify the File name type of the archive file |
| -x          | Extract files from an archive |
| -t          | List the contents of an archive |
| -C **DIR**  | Change to ‘dir’ before performing any operations |
| --remove-files | Remove files after adding them to the archive |

***Examples:***

> Create archive, compress with gzip, verbose, into filename ‘filename.tar.gz’ using filename.sql as the content to zip and tar

```bash
tar -czvf filename.tar.gz ~/filename.sql
```

> Create a tarball of clients public_html directory

```bash
tar -czvf /root/baileys2_pub_html_2020-07-14.tar.gz /home/baileys2/public_html
```

> Extract archive with gzip, verbose, using filename.sql as the tar file to use

```bash
tar -xzvf filename.sql.tar.gz
```

> List contents of tar file

```bash
tar -tvf archive.tar
```

> Create a gzipped archive from a directory using relative paths

```bash
tar -czvf filename.tar.gz -C path/to/directory
```

## screen command

Screen manager with VT100/ANSI terminal emulation

***Options:***

| Flag        | Description |
| ----------- | ----------- |
| -ls         | lists screen sessions |
| -r **N**    | Re-attached to screen session **N** |
| -S **X**    | Specified a name **X** for the screen session |
| ctrl + AD   | (While in screen) detaches you from the screen session |
| ctrl + AK   | (While in screen) kills the screen session |

***Examples:***

> Spins up a screen session with name ‘maldet-scan’

```bash
screen -S maldet-scan
```

## su command

Change user ID or become superuser

Usage: `su [options] [username]`

***Options:***

| Flag        | Description |
| ----------- | ----------- |
| -           | Provide an environment similar to what the user would expect had the user logged in directly |

***Examples:***

> Login as username. Leave username empty for root

```bash
su - username
```

## ln command

Make links between files

Usage: `ln [options] {source-filename} {destination-filename}`

***Options:***

| Flag        | Description |
| ----------- | ----------- |
| -s          | Make symbolic links instead of hard links |

***Examples:***

> Creates symlink from file to file2 in home

```bash
ln -s file /home/sami/file2
```

## useradd command

Create a new user or update default new user information

Usage: `useradd [options] username`

***Options:***

| Flag        | Description |
| ----------- | ----------- |
| -m          | Create the user's home directory if it does not exist from defaults in skel directory |
| -s          | The name of the user's login shell. If not provided, grabs default from /etc/default/useradd |

***Examples:***

> Adds ‘work’ user with default dir and all contents from skeleton dir

```bash
useradd -m work
```

## maldet command

Malware scanner

***Examples:***

> Updates version and signatures

```bash
maldet -d && maldet -u
```

> Scans everything (or optionally, can specify directory to scan)

```bash
maldet --scan-all
maldet --scan-all /home/[username]/public_html
```

> To launch a background scan for all user's public_html and public_ftp in all home directories

```bash
maldet -b --scan-all /home?/?/public_?
```

> List all scan reports time and SCANID

```bash
maldet --report list
```

> Show a specific report details

```bash
maldet --report SCANID
```

> Show all scan details from log file

```bash
grep "{scan}" /usr/local/maldetect/event_log
```

> View maldet log file events

```bash
Maldet -l
```

> Quarantine all malware from report SCANID e.g. maldet –quarantine 050910-1534.21135

```bash
maldet -q SCANID
```

## jq command

Command-line JSON processor

[Cheatsheet](https://lzone.de/cheat-sheet/jq)

Usage: `jq [options...] filter [files...]`

***Filters:***

| Filter      | Description |
| ----------- | ----------- |
| `.`         | This is a filter that takes its input and produces it unchanged as output |
| `.foo`      | When given a JSON object (aka dictionary or hash) as input, it produces the **value** at the key "foo", or null if there´s none present |
| `.[]`       | If you use the .[index] syntax, but omit the index entirely, it will return all of the elements of an array. Running .[] with the input [1,2,3] will produce the numbers as three separate results, rather than as a single array |
| `.[]?`      | Like .[], but no errors will be output if . is not an array or object |

***Conditionals and Comparisons:***

| Condition   | Description |
| ----------- | ----------- |
| //          | **Alternative operator** - A filter of the form a // b produces the same results as a, if a produces results other than false and null. Otherwise, a // b produces the same results as b. If you want to restrict the output of “null” (i.e. you want the output to be completely empty if the data doesn’t exist), then you would add “// empty” |

***Examples:***

> For every entry, grab the value from each of the “ips” keys or return nothing (empty) if it doesn’t exist. Then from that, pipe into “.[]” to output each of these items as individual entries (one per line - useful for creating a txt file where each entry should be on a separate line and not in an array). Note: You can use .[]? Instead of ‘// empty’ to omit the errors and ‘null’ responses

```bash
jq '.[].ips // empty | .[]' ms_ips.json | grep -oE "\b([0-9]{1,3}\.){3}[0-9]{1,3}\b" > ms_ipv4.txt
```

**Example JSON for below examples:**

```json
{
    "Records": [
        {
            "eventVersion": "1.08",
            "userIdentity": {
                "type": "AssumedRole",
                "principalId": "XXXXXXXXXXXXXXXXX",
                "arn": "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
                "accountId": "XXXXXXXXXXXXXXXXX",
                "sessionContext": {
                "sessionIssuer": {
                    "type": "Role",
                    "principalId": "XXXXXXXXXXXXXXXXX",
                    "arn": "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
                    "accountId": "XXXXXXXXXXXXXXXXX",
                    "userName": "AWSServiceRoleForNetworkFirewall"
                },
                "webIdFederationData": {},
                "attributes": {
                    "creationDate": "2021-10-15T00:14:18Z",
                    "mfaAuthenticated": "false"
                }
                },
                "invokedBy": "network-firewall.amazonaws.com"
            },
            "eventTime": "2021-10-15T00:19:18Z",
            "eventSource": "ec2.amazonaws.com",
            "eventName": "DescribeVpcs",
            "awsRegion": "XXXXXXXXXXXXXXXXX",
            "sourceIPAddress": "network-firewall.amazonaws.com",
            "userAgent": "network-firewall.amazonaws.com",
            "requestParameters": {
                "vpcSet": {
                "items": [
                    {
                    "vpcId": "XXXXXXXXXXXXXXXXX"
                    }
                ]
                },
                "filterSet": {}
            },
            "responseElements": null,
            "requestID": "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
            "eventID": "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
            "readOnly": true,
            "eventType": "AwsApiCall",
            "managementEvent": true,
            "recipientAccountId": "XXXXXXXXXXXXXXXXX",
            "eventCategory": "Management"
        },
        {
            ...More Blocks as above...
        },
    ]
}
```

> This will return only the value for the “eventType” key in the first record under “Records” key.

```bash
jq '.Records[1].eventType' event_history.json
```

> Iterates through ALL “eventType” keys for all records and counts/sorts the values.

```bash
jq '.Records[].eventType' event_history.json | sort | uniq -c | sort -n
  1      "AwsServiceEvent"
  64967  "AwsApiCall"
```

> This will return all records which have the “eventSource” value set to “ec2.amazonaws.com” and “userAgent” value set to “network-firewall.amazonaws.com” and only returns the values of the eventName & eventTime keys for all of the returned records, rather than the whole record. It also uses String interpolation on the values to put them on one line per record (or you could just return the actual values separating these items with commas like: .eventName, .eventTime.

```bash
jq '.Records[] | select(.eventSource==“ec2.amazonaws.com”) | select(.userAgent==“network-firewall.amazonaws.com”) | “\(.eventName) -> \(.eventTime)”' event_history.json
```
