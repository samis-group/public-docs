# WordPress

## Basic WP .htaccess file

```apache
# BEGIN WordPress  
<IfModule mod_rewrite.c>  
    RewriteEngine On  
    RewriteBase /  
    RewriteRule ^index\.php$ - [L]  
    RewriteCond %{REQUEST_FILENAME} !-f  
    RewriteCond %{REQUEST_FILENAME} !-d  
    RewriteRule . /index.php [L]  
</IfModule>  
# END WordPress
```

## Different htaccess rewrite rules

### 301 Redirects for .htaccess

> Redirect a single page

```apache
Redirect 301 /pagename.php http://www.domain.com/pagename.html
```

> Redirect an entire site

```apache
Redirect 301 / http://www.domain.com/
```

> Redirect an entire site to a sub folder

```apache
Redirect 301 / http://www.domain.com/subfolder/
```

> Redirect a sub folder to another site

```apache
Redirect 301 /subfolder http://www.domain.com/
```

> This will redirect any file with the .html extension to use the same filename but use the .php extension instead

```apache
RedirectMatch 301 (.*)\.html$ http://www.domain.com$1.php
```

### Performing 301 redirects using rewriting via .htaccess

> Redirect from old domain to new domain

```apache
RewriteEngine on  
RewriteBase /  
RewriteRule (.*) http://www.newdomain.com/$1 [R=301,L]
```

> Redirect to www location

```apache
RewriteEngine on  
RewriteBase /  
rewritecond %{http_host} ^domain.com [nc]  
rewriterule ^(.*)$ http://www.domain.com/$1 [r=301,nc]
```

> Redirect to www location with subdirectory

```apache
RewriteEngine on  
RewriteBase /  
RewriteCond %{HTTP_HOST} domain.com [NC]  
RewriteRule ^(.*)$ http://www.domain.com/directory/index.html [R=301,NC]
```

> Redirect from the old domain to the new domain with full path and query string:

```apache
Options +FollowSymLinks  
RewriteEngine On  
RewriteRule ^(.*) http://www.newdomain.com%{REQUEST_URI} [R=302,NC]
```

> Redirect from old domain with subdirectory to new domain w/o subdirectory including full path and query string:

```apache
Options +FollowSymLinks  
RewriteEngine On  
RewriteCond %{REQUEST_URI} ^/subdirname/(.*)$  
RewriteRule ^(.*) http://www.katcode.com/%1 [R=302,NC]
```

### Rewrite and redirect URLs with query parameters (for files placed in the root directory)

Original URL:

`http://www.example.com/index.php?id=1`

Desired destination URL:

`http://www.example.com/path-to-new-location/`

.htaccess syntax:

```apache
RewriteEngine on  
RewriteCond %{QUERY_STRING} id=1  
RewriteRule ^index\.php$ /path-to-new-location/? [L,R=301]
```

### Redirect URLs with query parameters (files placed in subdirectory)

Original URL:

`http://www.example.com/sub-dir/index.php?id=1`

Desired destination URL:

`http://www.example.com/path-to-new-location/`

.htaccess syntax:

```apache
RewriteEngine on  
RewriteCond %{QUERY_STRING} id=1  
RewriteRule ^sub-dir/index\.php$ /path-to-new-location/? [L,R=301]
```

### Redirect one clean URL to a new clean URL

Original URL:

`http://www.example.com/old-page/`

Desired destination URL:

`http://www.example.com/new-page/`

.htaccess syntax:

```apache
RewriteEngine On  
RewriteRule ^old-page/?$ $1/new-page$2 [R=301,L]
```

### Rewrite and redirect URLs with query parameter to directory based structure, retaining query string in URL root level

Original URL:

`http://www.example.com/index.php?id=100`

Desired destination URL:

`http://www.example.com/100/`

.htaccess syntax:

```apache
RewriteEngine On  
RewriteRule ^([^/d]+)/?$ index.php?id=$1 [QSA]
```

### Rewrite URLs with query parameter to directory based structure, retaining query string parameter in URL subdirectory

Original URL:

`http://www.example.com/index.php?category=fish`

Desired destination URL:

`http://www.example.com/category/fish/`

.htaccess syntax:

```apache
RewriteEngine On  
RewriteRule ^/?category/([^/d]+)/?$ index.php?category=$1 [L,QSA]
```

### Domain change – redirect all incoming requests from old to new domain (retain path)

```apache
RewriteEngine on  
RewriteCond %{HTTP_HOST} ^example-old\.com$ [NC]  
RewriteRule ^(.*)$ http://www.example-new.com/$1 [R=301,L]
```

> If you do not want to pass the path in the request to the new domain, change the last row (above) to:

```apache
RewriteRule ^(.*)$ http://www.example-new.com/ [R=301,L]
```

### From blog.oldsite.com -> www.somewhere.com/blog/

> retains path and query, and eliminates extra blog path if domain is blog.oldsite.com/blog/

```apache
Options +FollowSymLinks  
RewriteEngine On  
RewriteCond %{REQUEST_URI}/ blog  
RewriteRule ^(.*) http://www.somewhere.com/%{REQUEST_URI} [R=302,NC]  
RewriteRule ^(.*) http://www.somewhere.com/blog/%{REQUEST_URI} [R=302,NC]
```

### Force https

```apache
RewriteEngine On  
RewriteCond %{HTTPS} off  
RewriteRule (.*) https://%{HTTP_HOST}%{REQUEST_URI} [R=301,L]
```

## Troubleshooting spam/admin-ajax.php request

Check the exim headers to see if there is a custom header added to the headers. It can look something like this (indicating it originated from Ninja Forms):

```shell
X-Mailer: PHPMailer 5.2.27 (https://github.com/PHPMailer/PHPMailer)  
X-Ninja-Forms: ninja-forms
```

Use htop and press `s` on the process to stack trace it and see which file handler is open and being written to (lines 4 and 5 below show the file being accessed is ninja-forms so it is related to the ninja-forms plugin).

![strace](/artifacts/images/web/strace.png)

I will jump into wp-content/plugins and disable the plugin by renaming the folder.
