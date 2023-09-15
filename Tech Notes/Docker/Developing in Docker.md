# Developing in Docker

Here are some tips to developing in docker. The below examples are steps taken to build a docker image for my ozbargain bot.

## Inside a live container
First, start by messing around with the image you want to base off, just start a shell on the base image and start building/planning how your dockerfile is required to be built:

```shell
sudo docker run --name "python3" --rm -it python:3-alpine /bin/sh
# This python alpine version uses apk to manage packages
```

Note: Some containers won't have `/bin/bash` shell available (like alpine above), use `/bin/sh` instead.

## Useful Dockerfile components

- Ensure apt runs non-interactively for packages that require user input when installing like `tzdata`.

```Dockerfile
ARG DEBIAN_FRONTEND=noninteractive
```

- Run as uid '1000' by default unless passed in

```Dockerfile
ARG UID=1000
ARG UNAME=ubuntu
```

- Ensure that you build with the arg passed in, so that your `docker build` command looks like this:

```bash
USERID=$(id -u)
docker build -t <container_tag> --build-arg UID=${USERID}
```

- If you need to install any packages, remember to minimize disk used in image, for example:

```Dockerfile
RUN apt-get update \
  && apt-get install -y tzdata make vim openssh-server bash-completion sudo sshpass \
  && apt-get clean \
  && rm -rf /var/lib/apt/lists/*
```

- Setup container to run as user specified in build args with same password

```Dockerfile
RUN useradd -rm -d /home/$UNAME -s /bin/bash -g root -G sudo -u $UID $UNAME \
  && echo "$UNAME:$UNAME" | chpasswd
```

```Dockerfile

```

```Dockerfile

```

```Dockerfile
# From image name
FROM image:latest

# Ensure apt runs non-interactively due to tzdata package asking for location, argh..
ARG DEBIAN_FRONTEND=noninteractive
# Set TZ
ENV TZ=Australia/Sydney
ENV ANSIBLE_ROLES_PATH=/ansible/roles
# Run as 1000 by default unless passed in
ARG UID=1000
ARG UNAME=ubuntu

# Ubuntu OS dependencies
RUN apt-get update \
  && apt-get install -y tzdata make vim openssh-server bash-completion sudo sshpass \
  && apt-get clean \
  && rm -rf /var/lib/apt/lists/*

# Setup container to run as user specified in build args with same password
RUN useradd -rm -d /home/$UNAME -s /bin/bash -g root -G sudo -u $UID $UNAME \
  && echo "$UNAME:$UNAME" | chpasswd

# Make required directories and chown them
RUN mkdir -p /home/$UNAME/.ssh /root/.ssh /ansible/roles \
  && chown -R $UNAME:root /home/$UNAME/.ssh /ansible \
# Also ensure sudo group users are not asked for a password when using sudo command
  && echo '%sudo ALL=(ALL) NOPASSWD:ALL' >> /etc/sudoers

# Set working directory
WORKDIR /ansible

# Copy files and install requirements
COPY --chown=$UNAME:root requirements* ./
RUN pip3 install --upgrade pip && pip3 install --no-cache-dir -r requirements.txt
COPY --chown=$UNAME:root Makefile ./
COPY --chown=$UNAME:root makefiles/ makefiles/
COPY --chown=$UNAME:root roles/requirements* roles/
RUN make reqs-docker
# Copy bin files (mainly for docker-entrypoint.sh)
COPY --chown=$UNAME:root bin/ bin/

USER $UNAME
WORKDIR /ansible/repo

# Allow certain bind mounts from outside container
VOLUME [ "/home/$UNAME/.ssh", "/ansible/repo" ]

# Some plays delegate to localhost, requires access to itself on ssh
EXPOSE 22

# Parse the password from ENV and give us shell as default so we can do whatever
ENTRYPOINT [ "/ansible/bin/docker-entrypoint.sh" ]
```

## Building the image

Now build the image you've laid out in your `Dockerfile`:

```shell
docker build --no-cache -t ozbargain_bot .
```

## Running a container of the image

Once you've built your image from the `Dockerfile`, it's time to run it. Take note of the image ID from the previous step or grab the image ID from the output of `docker image ls`, and run it.

Let's first create the required dirs:

```shell
mkdir -p ${PWD}/ozbargain
touch ${PWD}/ozbargain/app.log
touch ${PWD}/ozbargain/oz2slack.timestamp
touch ${PWD}/ozbargain/oz2slack.timestamp.frontpage
```

The below is an example for running ozbargain bot:

```shell
docker run -d \
--name=ozbargain \
--user $(id -u):$(id -u) \
-e OZBARGAIN_SLACK_WEBHOOK=https://hooks.slack.com/services/XXXXXXXXXX/XXXXXXXXXXX/XXXXXXXXXXXXXXXXXXXXXXXXXX \
-v "${PWD}/ozbargain:/config" \
--restart unless-stopped \
registry.gitlab.com/sami-group/ozbargain_bot:latest
```
