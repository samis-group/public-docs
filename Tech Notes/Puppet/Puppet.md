# Puppet

## Filebucket

[Resource](https://puppet.com/docs/puppet/6.17/man/filebucket.html)

Go to `/var/lib/puppet/clientbucket/<m/d/5/hashsum_dir>` and you will find the contents and paths of what was changed.

That MD5 hashum of the contents that were changed from is what you need to cd into.

## Debugging puppet catalog variables

Add a notify block and run the debug command above:

```json
notify { 'r1_plugin_version':  
  message => "r1 plugin version = ${r1soft_plugin_version}"  
}
```

### Fix SSL Certificate Expiration

On the agent:

```shell
rm -rf /var/lib/puppet/ssl/
```

On puppet master:

```shell
sudo /usr/bin/puppet cert clean <node hostname>
```

Back on the agent:

```shell
puppet agent -t
```
