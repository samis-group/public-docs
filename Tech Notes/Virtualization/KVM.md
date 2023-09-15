# KVM

## Installation

### CentOS

Need to ensure qemu-kvm is in our `PATH`. By default redhat doesn't do this because they want you to use libvirt

### Ubuntu

Login to shell as root

```shell
sudo -i
```

Ensure the virtualization extensions are available on the CPU

```shell
egrep -o '(vmx|svm)' /proc/cpuinfo
```

Ensure the kvm module is installed. If not, the last 2 commands load them into kernel

```shell
lsmod | grep kvm  
modprobe kvm  
modprobe kvm_intel # for intel  
modprobe kvm_amd # for AMD
```

Make sure this device is available as KVM uses it to facilitate direct hardware access

```shell
ls -al /dev/kvm  
apt update -y  
sudo apt-get install qemu-kvm libvirt-daemon-system libvirt-clients bridge-utils -y  
systemctl start libvirtd  
systemctl status libvirtd
```

## 'qemu-img' Commands

`man qemu-img` for more information

- check
- create
- commit
- compare
- convert
- info
- map
- snapshot
- rebase
- resize
- amend

```shell
qemu-img create -f qcow2 -b centos7.img snapshot.img
```

## 'qemu-kvm' Commands

`man qemu-kvm` for more information

> Sets the machine type:

`-M`

> Select the emulated machine name:

`-machine`

## 'qemu-kvm -monitor' Commands

Non-graphical (i.e. shell)

- stdio
- help
- info
