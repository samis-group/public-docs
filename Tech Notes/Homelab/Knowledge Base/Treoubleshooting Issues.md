# Troubleshooting Issues

## Client Browser

### 431 Request Header Fields Too Large

This issue happened on all subpages except for the main page [docs.shaklab.com](https://docs.shaklab.com).

This is a client side issue, the request cookie was way too big. It appears to have loop indefinitely until it hit the browser limit. Cleaning the site data for `shaklab.com` did the trick.

## Syncthing

### Tips to using it

* Disable relay connections
* You can also manually set connection string by editing the remote device, setting it to be like `tcp://10.10.0.88:22000`, will allow you to connect locally and fallback to dynamic.
