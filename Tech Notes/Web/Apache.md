# Apache

## Useful Resources

[Directive Dictionary](http://httpd.apache.org/docs/trunk/mod/directive-dict.html)
[Directive Index](http://httpd.apache.org/docs/trunk/mod/directives.html)
[Directive Quick References](http://httpd.apache.org/docs/trunk/mod/quickreference.html)

## MPM (Multi-Processing Modules)

Apache supports three different Multi-Processing Modules (MPMs) that are responsible for binding to network ports on the machine, accepting requests, and dispatching children to handle the requests:

1. Prefork: Each child process handles one connection at a time. This is the default mode for Apache.
2. Worker: It uses multiple child processes with many threads each.
3. Event: This MPM was designed to allow more requests to be served simultaneously by passing off some processing work to supporting threads and freeing up the main threads to work on new requests.

## Commands

> Restarts apache gracefully

```shell
httpd -k graceful
# OR
apachectl graceful
```

> Checks syntax of conf and includes

```shell
httpd -t
```

> Checks all vhosts and important apache server configs

```shell
httpd -S
```

> Dump a list of loaded Static and Shared Modules

```shell
httpd -M
OR
apachectl -t -D DUMP_MODULES
```

> Output a list of modules compiled into the server.

```shell
httpd -l
```

> Output a list of directives provided by static modules.

```shell
httpd -L
```

> Sets the apache document root

```shell
httpd -D
```

> Gets the doc root for all sites on the apache server

```shell
grep -ir 'DocumentRoot' /etc/httpd/
```

## Good Apache Configuration

```apache
<IfModule mod_fcgid.c>
    FcgidMaxProcesses 1000
    FcgidMaxRequestsPerProcess 2000
    FcgidMaxProcessesPerClass 24
    FcgidMinProcessesPerClass 0
    FcgidProcessLifeTime 3600
    FcgidIdleTimeout 180
    FcgidIdleScanInterval 120
    FcgidZombieScanInterval 3
    FcgidFixPathinfo 1
    FcgidIOTimeout 2000
    FcgidMaxRequestLen 20971520
</IfModule>

<IfModule mod_deflate.c>
    # Insert filter
    SetOutputFilter DEFLATE

    # Netscape 4.x has some problems
    BrowserMatch ^Mozilla/4 gzip-only-text/html

    # Netscape 4.06-4.08 have some more problems
    BrowserMatch ^Mozilla/4\.0[678] no-gzip

    # MSIE masquerades as Netscape, but it is fine
    BrowserMatch \bMSIE !no-gzip !gzip-only-text/html
    # Don't compress images
    SetEnvIfNoCase Request_URI \
        \.(?:gif|jpe?g|png|swf|flv|mp3|mp4|mpe?g|avi|mov|pdf|rar|zip|gz)$ no-gzip dont-vary

    # Make sure proxies don't deliver the wrong content
    Header append Vary User-Agent env=!dont-vary
</IfModule>

## EXPIRES CACHING ##

<IfModule mod_expires.c>
    ExpiresActive On
    ExpiresByType image/jpg "access 1 year"
    ExpiresByType image/jpeg "access 1 year"
    ExpiresByType image/gif "access 1 year"
    ExpiresByType image/png "access 1 year"
    ExpiresByType text/css "access 1 month"
    ExpiresByType application/pdf "access 1 month"
    ExpiresByType text/x-javascript "access 1 month"
    ExpiresByType application/x-shockwave-flash "access 1 month"
    ExpiresByType image/x-icon "access 1 year"
    ExpiresDefault "access 14 days"
</IfModule>

## EXPIRES CACHING ##

<IfModule lsapi_module>
    AddType application/x-httpd-lsphp .php
    lsapi_backend_connect_timeout 100000
    lsapi_backend_connect_tries 10
    lsapi_backend_children 20
    lsapi_backend_pgrp_max_idle 30
    lsapi_backend_max_process_time 300
    lsapi_debug Off
</IfModule>

<IfModule mod_deflate.c>
    # Compress HTML, CSS, JavaScript, Text, XML and fonts
    AddOutputFilterByType DEFLATE application/javascript
    AddOutputFilterByType DEFLATE application/rss+xml
    AddOutputFilterByType DEFLATE application/vnd.ms-fontobject
    AddOutputFilterByType DEFLATE application/x-font
    AddOutputFilterByType DEFLATE application/x-font-opentype
    AddOutputFilterByType DEFLATE application/x-font-otf
    AddOutputFilterByType DEFLATE application/x-font-truetype
    AddOutputFilterByType DEFLATE application/x-font-ttf
    AddOutputFilterByType DEFLATE application/x-javascript
    AddOutputFilterByType DEFLATE application/xhtml+xml
    AddOutputFilterByType DEFLATE application/xml
    AddOutputFilterByType DEFLATE font/opentype
    AddOutputFilterByType DEFLATE font/otf
    AddOutputFilterByType DEFLATE font/ttf
    AddOutputFilterByType DEFLATE image/svg+xml
    AddOutputFilterByType DEFLATE image/x-icon
    AddOutputFilterByType DEFLATE text/css
    AddOutputFilterByType DEFLATE text/html
    AddOutputFilterByType DEFLATE text/javascript
    AddOutputFilterByType DEFLATE text/plain
    AddOutputFilterByType DEFLATE text/xml
    
    # Remove browser bugs (only needed for really old browsers)
    BrowserMatch ^Mozilla/4 gzip-only-text/html
    BrowserMatch ^Mozilla/4\.0[678] no-gzip
    BrowserMatch \bMSIE !no-gzip !gzip-only-text/html
    Header append Vary User-Agent
</IfModule>
```

## mod_rewrite

[Reference](https://httpd.apache.org/docs/2.4/rewrite/intro.html)

mod_rewrite uses perl regex. [You can test your cases here](https://regexr.com/)

### RewriteCond

The [RewriteCond](https://httpd.apache.org/docs/2.4/mod/mod_rewrite.html#rewritecond) directive defines a rule condition. One or more RewriteCond can precede a RewriteRule directive.

![rewritecond](/artifacts/images/web/rewritecond.png)

### RewriteRule

A [RewriteRule](https://httpd.apache.org/docs/2.4/mod/mod_rewrite.html#rewriterule) consists of three arguments separated by spaces. The arguments are:

1. **Pattern**: which incoming URLs should be affected by the rule;
2. **Substitution**: where should the matching requests be sent;
3. **flags**: options affecting the rewritten request.

![rewritecond](/artifacts/images/web/rewriterule.png)

## Useful htaccess blocks

> Only allows localhost

```apache
order deny, allow
deny from all
allow from 127.0.0.1
```

> Blocks access to wp-content

```apache
RewriteRule ^wp-content$ - [F]
```

> Blocks access to contact form (example)

```apache
RewriteRule ^contact-us.html$ - [F,L]
```

> Joomla contact form block

```apache
RewriteRule ^/?index\.php$ - [F,L]

RewriteCond %{QUERY_STRING} option [NC]
RewriteRule ^ - [F,L]
```

> allow countries with mod_geoip

```apache
<IfModule mod_geoip.c>
    GeoIPEnable On
    RewriteCond %{ENV:GEOIP_COUNTRY_CODE} !^(AU|NZ)$
    RewriteRule ^(.*)$ - [F,L]
</IfModule>
```

> block country with mod_geoip

```apache
<IfModule mod_geoip.c>
    GeoIPEnable On
    RewriteCond %{ENV:GEOIP_COUNTRY_CODE} ^(RU|CN)$
    RewriteRule ^(.*)$ - [F,L]
</IfModule>
```

> Blocks certain countries

```apache
<ifModule mod_geoip.c>
    GeoIPEnable On
    # Add countries you wish to deny here
    SetEnvIf GEOIP_COUNTRY_CODE CO DenyCountry
    SetEnvIf GEOIP_COUNTRY_CODE EG DenyCountry
    SetEnvIf GEOIP_COUNTRY_CODE HI DenyCountry
    Allow from all
    Deny from env=DenyCountry
</ifModule>
```

> Allows certain countries manually

```apache
<ifModule mod_geoip.c>
    GeoIPEnable On
    # Put countries to allow here
    SetEnvIf GEOIP_COUNTRY_CODE AU AllowCountry
    SetEnvIf GEOIP_COUNTRY_CODE NZ AllowCountry
    Deny from all
    Allow from env=AllowCountry
</ifModule>
```

> WP - allow wp-login.php only from specified country

```apache
<Files wp-login.php>
    GeoIPEnable On
    RewriteCond %{ENV:GEOIP_COUNTRY_CODE} !^(AU|NZ)$
    RewriteRule ^(.*)$ - [F,L]
</Files>
```

> Block WordPress xmlrpc.php requests

```apache
<Files xmlrpc.php>
order deny,allow
deny from all
</Files>
```

> Block form on website

```apache
RewriteCond %{HTTP_HOST} ^(www\.)?storebuild.com.au$ [NC]
RewriteRule ^(contact) - [L,F]
```

> Block user agent

```apache
RewriteEngine On
RewriteCond %{HTTP_USER_AGENT} ^.*(bot|crawl|spider).*$ [NC]
RewriteRule ^.* - [F,L]
```

> Blocking Bots via user-agent

```apache
SetEnvIfNoCase User-Agent "SemrushBot" bad_user
SetEnvIfNoCase User-Agent "semrush" bad_user
SetEnvIfNoCase User-Agent "AhrefsBot" bad_user
Deny from env=bad_user
```
