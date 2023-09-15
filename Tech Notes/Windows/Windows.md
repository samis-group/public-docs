# Windows

## Command Prompt

### Add Admin User Account

```powershell
net user /add [*username] [password]
net localgroup administrators [username] /add
```

### Group Policy Results

```powershell
gpresult /r
```

## Powershell

**TBD**.

## Routing

> Print routing table

```powershell
route print
```

### Add a Static Route to the Windows Routing Table

type a command using the following syntax:

```powershell
route -p ADD destination_network MASK subnet_mask gateway_ip METRIC metric_cost IF interface_id
```

Example:

```powershell
route -p ADD 116.90.0.0 MASK 255.255.192.0 10.0.0.1 1 IF 10
```

> Show Interfaces and ID's:

```powershell
netsh interface ipv4 show interfaces
```

The subnet_mask, interface and metric_cost components are optional to the command. If you don’t specify a subnet mask, 255.255.255.0 will be used automatically. If you don’t specify a metric cost, a cost one greater than the 0.0.0.0 destination entry will be used. The metric cost value is just a cost that is relative to other costs in the table and is used when Windows decides between multiple routes that could reach the same destination.

Other examples:

> Add a route to backup server via specified interface. (-p makes the route persistent)

```powershell
route -p ADD 172.19.34.0 MASK 255.255.255.0 172.16.200.1 METRIC <value> IF <interface_ID>
```

### Remove (delete) a Static Route from the Windows Routing Table

type a command using the following syntax (can choose specific entries using commands in brackets):

```powershell
route delete destination_network [MASK 255.255.255.0 172.16.200.1 METRIC <value> IF <if_ID>]
```

Example:

```powershell
route delete 172.19.34.0
```

## WSUS

Sometimes WSUS sending updates to client machines will fail, here are some suggestions to improve the success rate of applying updates:

WSUS ExecutionTimeout set to 7200
WSUS MaxRequestLength set to 204800
