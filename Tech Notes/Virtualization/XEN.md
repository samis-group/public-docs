# XEN

## Installation

### CentOS

```shell
yum install centos-release-xen  
yum update  
yum install xen  
reboot  
yum groupinstall 'Virtualization'
```

Google how to install xen-tools

### Ubuntu

```shell
apt-get update  
apt-get upgrade  
apt-get install xen-system-amd64 xen-tools  
reboot
```

#### Boot configuration

```shell
vim /etc/default/grub.d/xen.cfg
```

#### Setup as boot xen kernel

```shell
grep menuentry /boot/grub/grub.cfg    # Search for the xen entry and copy it  
vim /etc/default/grub    # Change GRUB_DEFAULT to the name of the kernel in quotes  
update-grub
```

#### Update dom0 resource usage to restrict it

```shell
vim /etc/default/grub
```

Add the following:

```shell
GRUB_CMDLINE_XEN_DEFAULT="dom0_max_vcpus=1 dom0_mem=1024M,max:1024M"
# Then run
update-grub
reboot
```

## Configuration

Location for DOMAIN.cfg which create guest OS's

`/etc/xen`

Contains sample configs for PV and HVM

Global config file is:

`xl.conf`

Configure guest behaviour on host reboots and startups etc.

`/etc/defaul/xendomains`

xen logging

`/var/log/xen`

symlink to .cfg for guest domains you wish to load on boot

`/etc/xen/auto`

Stores files containing user data for guests

`/var/lib/xen`

Set defaults for 'xen-create-image' guests if no cmdline arguments specified

`/etc/xen-tools/xen-tools.conf`

## 'xl' Commands

> Lists all running domains

list

> Information on xen hosts

info

> Top for domains

top

> The rest

create

console

destroy

dmesg

migrate

reboot

restore

save

Shutdown

### 'xl' Examples

```shell
xl create /etc/xen/lpic01.cfg
xl console lpic01
```

> This will disconnect you from console

```shell
ctrl + > (right bracket?)
xl shutdown lpic01
```

## xen-tools Commands

> Create new Xen guest domain

xen-create-image

> List installed guest domains

xen-list-images

> Delete guest domains

xen-delete-image

### xen-tools Examples

```shell
xen-create-image --hostname=lpic01 --lvm=logvol --memory=256M \
--maxmem=512M --vcpus=1 --size=8G --swap=1G --fs=ext4 --dhcp --arch=amd64 \
--dist=jessie
```

## 'xenstore' Commands

Stores status and config info for each domain

> Lists contents of XenStore (keys, values and permissions)

```shell
xenstore-ls
```

> Set permission of keys

```shell
xenstore-chmod
```

> Test for existence of a key

```shell
xenstore-exists
```

> Read value of a key

```shell
xenstore-read
```

> Remove Key

```shell
xenstore-rm
```

## Setup HVM guest

```shell
lvcreate -n LVM_NAME -L 10G VG_NAME
```

Put installation ISO in xen accessible directory e.g. `/home/user`

```shell
cd /etc/xen; cp xlexample.hvm ubuntuHVM.cfg
vim ubuntuHVM.cfg
```

Make sure builder = `hvm`

If you want to use bridged networking: vif = [ 'bridge=xenbr0' ]

choose the lvm disk: disk = [ 'phy:/dev/PHYSICAL_VOL/LOGICAL_VOL,HDA_OR_SDA,w','file:/PATH/TO/ISO.iso,HDC_OR_SR0:cdrom,r' ]

Make it VNC instead of SDL?

boot = "dc"

> Tells the server to look for disk installation then cdrom

```shell
xl create /etc/xen/ubuntuHVM.cfg
```

VNC to the VM -> Need to first setup SSH tunnel:

```shell
ssh -l sami -L 5900:localhost:5900 10.0.0.7
```

vnciewer localhost::5900

Once installation is done, remove the iso line from disk = (above)

## Information

Difference between PV, HVM and PVH:

Paravirtualization (PV) is a virtualization technique originally introduced by Xen Project, later adopted by other virtualization platforms. PV does not require virtualization extensions from the host CPU and is thus ideally suited to run on older Hardware. However, paravirtualized guests require a PV-enabled kernel and PV drivers, so the guests are aware of the hypervisor and can run efficiently without emulation or virtual emulated hardware. PV-enabled kernels exist for Linux, NetBSD and FreeBSD. Linux kernels have been PV-enabled from 2.6.24 using the Linux pvops framework. In practice this means that PV will work with most Linux distributions (with the exception of very old versions of distros).

Full Virtualization or Hardware-assisted virtualization (HVM) uses virtualization extensions from the host CPU to virtualize guests. HVM requires Intel VT or AMD-V hardware extensions. The Xen Project software uses Qemu to emulate PC hardware, including BIOS, IDE disk controller, VGA graphic adapter, USB controller, network adapter etc. Virtualization hardware extensions are used to boost performance of the emulation. Fully virtualized guests do not require any kernel support. This means that Windows operating systems can be used as a Xen Project HVM guest. For older host operating systems, fully virtualized guests are usually slower than paravirtualized guests, because of the required emulation.

A key motivation behind PVH is to combine the best of PV and HVM mode and to simplify the interface between operating systems with Xen Support and the Xen Hypervisor. To do this, we had two options: start with a PV guest and implement a "lightweight" HVM wrapper around it (as we have done for ARM) or start with a HVM guest and remove functionality that is not needed. The first option looked more promising based on our experience with the Xen ARM port, than the second. This is why we started developing an experimental virtualization mode called PVH (now called PVHv1) which was delivered in Xen Project 4.4 and 4.5. Unfortunately, the initial design did not simplify the operating system - hypervisor interface to the degree we hoped: thus, we started a project to evaluate a second option, which was significantly simpler. This led to PVHv2 (which in the early days was also called HVMLite). PVHv2 guests are lightweight HVM guests which use Hardware virtualization support for memory and privileged instructions, PV drivers for I/O and native operating system interfaces for everything else. PVHv2 also does not use QEMU for device emulation, but it can still be used for user-space backends (see PV I/O Support).
