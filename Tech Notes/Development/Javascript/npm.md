# NPM

## Setting up a project

```bash
npm init --yes
```

## Installing NPM Packages

When installing NPM packages to your project, just:

```bash
npm i <package_name>
```

To install from package.json, just omit the <package_name> from the above command.

## List command

### List available packages

```bash
npm ls
# or
npm list
```

If you use the `npm la` or `npm ll` command, the output will also include extended information.

To check environments:

```bash
npm list --prod
```

Contain the list to a certain depth (i.e. 0 = directly installed packages, no dependencies, etc.)

npm list --depth=0
