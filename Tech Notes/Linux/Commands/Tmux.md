Switch easily between several programs in one terminal, detach them (they keep running in the background) and reattach them to a different terminal.

***Options:***

| Flag | Description |
| ---- | ----------- |
| -s | Session Name |
| -t | Target Session |

***Examples:***

> Start a new session

```bash
tmux
```

> Start a new session with the name _mysession_

```bash
tmux new -s mysession
```

> kill/delete session _mysession_

```bash
tmux kill-ses -t mysession
```

> Detach from session (**let go of ctrl THEN press d**)

```
Ctrl + b d
```

> Attach to last session

```bash
tmux a
```

> Attach to a session with the name _mysession_

```bash
tmux a -t mysession
```
