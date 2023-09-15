# Juniper

## Getting started

To find which switch the server is on, host the gateway IP:

```shell
sami@sami-desktop:~$ host 101.0.121.145
```

type `cli` to get you into cli mode

type `conf` to drop you into configure mode

If you're in configuration mode and want to show config, type  `run` beforehand to tell it you want to run a command and NOT configure it

[Overview of how the traffic will flow through a juniper device (i.e. NAT, policies, etc) and in which order](https://www.juniper.net/documentation/en_US/junos/topics/topic-map/security-srx-devices-processing-overview.xml.html)

## Commands

> will output the entire juniper config, save the config locally for later if required)

```juniper
show configuration
```

> Show configuration in a 'set' format that you can copy/paste based on your search term

```juniper
show configuration | display set | match <SEARCH_TERM>
```

> Shows changes to your new config as opposed to the latest committed config. Run this before committing.

```juniper
show | compare
```

> Reboots the router

```juniper
request system reboot
```

> Shuts down the router

```juniper
request system halt
```

```juniper
request system zeroize media
```

> will output security zones

```juniper
show security zones
```

> Shows if an interface has been flapping (on and off) - Can be used on bonded interfaces also

```juniper
show interfaces ae0 | match flapped
```

> Shows which interfaces the vlan is tagged on (much better than show config format because it reads the ranges which may not match)

```juniper
show vlans 3080
```

> Disable an interface

```juniper
set interfaces ge-1/0/17 disable
```

> Removes the disable on the interface

```juniper
delete interfaces ge-1/0/17 disable
```

> Shows the ARP table for the vlan interface - with IP addresses and the associated MAC addresses

```juniper
show arp interface vlan.2145
```

> Find a mac address/host port

```juniper
show ethernet-switching table brief
```

> Logs of mac address assignment and time it was learnt

```juniper
show ethernet-switching mac-learning-log
```

> shows partition information including actively booted from

```juniper
show system storage partitions
```

> Snapshots the backup partition to primary (this will FORMAT THE PRIMARY PARTITION)

```juniper
request system snapshot media internal slice alternate
```

> Start a TDR test to test the cable

```juniper
request diagnostics tdr (abort | start) interface interface-name
```

> Show results of tdr on all interfaces

```juniper
show diagnostics tdr
```

> Show results of tdr on specified interface

```juniper
show diagnostics tdr interface ge-1/0/4
```

> Display exhaustive system process information

```juniper
show system processes extensive
```

> s

```juniper
show chassis routing-engine
```

> s

```juniper
show chassis forwarding
```

> s

```juniper
show chassis environment
```

> s

```juniper
show security monitoring fpc 0
```

> Display the messages system log file

```juniper
show log messages
```

> Displays the chassisd log file

```juniper
show log chassisd
```

> Sets root password

```juniper
set system root-authentication plain-text-password
```

> Adds ssh public key (DP key example below)

```juniper
set system login user dpsupport authentication ssh-rsa "ssh-rsa <KEY> Digital Pacific Support"
```

> s

```juniper
show system core-dumps
```

> s

```juniper
show system core-dumps core-file-info /var/tmp/mib2d.core.0.gz detail member 1
```

> s

```juniper
show version
```

> s

```juniper
show system uptime
```

> System alarms indicate a missing rescue configuration or software license, where valid

```juniper
show system alarms
```

> Shows what log files are being recorded and stored

```juniper
show configuration system syslog
```

> Sets the description of vlan 2149 to ‘ded690-36953-private’

```juniper
set interfaces vlan unit 2149 description ded690-36953-private
```

> Restarts SNMP service

```juniper
restart snmp
```

> Shows the last 10 commits and when they were committed

```juniper
show system commit
```

> Comparing the commits from 3 -> 2 (0 being the latest)

```juniper
show system rollback compare 3 2
```

> Same as above but while in config mode and compares against current configuration

```juniper
show | compare rollback ?
```

> will check the commit for errors

```juniper
commit check
```

> This will write the changes but auto-rollback in 5 minutes if you don't confirm them

```juniper
commit confirmed 5
```

> Saves the config changes and exits configure mode

```juniper
commit and quit
```

> Saves the config changes and applies a comment

```juniper
commit comment "COMMIT DESCRIPTION"
```

> ‘rollback’ is used to uncommit changes made to the device. The number is the number of previous commits to go back to (so 0 is base - current config changes, 1 is last commit before current, 2 is 2 commits ago, etc)

```juniper
rollback 0
```

## Whitelist IP on SRX Juniper

```juniper
cli
Configure
set security zones security-zone untrust address-book address 110.141.228.37/32 110.141.228.37/32
# NOTE: first "IP" is the label, second is the actual IP
set security zones security-zone untrust address-book address-set customer_ips address 110.141.228.37/32
Commit and-quit
```

## See if IDP is being triggered

[Resource](https://www.juniper.net/documentation/en_US/junos/topics/topic-map/security-idp-overview.html)

### When to use IDP

Basically the rule of thumb is to use IDP on unencrypted services that are open to the public

e.g. http, ftp, mail

RDP at the limit..

> counters for ips blocked by idp

```juniper
show security flow ip-action
```

> counters for the idp rules being hit

```juniper
show security idp attack table
```

In conf mode, commit this to deactivate idp

```juniper
deactivate security idp
```

## Check if interface has flapped

```juniper
show interfaces ge-*/0/31 | match Flapped
show lacp timeouts ae21
```

## Moving dedicated server onto another VLAN

It’s best to draw it out on paper, go do that.

Note if dedi’s are on the same TOR:

dsw01 only has to worry about routing to the gateway, which is propagated via ospf from the other dsw*.

Once it hits the gateway on dsw\* then dsw\* will determine where to route it, which is to send it down that vlan.

Only if the dedi is under a different tor does the layer two have to traverse back through dsw01.

In that scenario, is when you would tag the vlan on the ae\* going to dsw\* because layer 2 wise, it wouldn’t know how to get to the correct physical address (MAC) if it isn’t tagged on the ae*.

### Tag the vlan on dsw01-pod01.apdcsy1.digitalpacific.com.au to the ae

If vlan 738 is going down to dsw04, then ae04 is the aggregated link to dsw04. So you would:

```juniper
set interfaces ae04 unit 0 family ethernet-switching vlan members 735
set interfaces ae04 unit 0 family ethernet-switching vlan members 738
```

The rest is just an example of the amount of commands I had to run and on which switches (may be different for your scenario):

### On dsw11 (TOR of existing VLAN config)

```juniper
set interfaces vlan unit 735 family inet address 101.0.105.173/30
set interfaces vlan unit 738 family inet address 172.16.68.129/29
set policy-options prefix-list ded1787-private-sources 172.16.68.128/29
set policy-options prefix-list ded1787-private-destinations 172.16.68.128/29
set vlans VLAN735 description DED1841-DED2007-DED2396-DED2816-DED90467-PUBLIC
set vlans VLAN738 description DED1841-DED2007-DED2396-DED2816-DED90467-PRIVATE
```

### On dsw04 (TOR where we’re changing VLAN config to other VLAN)

```juniper
delete interfaces ae6 unit 0 family ethernet-switching vlan members 1123
delete interfaces vlan unit 1123 family inet filter input ded90467-private-input
delete interfaces vlan unit 1123 family inet filter output ded90467-private-output
delete interfaces vlan unit 1123 family inet address 172.16.68.129/29
delete forwarding-options helpers bootp interface vlan.1123 source-address-giaddr
delete routing-instances private interface vlan.1123
delete vlans VLAN1123 description DED90467-PRIVATE
delete vlans VLAN1123 vlan-id 1123
delete vlans VLAN1123 l3-interface vlan.1123
delete interfaces interface-range BLD09-CMC unit 0 family ethernet-switching vlan members 1122
delete interfaces ae5 unit 0 family ethernet-switching vlan members 1122
delete interfaces vlan unit 1122 family inet address 101.0.105.173/30
delete vlans VLAN1122 description DED90467-PUBLIC
delete vlans VLAN1122 vlan-id 1122
delete vlans VLAN1122 l3-interface vlan.1122
delete policy-options prefix-list ded90467-private-sources
delete policy-options prefix-list ded90467-private-destinations
delete firewall family inet filter ded90467-private-output
delete firewall family inet filter ded90467-private-input
delete vlans VLAN1123 description DED90467-PRIVATE
set interfaces ae6 unit 0 family ethernet-switching vlan members 738
set vlans VLAN738 description DED90467-PRIVATE
set vlans VLAN738 vlan-id 738
set interfaces interface-range BLD09-CMC unit 0 family ethernet-switching vlan members 735
set interfaces ae5 unit 0 family ethernet-switching vlan members 735
set vlans VLAN735 description DED90467-PUBLIC
set vlans VLAN735 vlan-id 735
set interfaces ae0 unit 0 family ethernet-switching vlan members 735
set interfaces ae0 unit 0 family ethernet-switching vlan members 738
```

### When doing blade switches - [Cisco Style](./Cisco.md)

swa2 is always private

swa1 is always public

Check position in ESM to find out which port to configure:  
Position 7,15 (means it’s a full height blade server taking 2 positions)

ssh to swa1 and swa2 switches (passwords in LP under usual):

```shell
ssh admin@swa1.bld09.ded.apdcsy1.digitalpacific.com.au
ssh admin@swa2.bld09.ded.apdcsy1.digitalpacific.com.au
```

Commands:

```cisco
en
show running-config (find interface e.g.):
interface Gi1/0/7
storm-control broadcast
storm-control multicast
description "DED90467-PUBLIC"
spanning-tree guard root
switchport access vlan 1122
exit
!
interface port-channel 1
switchport mode trunk
switchport trunk allowed vlan 73,378,620,657,739,940,1122,2051,2125,2138,2550,2832,2870,2872,3098,3233,3626,3628,3630,3632,3634,3636,3638-3639,3642,3645,3674,3784
exit
configure terminal
interface port-channel 1 (grabbed from above where vlans are tagged)
switchport trunk allowed vlan add 735
exit
vlan 735 (specify new vlan tag)
interface gigabitethernet 1/0/7
switchport access vlan 735
exit
exit
copy running-config startup-config
y
```

## Moving Dedicated Server Behind a Customer’s Firewall

It’s best to draw it out on paper first (like below), go do that. You can use draw.io to do this on the computer ([Template here](https://www.draw.io/#G1eKUkOVNqkgGww74ButmCTJ-wjJysPWsf))

![tors](/artifacts/images/Networking/networking_tors.png)

Find the TOR where the current dedi resides. In this case, it’s `dsw08-pod01.apdcsy1.digitalpacific.com.au`.

Note: You can find this by running the `host` command on the gateway IP. This will respond back with the PTR record of the device where the Gateway resides (The TOR it’s on). Alternatively, check ESM where it’s physically located and the TOR that sits on top of that chassis (**note**: if there are no TOR’s in that chassis, check the neighboring racks as we sometimes utilize 1 TOR per multiple racks, e.g. `APDCSY1:B07` might have it’s TOR on its neighboring chassis B08 or B06).

Also note, ae0 (on all the TOR’s) is usually always the aggregated link that goes back up to dsw01. You can check the description of this link to ensure that is the case with -> show configuration interfaces ae0 description.

Additionally, ae8 is usually always the aggregated link that goes down to dsw08 from dsw01, and so on for all other TOR’s, e.g. ae11 goes down to dsw11, etc.

From here on, I will be using the above example (with VLAN 2669), swap out hostnames/VLAN where required in your scenario.

> **Note**: Have a terminal session open on all of these TOR’s and the FW. Committing steps are as follows:

1. Create the VLAN Id’s on all switches
2. Tag the VLAN’s where they are needed
3. Commit.
4. Identify where the Gateway IP resides (in this case dsw08). We should only update the static route at the end otherwise OSPF will begin routing the traffic prematurely to the VLAN
5. Last step is to add the gateway to fw89790 so then the traffic is routed to fw instead of dsw08 and then commit these changes simultaneously.

> Define the VLAN on all 3 TOR’s and Customers Firewall

1. SSH to all the TOR’s (except dsw08 as it already has the vlan tag) and tag the VLAN:
   1. `set vlans VLAN2669 description DED91946-PUBLIC`
   2. `set vlans VLAN2669 vlan-id 2669`
2. SSH to the customer’s firewall and tag the VLAN as well as creating the interface for it (because traffic will now be routed through the firewall to the VLAN and this is why we create the interface here):
   1. `set vlans VLAN2669 description DED91946-PUBLIC`
   2. `set vlans VLAN2669 vlan-id 2669`
   3. `set vlans VLAN2669 l3-interface irb.2669`

> Tag the vlan on dsw01-pod01.apdcsy1.digitalpacific.com.au to the ae on top of the FW

Once you’ve found the TOR on top of the FW and ded (and have drawn it out as above), we will first tag the VLAN up to dsw01 from dsw08 and back:

1. On `dsw08-pod01.apdcsy1.digitalpacific.com.au`:
   1. ensure that it’s not already tagged up to dsw01 from dsw08:
      1. `show configuration interfaces ae0 | match 2669`
   2. If it’s not tagged up to dsw01, ensure you do this with the following command (check syntax on yours as per what’s already in config):
      1. `set interfaces ae0 unit 0 family ethernet-switching vlan members 2669`
2. Now on `dsw01-pod01.apdcsy1.digitalpacific.com.au`:
   1. do the same except for ae8. Tag the vlan on dsw01 with the following command (change ae8 wherever you’re tagging the VLAN):
      1. `set interfaces ae8 unit 0 family ethernet-switching vlan members 2669`

> Tag the vlan on the TOR of the firewall (dsw11-pod01-0.apdcsy1.digitalpacific.com.au)

Now we also have to tag the VLAN going down the aggregated link of the TOR on top of the firewall. Steps to do this:

1. On dsw11-pod01.apdcsy1.digitalpacific.com.au:
   1. Ensure that it’s not already tagged up to dsw01 from dsw11:
      1. `show configuration interfaces ae0 | match 2669`
   2. If it’s not tagged up to dsw01, ensure you do this with the following command (check syntax on yours as per what’s already in config):
      1. `set interfaces ae0 unit 0 family ethernet-switching vlan members 2669`
2. Now on dsw01-pod01.apdcsy1.digitalpacific.com.au:
   1. Do the same except for ae11. Tag the vlan on dsw01 with the following command (change ae11 wherever you’re tagging the VLAN):
      1. `set interfaces ae11 unit 0 family ethernet-switching vlan members 2669`

> Ensure the vlan is also tagged on the customers firewall going up to dsw11

Lastly, we need to ensure the VLAN is tagged on the customer’s firewall so it also knows how to route this VLAN traffic.

1. On fw89790.ch62838.smartservers.com.au:
   1. Ensure that the ae0 is a trunking port set on both physical interfaces (depending on configuration and setup) and that it is going back up to the TOR. If it is ae0 (which it usually is), then we will need to tag the VLAN on this aggregated link:
      1. `set interfaces ae0 unit 0 family ethernet-switching vlan members 2669`
   2. Additional Firewall config changes that may need to be done to ensure the firewall has the interface for the VLAN, is assigned the gateway IP address, etc. (Check the current config of another ded on the firewall and extrapolate what you need to do for this new one, if there is an existing one already). The configuration changes on the firewall will look something like:
      1. `set vlans VLAN2669 description DED91946-PUBLIC`
      2. `set vlans VLAN2669 vlan-id 2669`
      3. `set vlans VLAN2669 l3-interface irb.2669`
      4. `set security zones security-zone trust interfaces irb.2669 host-inbound-traffic system-services ping`
      5. `set security zones security-zone trust interfaces irb.2669 host-inbound-traffic system-services traceroute`
      6. `set interfaces irb unit 2669`
2. On dsw11-pod01.apdcsy1.digitalpacific.com.au:
   1. Tag the VLAN down to the firewall (using the ae grabbed from above):
      1. `set interfaces ae22 unit 0 family ethernet-switching vlan members 2669`
         1. **Note**: Find the ae to use here by doing a 'show configuration | display set | match fw89790'

```juniper
commit check
commit comment “Sami - LUL-754-16994 - Putting ded91946 behind fw89790"
```

### Final steps and cutover

1. On fw89790.ch62838.smartservers.com.au:
   1. `set interfaces irb unit 2669 family inet address 101.0.111.137/30`
2. On dsw08-pod01.apdcsy1.digitalpacific.com.au:
   1. `delete interfaces vlan unit 2669`
   2. `delete vlans VLAN2669 l3-interface`
3. on dsw11-pod01.apdcsy1.digitalpacific.com.au:
   1. `set routing-options static route 101.0.111.136/30 next-hop 101.0.68.62`

**Optional**: Start a ping to see if the interface comes back and how many packets will be lost:

Commit these changes:

`commit comment "Sami - LUL-754-16994 - Putting ded91946 behind fw89790"`

## Security Basics

- A security zone is a collection of one or more network segments requiring the regulation of inbound and outbound traffic through policies. Security zones are logical entities to which one or more interfaces are bound. With many types of Juniper Networks devices, you can define multiple security zones, the exact number of which you determine based on your network needs.
- An address book is a collection of addresses and address sets. Junos OS allows you to configure multiple address books. Address books are like components, or building blocks, that are referenced in other configurations such as security policies or NAT. You can add addresses to address books or use the predefined addresses available to each address book by default.
- An application set is a group of applications. Junos OS simplifies the process by allowing you to manage a small number of application sets, rather than a large number of individual application entries. The application (or application set) is referred to by security policies as match criteria for packets initiating sessions.
- A security policy is a stateful firewall policy that provides a set of tools to network administrators, enabling them to implement network security for their organizations. Security policies enforce rules for transit traffic, in terms of what traffic can pass through the firewall, and the actions that need to take place on traffic as it passes through the firewall.

## Understanding Security Zones i.e. Traffic flow

[Resource](https://www.juniper.net/documentation/en_US/junos/topics/topic-map/security-zone-configuration.html)

Basically, which IP addresses apply to which lists and the interface this list is applied to. This allows us to then firewall different interfaces/IP’s against the policies.

## Understanding Address Books and Address Sets

[Resource](https://www.juniper.net/documentation/en_US/junos/topics/topic-map/security-address-books-sets.html)

## Understanding Policy Applications and Application Sets

[Resource](https://www.juniper.net/documentation/en_US/junos/topics/topic-map/policy-application-sets-configuration.html)

## Understanding Security Policies i.e. Firewall rules (ACL’s)

[Resource](https://www.juniper.net/documentation/en_US/junos/topics/topic-map/security-policy-configuration.html)

## Creating a firewall rule for an interface (different to ACL’s which do traffic flow)

### Assign IP Addresses to Lists

Firstly, we must assign IP addresses to lists so that we can then add those lists to firewall rules.

An overview of the workflow is as follows:

IP’s -> List (containing the IP’s themselves ) -> filters (Containing rules) -> interface/vlan (in/out - allow/deny)

**Note**: The Lists can contain multiple items, including IP’s, Ports, VLAN’s etc. Basically in this instance we’re using IP’s but the rules can be matched against anything we specify.

Example case we will see in action below:

172.16.13.72/29 -> ded690-36953-private-sources -> ded690-36953-private-input -> accept

172.16.13.72/29 -> ded690-36953-private-destinations -> ded690-36953-private-input -> accept

etc.

A prefix list, sort of acts like a key containing items in it. Think of a json file. In this instance, the following commands will give you the following outcome:

`set policy-options prefix-list ded690-36953-private-sources 172.16.13.72/29`

Adds the subnet ‘172.16.13.72/29’ to the ‘prefix-list’ ‘ded690-36953-private-sources’.

`set policy-options prefix-list ded690-36953-private-destinations 172.16.13.72/29`

Adds the subnet ‘172.16.13.72/29’ to the ‘prefix-list’ ‘ded690-36953-private-destinations’.

`set policy-options prefix-list ded690-36953-private-destinations 172.19.0.0/29`

Adds the subnet ‘172.19.0.0/29’ to the ‘prefix-list’ ‘ded690-36953-private-destinations’.

`set policy-options prefix-list ded690-36953-private-destinations 172.19.12.0/24`

Adds the subnet ‘172.19.12.0/24’ to the ‘prefix-list’ ‘ded690-36953-private-destinations’.

ded690-36953-private-sources and ded690-36953-private-destinations labels now contain the following IP’s:

```json
{  
  'ded690-36953-private-sources': {172.16.13.72/29},
  'ded690-36953-private-destinations': {'172.16.13.72/29', '172.19.0.0/29', '172.19.12.0/24'}
}
```

This means that the IP addresses ‘172.16.13.72/29’ are added to the label ‘ded690-36953-private-sources’ and then this label is then assigned to firewalling rules (see below).

### Add label containing Lists of IP’s to Firewall Rules

Now we add the lists from above to the firewall rules. E.g. Below we add the IP’s specified from one of the lists above to a rule that we choose the name of (if it doesn’t exist).

We will first do the ‘input’ firewalling rules to the filter:

`set firewall family inet filter ded690-36953-private-input term accept then accept`

Creates the filter ‘ded690-36953-private-input’ (because it doesn’t exist yet) and adds an ‘accept’ block of lists to accept traffic from (i.e. if from these sources, then accept the traffic).

`set firewall family inet filter ded690-36953-private-input term accept from source-prefix-list ded690-36953-private-sources`

Adds to the filter ‘ded690-36953-private-input’ and allows IP’s inbound (note: source-prefix-list) from the list of IP addresses contained within ‘ded690-36953-private-sources’

`set firewall family inet filter ded690-36953-private-input term accept from destination-prefix-list ded690-36953-private-destinations`

Adds to the filter ‘ded690-36953-private-input’ and allows IP’s outbound (note: destination-prefix-list) from the list of IP addresses contained within ‘ded690-36953-private-destinations’

`set firewall family inet filter ded690-36953-private-input term deny then discard`

Adds to the filter ‘ded690-36953-private-input’ a default deny rule if the traffic doesn’t match the IP’s in the ‘accept’ block, then it will discard the traffic.

ded690-36953-private-input filter now has the following full configuration based on commands above:

```juniper
show configuration firewall family inet filter ded690-36953-private-input
term accept {  
    from {  
        source-prefix-list {  
            ded690-36953-private-sources;  
        }  
        destination-prefix-list {  
            ded690-36953-private-destinations;  
        }  
    }  
    then accept;  
}  
term deny {  
    then {  
        discard;  
    }  
}
```

Now we will do the same as above but this time for the ‘output’ firewall rules:

`set firewall family inet filter ded690-36953-private-output term accept then accept`

Creates the filter ‘ded690-36953-private-output’ (because it doesn’t exist yet) and adds an ‘accept’ block of lists to accept traffic from.

`set firewall family inet filter ded690-36953-private-output term accept from source-prefix-list ded690-36953-private-destinations`

Adds to the filter ‘ded690-36953-private-output’ and allows IP’s inbound (note: source-prefix-list) from the list of IP addresses contained within ‘ded690-36953-private-destinations’

`set firewall family inet filter ded690-36953-private-output term accept from destination-prefix-list ded690-36953-private-sources`

Adds to the filter ‘ded690-36953-private-output’ and allows IP’s outbound (note: destination-prefix-list) from the list of IP addresses contained within ‘ded690-36953-private-sources’

`set firewall family inet filter ded690-36953-private-output term deny then discard`

Adds to the filter ‘ded690-36953-private-output’ a default deny rule if the traffic doesn’t match the IP’s in the ‘accept’ block.

ded690-36953-private-output filter now has the following full configuration based on commands above:

```juniper
show configuration firewall family inet filter ded690-36953-private-output
term accept {  
    from {  
        source-prefix-list {  
            ded690-36953-private-destinations;  
        }  
        destination-prefix-list {  
            ded690-36953-private-sources;  
        }  
    }  
    then accept;  
}  
term deny {  
    then {  
        discard;  
    }  
}
```

We now have to assign those firewall rules to an interface where traffic goes through:

`set interfaces vlan unit 2149 family inet filter input ded690-36953-private-input`

Check traffic coming inbound to switch (from external source) for ‘interface’ vlan 2149 against this filter which has rules applied to it from 'ded690-36953-private-input'.

`set interfaces vlan unit 2149 family inet filter output ded690-36953-private-output`

Check traffic going outbound from the switch (dedi being the source) for ‘interface’ vlan 2149 against this filter which has rules applied to it from 'ded690-36953-private-output'.

**Note**: The vlan above isn’t an interface but junos allows you to set rules against them as if they were so that the firewall rules can be applied to traffic going in/out of the VLAN.

## Creating a firewall rule to allow two dedicated servers to talk to each other over private

This will be similar to adding above rules and is used as an example:

VLAN 3954 USED on dsw14-pod01.apdcsy1.digitalpacific.com.au (ded2960):

```juniper
set policy-options prefix-list ded2092-private-destinations 172.16.130.160/29
set firewall family inet filter ded2960-private-input term accept from destination-prefix-list ded2092-private-destinations
set firewall family inet filter ded2960-private-output term accept from source-prefix-list ded2092-private-destinations
```

VLAN 925 USED on dsw11-pod01.apdcsy1.digitalpacific.com.au (ded2092):

```juniper
set policy-options prefix-list ded2960-private-destinations 172.16.210.32/29
set firewall family inet filter ded2092-private-input term accept from destination-prefix-list ded2960-private-destinations
set firewall family inet filter ded2092-private-output term accept from source-prefix-list ded2960-private-destinations
```

## Whitelisting an application (port/ip)

Firstly, let's gather information from another policy and list to see what we should do:

First, check another application to see the syntax I should use.

`display set` - Makes it display in the exact syntax I should use to set this exact rule so I can use this syntax for creating others

```juniper
show configuration applications | display set
set applications application tcp-3389 protocol tcp
set applications application tcp-3389 destination-port 3389
```

Now we will find out how to add an IP address to a list and we will then add that list to a policy:

```juniper
show configuration | display set | match DP_Staff01
```

> This is like grep in that it matches for the search term 'DP_Staff01'

```juniper
set security zones security-zone untrust address-book address DP_Staff01 101.0.101.203/32
```

> This is an example of IP assigned to the list named 'DP_Staff01'. Here is the full policy and how to create it to allow certain labels (IP's) on certain applications (ports and protocols)

```juniper
show configuration | display set | match dp_management
```

> Now I find where dp_management is being assigned and how the syntax will look

```juniper
set security policies from-zone untrust to-zone trust policy dp_management match source-address DP_Staff01
```

> This is adding 'DP_Staff01' IPs to a policy named 'dp_management'

```juniper
set security policies from-zone untrust to-zone trust policy dp_management match destination-address any
```

> Matching any destination i.e. everything behind the FW (ded blah)

```juniper
set security policies from-zone untrust to-zone trust policy dp_management match application any
```

> Any application (i.e. port and protocol)

```juniper
set security policies from-zone untrust to-zone trust policy dp_management then permit
```

> Permitting traffic that matches this policy

**Note**: From zone untrust to zone trust means from 'outside/public' to inside 'behind FW'

So the entire config for this policy will look like this and this is what is essentially an ACL:

```juniper
show configuration security policies from-zone untrust to-zone trust policy dp_management
match {
    source-address [ DP_Staff01 ];      # Remember DP_Staff01 has IP '101.0.101.203/32' so we're matching traffic from that IP
    destination-address any;        # To anything behind FW
    application any;                            # Any application
}
then {
    permit;                                     # If it matches, then permit it through
}
```

So let's create the rule for TCP port 8888 on IP as an example from start to finish

I want to first create another application similar to what is already done above to allow TCP port 8888:

configure

> go into configuration mode

```juniper
set applications application tcp-8888 protocol tcp
```

> tcp-8888 is the name and assigning tcp protocol

```juniper
set applications application tcp-8888 destination-port 8888
```

> Setting the port for this application as 8888

Let's see our changes to far:

```juniper
show | compare
[edit applications]
    application tcp-2096 { ... }
+   application tcp-8888 {
+       protocol tcp;
+       destination-port 8888;
+   }
```

Now that I've created the 'application' (port and protocol) that the client wants open, i need to apply this application to a policy containing their IP to actually allow the traffic through:

```juniper
set security zones security-zone untrust address-book address customer-ip 101.0.104.26/32
```

> creating customer-ip as the label for the customers IP

```juniper
set security policies from-zone untrust to-zone trust policy customer-policy match source-address customer-ip
```

> customer-policy is the name of the policy allowing the label customer-ip to match

```juniper
set security policies from-zone untrust to-zone trust policy customer-policy match application tcp-8888
```

> tcp-8888 application is matched as the application in this policy

```juniper
set security policies from-zone untrust to-zone trust policy customer-policy match destination-address any  
```

> Destination to anything behind the FW in this policy

```juniper
set security policies from-zone untrust to-zone trust policy customer-policy then permit
```

> This policy will permit this traffic (i.e. allow it)

Another show compare to see changes that will be committed:

```juniper
show | compare
[edit security policies from-zone untrust to-zone trust]
      policy ded88757-allow { ... }
+     policy customer-policy {
+         match {
+             source-address customer-ip;
+             destination-address any;
+             application tcp-8888;
+         }
+         then {
+             permit;
+         }
+     }
[edit security zones security-zone untrust address-book]
       address DP_zabbix-proxy07 { ... }
+      address customer-ip 101.0.104.26/32;
[edit applications]
    application tcp-2096 { ... }
+   application tcp-8888 {
+       protocol tcp;
+       destination-port 8888;
+   }
```

If you see anything here like:

`Warning: missing mandatory statement(s): 'destination-address'`

This means that you're missing something, in this example above it would be the 'destination-address' needs to be specified in the policy.

Lastly you may want to check if there is any firewalling that could potentially block the traffic from this ACL that we just setup. Go through this:

```juniper
run show configuration firewall
```

Now check the commit will go through OK and not cause issues:

```juniper
commit check
```

Committing it now, and also adding a comment to your commit is good practice:

```juniper
commit comment "Sami - allowing customer application through - ZKK-663-49203"
```

## Reordering Security policies

[Reordering Security Policies - TechLibrary](https://www.juniper.net/documentation/en_US/junos/topics/topic-map/security-reordering-policies.html)

Use this to see how the policy will be fired when hit (it looks for an any/any/any rule to show you what may be the problem):

```juniper
show security shadow-policies from-zone untrust to-zone trust
```

Example moving a policy from zone untrust to trust before another:

```juniper
insert security policies from-zone untrust to-zone trust policy <POLICY_NAME> before policy <POLICY_NAME>
```

Example moving a policy from zone untrust to trust after another:

```juniper
insert security policies from-zone untrust to-zone trust policy <POLICY_NAME> after policy <POLICY_NAME>
```

## Renaming policies

```juniper
edit security policies
replace pattern TEST-AI with TEST-AI-123
top
```

## Reordering firewall filter terms

Example moving a firewall filter term after another:

```juniper
insert firewall family inet filter <FILTER_NAME> term <TERM_NAME> after term <TERM_NAME>
```

Example moving a firewall filter term before another:

```juniper
insert firewall family inet filter <FILTER_NAME> term <TERM_NAME> before term <TERM_NAME>
```
