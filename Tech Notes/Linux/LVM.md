# LVM

For more info: `man lvm`

Logical volume manager (LVM) introduces an extra layer between the physical disks and the file system allowing file systems to be:

- Resized and moved easily and online without requiring a system-wide outage.
- Using discontinuous space on disk.
- Meaningful names to volumes, rather than the usual cryptic device names.
- Span multiple physical disks.

LVM comprises of a few conceptual layers such as physical volume, logical volume and file systems:

![LVM1](/artifacts/images/Linux/LVM1.png)

The conceptual layers are in turn made up of smaller units like Physical extents(in case of Physical volumes) and Logical extents (in case of Logical Volumes).

![LVM1](/artifacts/images/Linux/LVM2.png)

## Physical Volume (PV)

Each Physical Volume can be a disk partition, whole disk, meta-device, or a loopback file. Use the command pvcreate to initialize storage for use by LVM. Initializing a block device as physical volume places a label at the start of the device.

## Volume Group (VG)

A Volume Group gathers together a collection of Logical Volumes and Physical Volumes into one administrative unit. Volume group is divided into fixed size physical extents. The command vgcreate creates a new volume group using the block special device Physical Volume path previously configured for LVM with pvcreate.

- VGs are made up of PVs, which in turn are made up of physical extents (PEs). The size of PE can differe in different VGs and is defined at the time of creating VG.
- The default size of PE is 4MB, but you can change it to the value you want at the time of VG creation.
- Generally, larger the PE size, better the performance (though less granular control of LV).

## Logical Volume (LV)

A Logical Volume is the conceptual equivalent of a disk partition in a non-LVM system. Logical volumes are block devices which are created from the physical extents present in the same volume group. You can use command lvcreate to create a logical volume in an existing volume group.
