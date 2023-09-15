# Dell

## Server Naming Conventions

**Letter**:

T - Tower (stand-alone server)

R - Rack (19" Rack Mountable)

M - Blade (modular)

**First digit**:

The first digit refers to the number of sockets in the system:

1 to 3 for one socket

4 to 7 for two sockets

8 or 9 for four sockets

**Second digit**:

The middle digit refers to the generation:

0 for Generation 10

1 for Generation 11

2 for Generation 12

3 for Generation 13

**Third digit**:

The third digit indicates the make of the CPU:

0 for Intel

5 for AMD

## I/O Modules and fabrics

[Resource](https://www.dell.com/support/manuals/en-au/poweredge-m1000e/m1000eownersmanual/io-connectivity?guid=guid-290b457e-415f-416c-ba49-a6d433896ba3&lang=en-us)

The chassis can have up to six I/O modules (IOMs), where each IOM is a pass-through or switch module. The IOMs are classified into three groups—A, B, and C. Each group has two slots - Slot 1 and Slot 2.

The slots are designated with letters, from left to right, across the back of the chassis: `A1` | `B1` | `C1` | `C2` | `B2` | `A2`. Each server has slots for two mezzanine cards (MCs) to connect to the IOMs. The MC and the corresponding IOM must have the same fabric.

- Group A IOM’s are always connected to the servers' on-board Ethernet adapters; the fabric type of A is Ethernet.
- For Group B, the IOM slots are permanently connected to the first Mezzanine Card slot in each server module.
- For Group C, the IOM slots are permanently connected to the second Mezzanine Card in each server module.

## DRAC

### Java Version Requirements (older models)

DRAC Java version required:

Java 7 update 79

### Enabling HTML5 DRAC

Dell 12th gen servers can now use HTML5. Enable by going into:

Overview Virtual Console -> Plug-in Type -> select HTML5. Click "Apply"

### Reset Lost IDRAC Password

In console, boot into the iDRAC configuration utility using Ctrl+E during POST and go to User Authentication to change username and password. You may also boot into the LifeCycle Controller (LCC) using the F10 key. Go to System Setup -> Advanced Hardware Configuration -> iDRAC Settings -> User Configuration to change the login credentials. Ideally, R720 comes with either iDRAC 7 Enterprise or Express.

Or via cli:

deploy -m server-X -u root -p $password

### Moving iDRAC to VPN

First thing you need to do is create an interface of type "DRAC" on the server in ESM if one doesn't already exist.

Second, you need to allocate an IP out of 172.19.224.0/20 for that interface

I believe there might be a script on net-manage01 that automates all of this

But.. let's do it manually so you can learn something

Third, you login to the CMC for the blade chassis that the blade is in

The current DRAC network config can be retrieved with

```shell
$ getniccfg -m server-2
LOM Model Name        = Embedded LOM
LOM Fabric Type        = Gigabit Ethernet
IPv4 Enabled            = 1
DHCP Enabled        = 0
IP Address            = 101.0.109.150
Subnet Mask            = 255.255.255.248
Gateway            = 101.0.109.145
IPv6 Enabled            = 0
Autoconfiguration Enabled    = 0
Link local Address        =  
IPv6 Gateway            = ::
VLAN Enable            = 1
VLAN ID            = 2822
VLAN priority            = 0
```

Where "server-2" means slot 2

(The server is in slot 2 as per ESM)

Next, we have two separate settings to change using setniccfg

One is the VLAN, the second is the IP address

We need to put the DRAC onto VLAN 4

```shell
setniccfg -m server-2 -v 4 0
```

Object value modified successfully

Once that's applied (check with getniccfg)

You can set the new static IP for the DRAC

```shell
setniccfg -m server-2 -s 172.19.226.133 255.255.240.0 172.19.224.1
```

Except the DRAC is a bit boned atm..

It's not responding to that command

Which is probably what @nathanial.marsh was referring to above

```shell
racreset -m server-2
ERROR: Fail to execute the racreset command on server 2, 00005108

racreset -m server-2 -f
RAC reset operation initiated successfully for server-2.
```

It may take up to a minute for the RAC(s) to come back online again.

Looks like it was really boned

So I forced a DRAC reset

```shell
setniccfg -m server-2 -s 172.19.226.133 255.255.240.0 172.19.224.1
```

Static IP address modified successfully

Alright, she's responding now

```shell
[01:13:27] <benoit@enceladus:~> ping 172.19.226.133
PING 172.19.226.133 (172.19.226.133) 56(84) bytes of data.
64 bytes from 172.19.226.133: icmp_seq=1 ttl=62 time=221 ms
64 bytes from 172.19.226.133: icmp_seq=2 ttl=62 time=215 ms
```

Last thing you need to do is go to the WHMCS page for the server

And update the remote console IP field

So that support staff know what to tell the customer if they need their DRAC IP

### OMSA

#### Common OMSA Commands

omreport storage pdisk controller=0  
omreport storage vdisk  
omreport storage battery  
omreport chassis

#### Restart OMSA

```shell
srvadmin-services.sh restart
```

[Resource](https://cs.uwaterloo.ca/~brecht/servers/docs/PowerEdge-2600/en/Dosa/CLI/cli_cc4r.htm)

#### Non-cert drives

```shell
omreport storage pdisk controller=0 | grep ^Status  
omreport storage pdisk controller=0 | grep ^Certified  
omreport system alertlog | less
```

#### Clearing alerts

RUN THIS FIRST TO SEE ALERT

```shell
omreport system alertlog

omconfig system esmlog action=clear  
omconfig system alertlog action=clear  
omconfig system cmdlog action=clear

# Restart Zabbix
service zabbix-agent restart
```

#### OMSA Version issue (if it's a 1 or lower series, requires 8.5, e.g. M610)

Check version install

```shell
rpm -qa | grep srvadmin
```

if version 9 please Uninstall by doing the following

```shell
yum remove srvadmin-*
```

Update Repo list (Disable any Dell repo's that may cause issues)

#### Dell omsa 8.5 repos

> CentosOS 7

dell-8.5

```shell
name=Dell Repository Server
baseurl=http://linux.dell.com/repo/hardware/DSU_17.11.01/os_dependent/RHEL7_64/
gpgcheck=0
enabled=1
```

> CentOS 6

dell-8.5

```shell
name=Dell Repository Server
baseurl=http://linux.dell.com/repo/hardware/DSU_17.11.01/os_dependent/RHEL6_64/
gpgcheck=0
enabled=1
```

Now install version 8.5 from the updated repo:

```shell
yum install srvadmin-*
```

Now Restart OMSA to check if it's working again:

```shell
srvadmin-services.sh restart
```

#### Installing OMSA on ESXI

[Resource 1](https://www.altaro.com/vmware/dell-openmanage-server-administrator-esxi/)

[Resource 2](https://www.dell.com/support/home/au/en/audhs1/drivers/driversdetails?driverid=w42nc)
