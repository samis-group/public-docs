# Gitlab

## CI

### Debug pipeline env variables

```yaml
stages:
  - debug

print-all-env-vars-job:
  stage: debug
  script:
    - echo "GitLab CI/CD | Print all environment variables"
    - env
```
