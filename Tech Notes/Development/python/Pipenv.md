# Pipenv

Pipenv is a tool that aims to bring the best of all packaging worlds (bundler, composer, npm, cargo, yarn, etc.) to the Python world. It automatically creates and manages a virtualenv for your projects, as well as adds/removes packages from your Pipfile as you install/uninstall packages. It also generates the ever–important Pipfile.lock, which is used to produce deterministic builds. Pipenv uses ‘pip’ and ‘virtualenv’ under the hood but simplifies their usage with a single command line interface.

## General Recommendations & Version Control

- Pip is a tool for installing packages from the Python Package Index.
- Generally, keep both `Pipfile` and `Pipfile.lock` in version control.
- Do not keep `Pipfile.lock` in version control if multiple versions of Python are being targeted.
- Specify your target Python version in your Pipfile’s `requires` section. Ideally, you should only have one target Python version, as this is a deployment tool. `python_version` should be in the format `X.Y` and `python_full_version` should be in `X.Y.Z` format.
- `pipenv install` is fully compatible with `pip install` syntax, for which the full documentation can be found [here](https://pip.pypa.io/en/stable/user_guide/#installing-packages).
- Note that the Pipfile uses the [TOML Spec](https://github.com/toml-lang/toml#user-content-spec).

## Example Pipenv Workflow

### Start new Project

Create a new project using Python 3 in the current directory you’re in:

```shell
pipenv --three
```

To create a new virtualenv, using a specific version of Python you have installed (and on your PATH), use the --python VERSION flag, like so:

**Python 3**:

```shell
pipenv --python 3
```

**Python3.6**:

```shell
pipenv --python 3.6
```

If you don’t specify a Python version on the command-line, either the `requires`, `python_full_version` or `python_version` will be selected automatically, falling back to whatever your system’s default python installation is, at time of execution.

### Clone existing project/repo

Clone / create project repository and cd into it:

```shell
cd myproject
```

First, if there is a `pipfile` already in the repo, lets install the packages from it in this virtual env:

```shell
# Optional --dev to install both the dev and default packages in the Pipfile
pipenv install
```

### Add/Remove Packages

If there is no pipfile, it’s a new project, or you simply want to install a module/package to your pipfile, you can add it to your project with (while in the repo dir):

```shell
# Optional --dev to install to package in your dev-packages in Pipfile
pipenv install [package]
```

#### Install a specific version of the package

```bash
pipenv install boto3==1.28.56
```

#### Install a version of the package from a major/minor release:

```bash
pipenv install boto3~=1.28
```

This will create a `Pipfile` if one doesn’t exist. If one does exist, it will automatically be edited with the new package you provided, effectively adding the specified package to your pipfile for you.

To uninstall all packages or certain packages:

```shell
pipenv uninstall [--all] [package]
```

### Activate/Deactivate Virtual Environment

You can also activate the pipenv shell so that you can run your code with the packages and packaged python library version with:

```shell
pipenv shell
```

Then to test it works:

```shell
python --version
```

This will spawn a new shell subprocess, which can be deactivated by using `ctrl + d` or typing `exit` / `deactivate`.

## Example Pipenv Upgrade Workflow

Find out what’s changed upstream:

```shell
pipenv update --outdated
```

Upgrade packages, two options:

1. Want to upgrade everything? Just do: `pipenv update`

2. Want to upgrade packages one-at-a-time? `pipenv update [package]` for each outdated package

## Importing from requirements.txt

If you only have a `requirements.txt` file available when running `pipenv install`, pipenv will automatically import the contents of this file and create a Pipfile for you.

You can also import a requirements file manually with:

```shell
pipenv install -r path/to/requirements.txt
```

If your requirements file has version numbers pinned, you’ll likely want to edit the new Pipfile to remove those, and let pipenv keep track of pinning. If you want to keep the pinned versions in your Pipfile.lock for now, run pipenv lock --keep-outdated. Make sure to [upgrade](https://pipenv-fork.readthedocs.io/en/latest/basics.html#initialization) soon!

## pipenv lock

`pipenv lock` command is used to create a `Pipfile.lock`, which declares all dependencies (and sub-dependencies) of your project, their latest available versions, and the current hashes for the downloaded files. This ensures repeatable, and most importantly deterministic, builds.
