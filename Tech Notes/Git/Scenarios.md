# Scenarios

## Clone from gitlab using https and username:personal-access-token creds

```shell
git clone https://<gl-username>:<gl-pat>@gitlab.com/sami-group/homelab.git
```

## Delete Branch locally

The `-d` option is an alias for `--delete`, which only deletes the branch if it has already been fully merged in its upstream branch

```shell
git branch -d branch_name
```

You could also use `-D`, which is an alias for `--delete --force`, which deletes the branch "irrespective of its merged status."

Source: `man git-branch`

```shell
git branch -D branch_name
```

## Delete Remote Branch

Starting on [Git v2.8.0](https://github.com/git/git/blob/master/Documentation/RelNotes/2.8.0.txt) you can also use git push with the `-d` option as an alias for `--delete`

```shell
git push <remote_name> --delete <branch_name>
```

**example**:

```shell
git push origin --delete OT-126861_updating_pyyaml_creates
```

## Fix git conflict in development

```shell
git checkout development
git pull
git checkout branch_name
git pull
git checkout development
git merge branch_name
```

fix the files and fix the diff # in the current dev branch that you're checked out on after merging your OT  

```shell
git add .
git commit -m "message"
# The following commands may be wrong, but just do them both
git push origin development # pushing dev back into dev branch at origin after merging and fixing conflict
```

IF REQUIRED:

```shell
git push origin branch_name # pushing OT back into OT branch at origin
```

## Git Workflow (Hostopia AU - Operations)

Git change branches will be structured in the following way:

- `jira with underscores` - OT-12345 will become: OT_12345
- `initials` - your initials, you should know them
- `sensible description with underscores` - "I want to fix this thing" becomes: I_want_to_fix_this_thing
- Join it all with underscores.
- Final Result:
  - Example: `OT_12345_TD_I_want_to_fix_this_thing`

Ensure that you have a clean develop before you branch:

```shell
git fetch --all  
git checkout develop  
git pull origin develop
```

Branch from the develop branch and switch to it:

```shell
git checkout -b OT_12345_TD_I_want_to_fix_this_thing develop
```

Begin making your changes.

Once complete, push them:

```shell
git push origin OT_12345_TD_I_want_to_fix_this_thing
```

For the control repo (not gitflow):

- Once the branch/environment has been tested it can be merged into develop. Create a pull request for your branch into develop.
- Once your branch has been tested in develop ("staging" in the old system). Create a pull request for your branch into production.
- Once merged, change any hosts you had on your branch/environment in foreman back to production or develop. Erase your branch from github, this will erase the test branch/environment.

### For a puppet module repo (gitflow)

- Once the branch has been tested it can be merged into develop. Create a pull request for your branch into develop.
- Once your branch has been merged into develop.
  - Release (branch) develop.
  - Your release branch will be in the following format: release/YYYY.MM.DD.##. e.g. 2021.01.22.01. The last two digits is the release number for that day incrementing from 01.
  - Create a pull request for your branch into production.
- Check out production on your pc
  - Create a tag for the new version
  - Push that tag to github

> Show the working tree status

```shell
git status
```

> Make sure you're on master branch and pull recent head commits (git checkout master)

```shell
git checkout master && git pull
```

> `-b` stands for create new branch (if it doesn't exist) and also switches to it for you

```shell
git checkout -b OT-122785_Offboard_WillF
```

***Do edits***

```shell
git diff
```

> Sometimes use -A or --all to add all files as it may miss some hidden files starting with .

```shell
git add .  git status
```

> -v for verbose

```shell
git commit -v -m "Message Here"
git push origin OT-122785_Offboard_WillF
```

***Follow this process for both development and staging***

Go to github and create pull request from OT-122785_Offboard_WillF to development

Double check diff's (both before and after pull request)

Click Merge (top right)

ssh to puppet02

pulldev

go to foreman (puppet02)

Select Hosts - All hosts - Type 'environment =  development' and search

login to one of these servers (where changes apply) and run puppet agent -t

Confirm it pulled the puppet changes down and test your changes.

***Do the same for staging***

After testing both dev and staging, Create a pull request from OT-122785_Offboard_WillF to master

Wait for people to accept it.

***on local machine***

```shell
git checkout master
git pull
```

## Reverting changes pushed to remote branch

```shell
git show
git reset --hard HEAD^
git push -f
```

## Checkout new branch after accidentally starting in main

```shell
git checkout -b feature/new_branch
# If there are issues sending to origin, then set origin with:
git push --set-upstream origin feature/new_branch
```

### Readme things

[Readme editor top use](https://readme.so/editor).

[Markdown cheatsheet](https://github.com/tchapi/markdown-cheatsheet/blob/master/README.md).

[Emoji Cheatsheet](https://www.webfx.com/tools/emoji-cheat-sheet/).
