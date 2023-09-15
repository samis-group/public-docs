# Linux

## Runlevels

| Runlevel    | Description |
| ----------- | ----------- |
| 0 | The halt runlevel. This is the runlevel at which the system shuts down. For obvious reasons it is unlikely you would want this as your default runlevel |
| 1 | Causes the system to start up in a single user mode under which only the root user can log in. In this mode the system does not start any networking, X windowing or multi-user services. This run level is ideal for system administrators to perform system maintenance or repair activities |
| 2 | Boots the system into a multi-user mode with text based console login capability. This runlevel does not, however, start the network |
| 3 | Similar to runlevel 2 except that networking services are started. This is the most common runlevel for server based systems that do not require any kind of graphical desktop environment |
| 4 | Undefined runlevel. This runlevel can be configured to provide a custom boot state |
| 5 | Boots the system into a networked, multi-user state with X Window System capability. By default the graphical desktop environment will start at the end of the boot process. This is the most common run level for desktop or workstation use |

To check the runlevel of the system use the command: `runlevel`.

## Shell Shortcuts

| Shortcut    | Description |
| ----------- | ----------- |
| Ctrl + A | Go to the beginning of the line you are currently typing on |
| Ctrl + E | Go to the end of the line you are currently typing on |
| Ctrl + U | Clears the line before the cursor position. If you are at the end of the line, clears the entire line |
| Ctrl + K | Clears the line after the cursor position. If you are at the start of the line, clears the entire line |
| Ctrl + H | Same as backspace |
| Ctrl + R | Let's you search through previously used commands |
| Ctrl + C | Kill whatever you are running |
| Ctrl + Z | Puts whatever you are running into a suspended background process. fg command restores it |
| Ctrl + D | Exit the current shell |
| Ctrl + L | Clears the Screen, similar to the clear command |
| Ctrl + W | Delete the word before the cursor |
| Ctrl + T | Swap the last two characters before the cursor |
| Esc + T | Swap the last two words before the cursor |
| Alt + F | Move cursor forward one word on the current line |
| Alt + B | Move cursor backward one word on the current line |
| Ctrl + F | Move cursor forward one character on the current line |
| Ctrl + B | Move cursor backward one character on the current line |
| Tab | Auto-complete files and folder names (Requires bash-completion package) |

## Input/Output Redirection

| Redirect    | Description |
| ----------- | ----------- |
| >         | Output Redirection |
| <         | Input Redirection |
| >>        | Appends output to an existing file |
| >&        | re-directs output of one file to another |
| \|        | (pipe) Feeds the output from the program on the left as input to the program on the right |

| File        | File Descriptor |
| ----------- | --------------- |
| STDIN       | 0               |
| STDOUT      | 1               |
| STDERR      | 2               |

***Examples:***

> Redirect stdout (1) to file1 and stderr (2) to file2

```bash
command > file1 2> file2
```

> Redirect stderr to stdout (&1), and then redirect stdout to a file (so all of it goes to ‘file’)

```bash
command > file 2>&1
```

> Redirect both 1 and 2 (out and error) to /dev/null

```bash
command &> /dev/null
```

## Boot Process

### Extracting contents of Initramfs

[Resource](https://access.redhat.com/solutions/24029)

First, create a temporary work directory and switch into it. This will be the location where the initramfs/initrd contents will be viewed, edited, and re-compressed if required:

```shell
mkdir /tmp/initrd  
cd /tmp/initrd
```

Use the file command on the initramfs/initrd to identify the compression format (change `uname -r` to a specific file if you wish):

```shell
file /boot/initramfs-$(uname -r).img
```

The most common is a gzip-format image which displays as:

```shell
/boot/initramfs-2.6.32-954.3.5.lve1.4.75.el6.x86_64.img: gzip compressed data
```

#### gzip format - Extract / Uncompress

Uncompress and extract the contents of the image in the /boot/ directory:

```shell
zcat /boot/initrd-$(uname -r).img | cpio -idmv
```

#### gzip format - Repack / Recompress

Still in the working directory (/tmp/initrd), find all files and add them to a new boot image file:

```shell
find . | cpio -o -c | gzip -9 > /boot/new.img
```
