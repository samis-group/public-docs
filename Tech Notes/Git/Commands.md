# Git

## git push

Update remote refs along with associated objects.

## git pull

Fetch from and integrate with another repository or a local branch.

## git remote

Manage the set of repositories ("remotes") whose branches you track.

**Examples**:

> Show remote origin repo

```shell
git remote show origin
```

## git fetch

Fetch branches and/or tags (collectively, "refs") from one or more other repositories, along with the objects necessary to complete their histories. Use this if you create a branch on the remote repository and need to pull it to be available locally.

## git reset

Reset current HEAD to the specified state

**Examples**:

> Reset current HEAD commit to before the last commit was made (i.e. reverts back 1 head commit). Resets the index and working tree. Any changes to tracked files in the working tree since `commit` are discarded.

```shell
git reset --hard HEAD^
git reset --hard HEAD~1
```

> Resets the local branch to be exactly the same as the remote branch (This is DESTRUCTIVE TO LOCAL CHANGES)

```shell
git reset --hard origin/remote branch
```

> You might want to make changes here and push back forcefully. Note that this will FORCE the commit to remote essentially overwriting them:

```shell
git push origin branch_name --force
```

## git merge

Join two or more development histories together.

Incorporates changes from the named commits (since the time their histories diverged from the current branch) into the current branch. This command is used by git pull to incorporate changes from another repository and can be used by hand to merge changes from one branch into another.

## git log

Shows the commit logs.

**Options**:

| Flag        | Description     |
| ----------- | -----------     |
| -S string   | Look for differences that change the number of occurrences of the string (i.e. addition/deletion) in a file. |
| -G regex    | Look for differences whose patch text contains added/removed lines that match regex. |
| --source    | Print out the ref name given on the command line by which each commit was reached. |
| --all       | Pretend as if all the refs in refs/, along with HEAD, are listed on the command line as `commit`. |
| --oneline   | Shows each commit in ref and description. |

**Examples**:

Show commit logs

```bash
git log
```

Search all commits for string `whatever` and find where this string was modified

```bash
git log -S <whatever> --source --all
```

Shows them in one line

```bash
git log --oneline
```

## git blame

Annotates each line in the given file with information from the revision which last modified the line.

**Options**:

| Flag        | Description     |
| ----------- | -----------     |
| -L **S**,**E** | Annotate only the given line range. May be specified multiple times. Overlapping ranges are allowed. S = start line, E = end line. |

> Shows who made the commits on file.py from lines 1-5 and other info.

```shell
git blame -L 1,5 file.py
```

## git rebase

Reapply commits on top of another base tip

> This will rebase master into OT-xxxxx branch bringing it up to date with the latest master commits.

```shell
git checkout OT-xxxxx  
git rebase master
```

***Now, Fix Conflicts manually in your text editor***

```shell
git add .
git commit -m "Resolved merge conflict by incorporating both suggestions."
git rebase --continue
```

There are a couple situations where I've seen rebase get stuck or if you did it wrong. One is if the changes become null (a commit has changes that were already made previously i.e. the ones above, in the rebase) in which case you may have to use:

```shell
git rebase --skip
```

[Resource](https://www.atlassian.com/git/tutorials/merging-vs-rebasing)

## git stash

Stash the changes in a dirty working directory away

**Options**:

| Flag        | Description     |
| ----------- | -----------     |
| list | List the stash entries that you currently have. Each stash entry is listed with its name (e.g. stash@{0} is the latest entry, stash@{1} is the one before, etc.). |
| show | Show the changes recorded in the stash entry as a diff between the stashed contents and the commit back when the stash entry was first created. |
| drop | Remove a single stash entry from the list of stash entries. If no stash entry is specified, it defaults to removing the latest one. |
| clear | Remove all the stash entries. |
| push | Save your local modifications to a new stash entry and roll them back to HEAD |
| pop | Remove a single stashed state from the stash list and apply it on top of the current working tree state, i.e., do the inverse operation of git stash push. |
| apply | Like pop, but do not remove the state from the stash list. |
| branch **name** | Creates and checks out a new branch named `name` starting from the commit at which the stash was originally created, applies the changes recorded in stash to the new working tree and index. |

> To re-apply them, just check out the branch you want your changes on

```shell
git checkout branch_name
```

> and then use

```shell
git stash apply
```

> Then to see the result, use

```shell
git diff
```

> After you're all done with your changes - the apply looks good and you're sure you don't need the stash any more - then get rid of the stash with:

```shell
git stash drop
```
