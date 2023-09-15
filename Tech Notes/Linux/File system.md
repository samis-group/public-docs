# File System

File systems are built on top of volumes (logical or physical). The command mkfs can be used to create a file system on top of a volume. Once the file system is created we can mount the FS as per our need.

Common FS/Volume Commands:

| Command     | Description     |
| ----------- | -----------     |
| pvcreate    | Initializes the Physical Volume for later use by the Logical Volume Manager (LVM). Each Physical Volume can be a disk partition, whole disk, meta device, or loopback file. For DOS disk partitions, the partition id should be set to 0x8e using fdisk(8), cfdisk(8), or an equivalent. For whole disk devices only the partition table must be erased, which will effectively destroy all data on that disk |
|  vgcreate   | Creates a new volume group called VolumeGroupName using the block special device PhysicalDevicePath. If PhysicalDevicePath was not  previously  configured for LVM with pvcreate(8), the device will be initialized with the same default values used with pvcreate(8). |
| lvcreate    | lvcreate creates a new logical volume in a volume group by allocating logical extents from the free physical extent pool of that volume group. |
| pvdisplay   | allows you to see the attributes of one or more physical volumes like size, physical extent size, space used for the volume group descriptor area and so on. |
| vgdisplay   | vgdisplay allows you to see the attributes of VolumeGroupName (or all volume groups if none is given) with it's physical and logical volumes and their sizes etc. |
| lvdisplay   | lvdisplay allows you to see the attributes of a logical volume like size, read/write status, snapshot information etc. |
| pvs         | produces formatted output about physical volumes. |
| vgs         | produces formatted output about volume groups |
| lvs         | produces formatted output about logical volumes |

**Examples**:

```shell
pvcreate /dev/xvdg
vgcreate vg-xen /dev/xvdg
```

## How to mount an LVM partition in Linux

[Resource](https://www.cyberciti.biz/faq/linux-mount-an-lvm-volume-partition-command/).

The procedure to mount an LVM partition in Linux as follows:

1. Run `vgscan` command - scans all supported LVM block devices in the system for VGs
   1. You will see the name of the LV if it finds it. Note this down.
2. Execute `vgchange` command to activate volume: `vgchange -ay VolGroup00`
    (Alternatively, don’t tell it the name of the LVM volume and it will will enable all LVM’s it finds, not just the one you specify)

3. Type `lvs` command to get information about logical volumes. Note down the name of the LV under ‘LV’ column.
4. Find where this logical volume is mounted by going to /dev/VG/LV and see where this symlink goes
5. Create a mount point using the mkdir command: `mkdir -p /mnt/vol1`
6. Mount the LVM volume using `sudo mount /dev/mapper/DEVICE /path/to/mount`

```shell
mount {LV_PATH} /mnt/vol1
```

## How to expand a filesystem and partition

Inside vmware, attach a live os iso image and boot into it (I used Finnix):

1. Edit settings of the vm
2. Increase disk size
3. Attach the datastore iso
4. Click vm options tab
   1. Boot options -> Force BIOS setup -> ensure ticked
5. Save and boot vm
6. In bios, ensure CD/DVD is selected as first boot device
7. Save changes and boot vm

Now inside the live OS of your choice, use parted or fdisk to expand the disk:

### Recreate partition

Once booted into liveCD, Confirm which partition to expand (fdisk -l, pvs):

```shell
screen  
fdisk /dev/sda
```

Reboot the server again into the live CD so the kernel reads the new partition table.

It's ideal that you perform everything in screen.

If server uses Logical Volumes, you will need to bring it up manually:

```shell
vgscan  
vgchange -ay  
pvs
```

Resize the Physical Volume:

```shell
pvresize /dev/sda
```

Extend the Logical Volume. (Extends the Logical Volume using all available blocks):

```shell
lvextend -l+100%FREE /dev/mapper/VolGroup00-LogVol02
```

Or you can extend it a specified amount (e.g. to add 200gb):

```shell
lvextend -L+200G /dev/mapper/VolGroup00-LogVol02
```

Resize the Filesystem:

If `ext`:

```shell
resize2fs /dev/mapper/VolGroup00-LogVol02
```

If `xfs`:

```shell
xfs_growfs -d /dev/mapper/VolGroup00-LogVol02
```

Force Filesystem check on next boot, then monitor as the server comes online:

```shell
touch /forcefsck  
reboot
```
