# SSL

A certificate chain is an ordered list of certificates, containing an SSL Certificate and Certificate Authority (CA) Certificates, that enable the receiver to verify that the sender and all CA's are trustworthy. The chain or path begins with the SSL certificate, and each certificate in the chain is signed by the entity identified by the next certificate in the chain.

Any certificate that sits between the SSL Certificate and the Root Certificate is called a chain or Intermediate Certificate. The Intermediate Certificate is the signer/issuer of the SSL  Certificate. The Root CA Certificate is the signer/issuer of the Intermediate Certificate. If the Intermediate Certificate is not installed on the server (where the SSL certificate is installed) it may prevent some browsers, mobile devices, applications, etc. from trusting the SSL certificate. In order to make the SSL certificate compatible with all clients, it is necessary that the Intermediate Certificate be installed.

The chain terminates with a Root CA Certificate. The Root CA Certificate is always signed by the CA itself. The signatures of all certificates in the chain must be verified up to the Root CA Certificate.

The below figure illustrates a certification path from the certificate owner to the Root CA, where the chain of trust begins:

![ssl_chain](/artifacts/images/web/ssl_chain.png)

So when installing an SSL on a server, you need to set the “ServerCertificate” as the certificate on the server, along with the CSR and Private Key used to generate the CSR and certificate from CA. The intermediate and root and bundle are just the chain certs.

## Renewing SSL

### Example

> Command (Can be run on any server with OpenSSL):

```shell
openssl req -new -newkey rsa:2048 -nodes -keyout stealth-servers.com.au.key -out stealth-servers.com.au.csr
```

> Then fill in the following fields when asked

```shell
Country Name (2 letter code) [AU]:AU
State or Province Name (full name) [Some-State]:NSW
Locality Name (eg, city) []:Sydney
Organization Name (eg, company) [Internet Widgits Pty Ltd]:Panthur Pty Ltd
Organizational Unit Name (eg, section) []:IT
Common Name (e.g. server FQDN or YOUR name) []:*.stealth-servers.com.au
Email Address []:licensing@digitalpacific.com.au

Please enter the following 'extra' attributes
to be sent with your certificate request
A challenge password []: <NOTHING_NEEDED>
An optional company name []: <NOTHING_NEEDED>
```

Use these certs to plug into SSLstore and.. figure the rest out.

### General Linux Server

This is an example CSR generation via CLI:

```shell
openssl req -new -newkey rsa:2048 -nodes -keyout <SERVER>.key -out <SERVER>.csr
```

NOTE: "Server" references the ServerName in apache vhost. Please make sure about this. It's usually just the domain name!

Generate WITH www. (That's worked for me in the past and covers www and non-www)

#### FULL STEPS

Ensure client is running OpenSSL with apache:

```shell
[root@web1 pki-validation]$ httpd -t -D DUMP_MODULES | grep ssl
ssl_module (shared)
```

**Install steps**:

Generate CSR (if it's not on the server, I'm leaving mine in `/etc/..`) using the following:

```shell
openssl req -new -newkey rsa:2048 -nodes -keyout maxchallenge.com.au.key -out maxchallenge.com.au.csr
```

Change the above depending on Key bits etc.. Times Change, y'know

Put CSR in client area, select Apache + modSSL, SHA2 (SHA256 with RSA 2048) etc.

At the time of writing this, I used file auth (easiest way, DNS and mail weren't easily accessible). Put auth file in `/var/www/html/.well-known/pki-validation/fileauth.txt` (**BOTH** AUTH files go in here, weird websites setup, but hey they work).

If you're going with file auth, you need to either:

1. Disable htaccess
2. Comment out the rewrite rules to www. and https (these break the lookup). If it's done correctly, you should be able to curl the file from the root domain i.e.:

```shell
[SShakir@staff01 ~]$ curl http://maxineschallenge.com.au/.well-known/pki-validation/fileauth.txt
XXXXXXXXXXXXXXXXXXXXXXXX
```

Verify the file and once file is verified, download the certs from SSL store and put them in the corresponding domains SSL doc folders as per the apache conf (move the older certs):

```shell
SSLCertificateFile /etc/ssl/crt/maxchallenge/primary.crt
SSLCertificateKeyFile /etc/ssl/crt/maxchallenge/private.key
SSLCertificateChainFile /etc/ssl/crt/maxchallenge/intermediate.crt
```

Restart apache.

Profit.
