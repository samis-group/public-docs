# Definitions

The structure and behavior of ansible is as follows:

- Playbook: the highest level, just a list of plays
  - Play: ties tasks to host lists
    - Tasks: definition of a call to a module
    - Besides tasks, a play may have pre-tasks, post-tasks and handlers, which are all task-like, and roles.

**Example**:

```yaml
---
# This entire file is the playbook

  # Play1 - WebServer related tasks
  - name: Play Web - Create apache directories and username in web servers
    hosts: webservers
    become: yes
    become_user: root
    # Below is the list of tasks in the play "Play1"
    tasks:
      - name: create username apacheadm
        user:
          name: apacheadm
          group: users,admin
          shell: /bin/bash
          home: /home/weblogic
      - name: install httpd
        yum:
          name: httpd
          state: installed

  # Play2 - Application Server related tasks
  - name: Play app - Create tomcat directories and username in app servers
    hosts: appservers
    become: yes
    become_user: root
    # Below is the list of tasks in the play "Play2"
    tasks:
      - name: Create a username for tomcat
        user:
          name: tomcatadm
          group: users
          shell: /bin/bash
          home: /home/tomcat
      - name: create a directory for apache tomcat
        file:
          path: /opt/oracle
          owner: tomcatadm
          group: users
          state: present
          mode: 0755
```

## Playbook

A playbook is simply a list of plays. The highest level of a playbook YAML is a list, and on that list, only two things are accepted: a play definition or the keyword import_playbook, which imports a list of plays from another playbook file, as if they were defined in that place of the calling file.

The playbook is also the only thing that can be called directly from ansible-playbook.

## Task

A task is, paraphrasing the [manual](https://docs.ansible.com/ansible/latest/user_guide/playbooks_intro.html#playbook-language-example), 'nothing more than a call to an ansible module'. That call definition, however, knows nothing of which hosts it is supposed to run on.

## Play

The play is the element that ties tasks to the servers where they'll run. The key element here is the mandatory keyword hosts. This is the part of Ansible that tells which hosts are being affected and how.

## Role

A role is a different thing, as it is not defined within a playbook. Instead, they each have their own subdirectory under the directory roles. The objective of roles is to organize things. So, under the role's subdir, you can find tasks, handlers, files and templates, variables and defaults. All of these related to that specific role.

So, roles are an easy way to encapsulate and share Ansible information. You could have a subdir in templates per task, for example. But if you wanted to share that task, you'd have to pick the template as well. With roles, you can just zip the role dir and (almost) everything should be there.

Like a play, the role defines tasks and handlers. However, roles do not define on which hosts the role will be run. So roles must be referenced to from a play.

Roles can also declare dependencies (that is, references to other roles that need to be run before the declaring one).

## Handler

A handler functions for the most part just like a task. However, it is not executed by default, with the other tasks, during the playbook run. Instead, each individual handler will be executed only if notified by a task.

On a task definition, the keyword notify identifies the handlers the task wants to notify. If the task is executed and reports a changed state (not ok nor failed), then the handler will be marked for execution.

After all roles and tasks have run, each notified handler will be executed, in the order they appear in the file. Check the [docs](https://docs.ansible.com/ansible/latest/user_guide/playbooks_handlers.html) for details.

Tasks will always run (unless skipped with when), and are responsible for the actual changes you want to implement. Handlers will be run only in response to tasks making changes, and are generally responsible for finalization steps (restart or reload a service that has had its configuration changed to make it effective, for example).

You could probably replicate handlers behavior with tasks, but it is such a recurring pattern that Ansible provides handlers as a helper.

Task versus play include → [https://docs.ansible.com/ansible/2.3/playbooks_roles.html#task-versus-play-includes](https://docs.ansible.com/ansible/2.3/playbooks_roles.html#task-versus-play-includes)

```ansible
# this is a 'play' include
- include: listofplays

- name: another play
  hosts: all
  tasks:
    - debug: msg=hello

    # this is a 'task' include
    - include: stuff.yml
```
