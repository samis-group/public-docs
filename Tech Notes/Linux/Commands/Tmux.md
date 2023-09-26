Switch easily between several programs in one terminal, detach them (they keep running in the background) and reattach them to a different terminal.

***Options:***

| Flag        | Description |
| ----------- | ----------- |
| -l          | Alias for 'atq'. Lists jobs. |
| -r          | Alias for 'atrm'. Remove a job    |

***Examples:***

> Start a new session

```bash
tmux
```

> Start a new session with the name _mysession_

```bash
tmux new -s mysession
```
