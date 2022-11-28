# SSH Commands & Notes

## Starting the Agent

#### Linux
By calling eval you load the variables into your environment.
```Shell
eval $(ssh-agent)
```

## While it is manual it makes it work....

Windows seems to have issues so this was the only way I could get it to work currently.
```shell
Set-Service ssh-agent -StartupType Manual 
```

#### Windows
```powershell
exec ssh-agent bash
```

## Add Key to Agent
```shell
ssh-add id_rsa
```

## Removing entries from known_hosts
```shell
ssh-keygen -R <ip or hostname>
```