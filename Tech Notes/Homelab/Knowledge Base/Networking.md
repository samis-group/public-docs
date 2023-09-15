# VLAN’s

**Egress** - Traffic that **exits** an entity or a network boundary

**Ingress** - Traffic that **enters** the boundary of a network

**PVID** - A **Port VLAN ID** is a **default VLAN ID** that is assigned to an **access port** to designate the virtual LAN segment to which this port is connected.

## Difference between General, Trunk and Access Ports

[Resource](https://www.dell.com/community/Networking-General/Difference-between-General-ports-and-Trunk-ports/td-p/2279169)

### Access mode VLAN

By default sets egress to untagged, supports single VLAN configuration only, automatically sets PVID (native VLAN, ingress untagged) to configured VLAN.

Will accept untagged packets or tagged packets with VLAN ID to which the port is a member - in this case the port is a member of only one VLAN.  

_Allows **only one** untagged vlan to exist on a switch interface._

### Trunk mode VLAN

By default sets egress to tagged, supports multiple VLANs, does not set PVID (native VLAN, ingress untagged), native VLAN cannot be a configured Trunk VLAN or 4095 (discard VLAN).

_Allows **one** untagged vlan **and multiple** Tagged vlans to exist on the same switch interface._

### General mode VLAN

By default sets egress to tagged, supports multiple VLANs, does not set PVID (native VLAN, ingress untagged), native VLAN can be any defined VLAN. Setting the PVID removes default vlan (VID=1) for that port.. PVID can be 4095 (discard VLAN). General mode allows mix of tagged and untagged VLANs in the egress direction.

_Allows **multiple** untagged vlans and also **multiple** tagged vlans to exist on the same switch interface._

_While it is possible to have multiple untagged vlans on a General port, you can only have **ONE (1) PVID**. The PVID represents the **native VLAN**._

### Other Notes

If an access port receives a packet with an 802.1Q tag in the header other than the access VLAN value, that port drops the packet without learning its MAC source address. In other words, if the network device (or OS) on the other end of the access port link, doesn’t tag it’s packets with a vlan, then it essentially gets dropped here.

A fix for changing to trunk from access was because:

Only if you have VLAN tagging configured on the interface of the server side would it work.

Another explanation:
The OS was expecting a VLAN tag. Access mode strips the tag.
