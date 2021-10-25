# Homebrew path
After installing homebrew on the M1 mac in the /opt folder, I had to run these commands to be able to run it.

```shell
touch ~/.zshrc
export PATH=/opt/homebrew/bin:$:PATH
```