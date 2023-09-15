# Windows Powershell Commands

[Reference Here](https://docs.microsoft.com/en-us/powershell/module/microsoft.powershell.core/?view=powershell-7.2).

## Get-Help

The Get-Help cmdlet displays information about PowerShell concepts and commands, including cmdlets, functions, Common Information Model (CIM) commands, workflows, providers, aliases, and scripts.

***Options:***

| Flag        | Description     |
| ----------- | -----------     |
| -Full       | Displays the help article's full view that includes parameter descriptions, examples, input and output object types, and additional notes |
| -Detailed   | Displays the help article's detailed view that includes parameter descriptions and examples |
| -Examples   | Displays the help file's NAME and SYNOPSIS sections, and all the Examples. You can't specify an Example number because the Examples parameter is a switch parameter |

***Examples:***

> format-table command detailed help

```powershell
Get-Help Format-Table -Detailed
```

## nslookup

Query Internet name servers interactively.

***Options:***

| Flag        | Description     |
| ----------- | -----------     |
| -type=[rec] | ‘rec’ can be a type of record, [any, a, ns etc.] |
| -debug      | Show debugging information |

***Examples:***

> queries for any record for domain.com.au and provides debug output

```powershell
nslookup -debug type=any domain.com.au
```

## Select-String

Select-String (our PowerShell grep) works on lines of text and by default looks for the first match in each line and then displays the file name, line number, and the text within the matched line. Additionally, Select-String can work with different file encodings, such as Unicode text, by use the byte-order-mark (BOM) to determine the encoding format. If the BOM is missing, Select-String will assume it is a UTF8 file.

***Options:***

| Flag        | Description     |
| ----------- | -----------     |
| -Path [PATH] | Specify files to search for the text in |
| -Pattern [PATTERN] | The pattern to search the input content or files for based on RegEx |

***Examples:***

> Showing the returned properties from a Select-String match

```powershell
Select-String -Path "Users\*.csv" -Pattern "Joe" | Select-Object * -First 1
```

> If you need to search into SubDirectories for the contents of files for a particular pattern this will work

```powershell
get-childitem C:\ProgramData\Datadog\conf.d\* -recurse | select-string  -Pattern "ValidateConnections"
```

## Get-Process (alias = ps)
