# DNS

DNS Zone File location -> `/etc/named.conf`

DNS Records Location -> `/var/named/`

## PowerDNS

Search for the TLD or FQDN, So if provisioning `nxsrv73.cp.voc.digitalpacific.com.au` for example, the zone was called `voc.digitalpacific.com.au` and then I added the record in there for `nxsrv73.cp`.

Adding records for DRAC into AD:

Server Manager -> Roles -> DNS Server -> DNS -> AD01 -> Forward Lookup Zones -> dpac.com.au -> drac -> voc -> cp -> Right click new A

## Mass Update DNS Records

```shell
cd /var
cp -R named named.backup110527

# replace "ns1.smartservers.com.au." "ns3.whomedia.com.au." -- /var/named/*.db

service named restart

# If there are issues with serial not being today, run:

grep "serial, todays" /var/named/*.db | sed "s/://g" | cut -d/ -f4 | awk {'system("replace "$2" "strftime("%Y%m%d")"00 -- /var/named/"$1)'}
```

### Mass add ipv6 RDNS records

replace token with whatever postman gave you:

```shell
for line in $(printf '%.2x\n' {0..255}); do curl --location --request POST "https://ns1-internal.digitalpacific.com.au/rdns/rdns.php?ip=2401:fc00:0:109::${line}&rdns=n001.hatzislawyers.com.au" --header 'Authorization: Basic TOKEN'; done
```

## Troubleshooting corrupt zone files

1. SSH to ns1-internal.digitalpacific.com.au
2. mysql pdnsdb -e "select distinct domain_id from records where name like 'domain.com.au'"
3. mysql pdnsdb -e "select * from records where domain_id = 'ID_NO'"
4. Copy this output to vscode (ensure you’ve got the extension ‘Render CRLF Line Endings’ installed) and on the top bar, go to view > render whitespace (also ensure you’ve toggled word wrapping so it doesn’t wrap text, to make it easier to find)
5. Find out where the weird character is that is corrupting the zone and remove/re-add that entry to powerdns
