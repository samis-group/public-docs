# Cool Ansible Tricks

## Merging Dicts/mappings

[Resource Here.](https://stackoverflow.com/questions/63263190/ansible-multiple-vars-files-with-same-yaml-structure-do-not-merge)

There is a simple solution. Use [`include_vars`](https://docs.ansible.com/ansible/latest/modules/include_vars_module.html#include-vars-load-variables-from-files-dynamically-within-a-task), put the included data into dictionaries, and [`combine`](https://docs.ansible.com/ansible/latest/user_guide/playbooks_filters.html#combining-hashes-dictionaries) them. Set `recursive=True` to merge the keys. For example

Replace `{ {` without the space in between:

```yaml
    - include_vars:
        file: var_files/aws_management_vars.yml
        name: management
    - include_vars:
        file: var_files/aws_general_vars.yml
        name: general
    - set_fact:
        my_vars: "{ { management|combine(general, recursive=True) } }"
    - debug:
        var: my_vars.aws
```

gives output:

```yaml
  my_vars.aws:
    ec2:
      env: mih-env
      node:
        instance_type: t2.micro
        name: Management Node
      vpc_id: vpc-abc12345
    region: us-west-1
```
