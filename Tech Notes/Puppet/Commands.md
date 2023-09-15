# Commands

> Run puppet catalog

```shell
puppet agent -t
```

> Disable puppet

```shell
puppet agent --disable "<MESSAGE>"
```

> Enable Puppet

```shell
puppet agent --enable
```

> Run puppet in debug mode

```shell
puppet agent -t --debug
```

> Run puppet parser and lint to validate syntax and check for errors

```shell
puppet-lint manifest.pp
puppet parser validate manifest.pp
```

> Run puppet debug and output it to tmp

```shell
puppet agent -t --profile --debug > /tmp/puppet.log
```
