# Commands

Ansible-playbook command is used to run playbooks.

## Options

| Flag        | Description     |
| ----------- | -----------     |
| -i          | Specifies the inventory or host list file. |
| -m          | Module name to execute (e.g. apt) |
| -a          | Module arguments (e.g. name=blah, state=blah) |
| -l          | (*lowercase L*) Further limit selected hosts to an additional pattern |
| -b          | Become root     |

## Examples

> Sends a ping to “proxmox-backend.shaklab.com”

```bash
ansible remotehost.com -m ping
```

> Install latest version of apache on localhost (centos - yum) while assuming/becoming root

```bash
ansible remotehost.com -b -m yum -a “name=httpd state=latest”
```

> Starts apache and enables the service to start on boot

```bash
ansible remotehost.com -b -m service -a “name=httpd state=started enabled=yes”
```

> Copy secretFile from the local machine (src location) to the ‘remote’ machine (dest location) with owner, group and perms specified.

```bash
ansible remotehost.com -b -m copy -a “src=/home/sami/ansible/secretFile dest=/home/pinehead/ owner=pinehead group=pinehead mode=0644”
```

> Not specifying a module defaults to running a shell command.

```bash
ansible remotehost.com -b -a “ls -l /home/pinehead/ansible”
```

> inventory file `proxmox`

```bash
ansible-playbook -i proxmox  
```
