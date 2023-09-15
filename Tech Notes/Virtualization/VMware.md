# VMWare

## vSAN

SDDC - Software defined Data Center

PFFT=1 - Primary Failures to Tolerate

## CLI commands

Use when logged into the server.

> Gives list of commands you can use

```shell
esxcli vsan
```

> Lists cluster information

```shell
esxcli vsan cluster get
```

> View networking details

```shell
esxcli vsan network list
```

> View storage details

```shell
esxcli vsan storage list
```

> View the Policies in effect, such as how many failures the vSAN can tolerate

```shell
esxcli vsan policy getdefault
```

> Summary of all vSAN Health Checks

```shell
esxcli vsan health cluster list
```
