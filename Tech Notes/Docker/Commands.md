# Commands

## Common Docker commands

> List docker containers

```shell
docker ps -a
```

> Enter docker container shell

```shell
docker exec -it <Container_Name> /bin/bash
```

> A full docker run example

```shell
docker run -d --name=tautulli --hostname tautulli --network default -e PUID=1000 -e PGID=1000 -e TZ=Australia/Sydney -p 8181:8181 -v /home/sami/docker/tautulli/config:/config -v /home/sami/docker/tautulli/logs:/logs:ro --restart unless-stopped ghcr.io/linuxserver/tautulli
```

> Bring docker-compose file up

```shell
docker-compose up -d
```

> Bring docker-compose file down

```shell
docker-compose down
```

> Remove one or more containers

```shell
docker rm <Container_Name>
```

> Remove one or more images

```shell
docker image rm homeassistant/home-assistant
```

> Remove unused data with a one month filter

```shell
/usr/bin/docker system prune -af  --filter "until=$((30*24))h"
```

> Delete unused volumes

```shell
docker volume prune
```

> List Docker's disk usage in several categories

```shell
docker system df
```

> This command lists the images stored in the local Docker repository.

```shell
docker image ls
```

> List containers

```shell
docker container ls
```

> Stop one or more running containers

```shell
docker stop <Container_Name>
```

> Stop one or more running containers

```shell
docker logs [OPTIONS] <Container_Name>
```

> Inspect container

```shell
docker inspect
```
