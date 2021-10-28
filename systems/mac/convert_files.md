# Unix & Mac file converstion txt to md

```shell
find . -iname "*.txt" -exec bash -c 'mv "$0" "${0%\.txt}.md"' {} \;
```