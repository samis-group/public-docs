The _virsh command_ allows you to manage VMs interactively or in batch.

***Options:***

| Flag | Description |
| ---- | ----------- |
| -s | Session Name |
| -t | Target Session |

***Examples:***

> Gracefully shuts down a domain.

```bash
virsh shutdown ubuntu
```

> Immediately terminate the domain (force kill)

```bash
virsh destroy ubuntu
```

> Prints information about existing domains.  If no options are specified it prints out information about running domains.

```bash
virsh list
```

> Define a domain from an XML file.

```
virsh define ubuntu.xml
```

> Start a (previously defined) domain that is inactive

```bash
virsh start ubuntu
```
