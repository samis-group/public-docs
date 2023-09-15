# Flux

## Common flux Scenarios

### Restore flux deployment

```bash
export GITLAB_TOKEN=glpat-XXXXXXXXXX
```

```bash
flux bootstrap gitlab \
  --components-extra=image-reflector-controller,image-automation-controller \
  --owner=sami-group --repository=homelab --branch=main --path=clusters/home \
  --token-auth --personal
```

### Other common commands

> Create a helm repository

```bash
flux create source helm traefik \
  --url https://helm.traefik.io/traefik \
  --namespace default \
  --export > clusters/home/default/traefik/traefik-helm-repo.yml
```

> Helm release

```bash
flux create helmrelease my-traefik \
  --source HelmRepository/traefik \
  --chart traefik \
  --values values.yml \
  --namespace default \
  --export > clusters/home/default/traefik/traefik-helm-release.yml
  # --chart-version 9.18.2 \
```

> Create a source for a public Git repository

```bash
flux create source git nginxhello \
  --url=https://github.com/nbrownuk/gitops-lab-deploy \
  --branch=main \
  --namespace=default \
  --interval=5m \
  --export > clusters/home/default/nginxhello-source.yml
```

> Create a kustomization for that repo

```bash
flux create kustomization nginxhello \
  --source=GitRepository/nginxhello.default \
  --path=./deploy \
  --prune=true \
  --target-namespace=default \
  --namespace=default \
  --export > clusters/home/default/nginxhello-kustomization.yml
```

> Create an image repo for automated container updates

```bash
flux create image repository nginxhello \
  --image=docker.io/nbrown/nginxhello \
  --interval=5m \
  --namespace=default \
  --export > clusters/home/default/nginxhello/nginxhello-image-repo.yml
```

> Create an image policy for automated container updates

```bash
flux create image policy nginxhello \
  --image-ref=nginxhello \
  --select-semver='>=1.20.x' \
  --namespace=default \
  --export > clusters/home/default/nginxhello/nginxhello-image-policy.yml
```

> Create an image Update resource for automated container updates

Remember to add a marker comment to the manifest which you want the image to update on..

```bash
flux create image update nginxhello \
  --git-repo-ref=nginxhello \
  --git-repo-path=./deploy \
  --checkout-branch=main \
  --push-branch=main \
  --author-name=flux \
  --author-email=flux@users.noreply.github.com \
  --commit-template="{ {range .Updated.Images}}{ {println .}}{ {end}}" \
  --namespace=default \
  --export > clusters/home/default/nginxhello/nginxhello-image-automation.yml
```

> Create a Kustomization for deploying a series of microservices

```bash
flux create kustomization webapp-dev \
  --source=webapp-latest \
  --path="./deploy/webapp/" \
  --prune=true \
  --interval=5m \
  --health-check="Deployment/backend.webapp" \
  --health-check="Deployment/frontend.webapp" \
  --health-check-timeout=2m
```

> Check prerequisites

```bash
flux check --pre
```

> Install the latest version of Flux

```bash
flux install
```

> List GitRepository sources and their status

```bash
flux get sources git
```

> Trigger a GitRepository source reconciliation

```bash
flux reconcile source git flux-system
```

> Export GitRepository sources in YAML format

```bash
flux export source git --all > sources.yaml
```

> Trigger a git sync of the Kustomization's source and apply changes

```bash
flux reconcile kustomization webapp-dev --with-source
```

> Suspend a Kustomization reconciliation

```bash
flux suspend kustomization webapp-dev
```

> Export Kustomizations in YAML format

```bash
flux export kustomization --all > kustomizations.yaml
```

> Resume a Kustomization reconciliation

```bash
flux resume kustomization webapp-dev
```

> Delete a Kustomization

```bash
flux delete kustomization webapp-dev
```

> Delete a GitRepository source

```bash
flux delete source git webapp-latest
```

> Uninstall Flux and delete CRDs

```bash
flux uninstall
```
