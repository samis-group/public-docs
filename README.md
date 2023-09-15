# Home

This is where I store all of my documentation in markdown format. I use [vs code](https://code.visualstudio.com/) with extensions like markdown editing to parse/edit the markdown files that serve as my documentation and the [unofficial drawio extension](https://marketplace.visualstudio.com/items?itemName=hediet.vscode-drawio). It's a great way to store and retrieve notes (for me personally), and to have them publicly available served via an NGINX container built with ci-cd pipelines to automate deployment whenever I make changes to my docs.

Checkout [my docs docker repo](https://gitlab.com/sami-group/docker/docs), as well as [my nginx repo](https://gitlab.com/sami-group/docker/nginx) if you have access, to see how this is deployed and configured. Ask nicely, I may hand it out.

Essentially, mkdocs runs in a docker container, creates the static page files. Served via **nginx**.

## To add mkdocs plugins

Go into `requirements.txt`, add your plugin and ensure the image is rebuilt.

## Markdown Cheatsheet

[Resource](https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet).

## Steps to setup Obsidian via WSL

from your WSL user home dir, create a symlink to the windows user home dir:

```bash
# Jump into your home dir
cd ~
# Symlink windows home to wsl home
ln -s /mnt/c/Users/user ~/user
cd user
git clone git@gitlab.com:sami-group/docker/docs.git
```

Now open obsidian and navigate to this dir as the vault and open it.

Whenever you make changes and and need to easily just deploy straight to master, use the following:

```bash

cd ~/user/Documents/docs
gitpushall <<< "Auto commit from obsidian"
```

## Run in a dev environment

To run this repo in a dev environment, ensure the repo is cloned first:

```bash
git clone git@gitlab.com:sami-group/docker/docs.git
cd docs
```

Now (re)build and (re)run the container (check make targets):

**Note**: You can use the option `--no-cache` to rebuild the image again without needing to destroy it first.

### Linux

:bangbang: Please research into setting up [docker for windows desktop, WSL integration and the docker vs code extensions](https://docs.docker.com/desktop/windows/wsl/). It will change your life.

#### Cleanup

```bash
make cleanup
```

#### Run with a volume bind mount

```bash
make
```

URL to access docs:

[http://localhost:8889/](http://localhost:8889/)

#### Run without mounting the repo

```bash
make docker-run-no-bind-mount
```

#### Build the docker image

If you *just* want to build the image:

```bash
make build-docker-no-cache
```

### Windows (not tested)

#### Rebuild the dockerfile locally

```powershell
docker stop docs; docker rm docs; docker rmi @(docker images docs -q); docker build --no-cache -t docs docs; docker run --rm -d -p 8889:8000 --name docs -v ./docs:/docs docs
```

#### Alternatively

```powershell
docker stop docs; docker rmi @(docker images docs -q)
docker build --no-cache -t docs docs; docker run --rm -d -p 8889:8000 --name docs -v ./docs:/docs docs
```
