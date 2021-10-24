# SSH Commands & Notes

## Starting the Agent

#### Linux
By calling eval you load the variables into your environment.
```Shell
eval $(ssh-agent)
```

#### Windows
```powershell
exec ssh-agent bash
```

## Add Key to Agent
```shell
ssh-add id_rsa
```