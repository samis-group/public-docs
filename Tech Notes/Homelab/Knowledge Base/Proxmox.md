# Proxmox

## Handy Tips

Use based on your scenario, but these are some things that I think are worth noting:

* For better Processor access and usage, set the CPU type to **host** and then it will be hardware rather than software access and processing
* When it comes to doing truenas inside proxmox:
	* exclude the disks from pve, or else you will wonder why it periodically interrupts disk operations or wakes up sleeping disks
* disable the "use tablet for pointer" as that in itself causes 10+% CPU load on the host side for some reason
* It is recommend to use UEFI whenever possible because traditional bios is being deprecated and there are features that expect it, like encryption, etc
* disable "hardware" acceleration of virtIO as this is known to cause problems
* doing smart configuration (like APM, idle times) on the host side as the guest won't have access to smart data and alerts
* optionally moving the system dataset to the boot disk

## Enable HTTPS API

tbd.

## Deploy user with vm create perms

tbd.

## Install VirtIO Drivers

VirtIO Drivers are paravirtualized drivers for kvm/Linux (see http://www.linux-kvm.org/page/Virtio). In short, they enable direct (paravirtualized) access to devices and peripherals for virtual machines using them, instead of slower, emulated, ones.

Go [here](https://pve.proxmox.com/wiki/Windows_VirtIO_Drivers) for more information and for windows virtio support.
