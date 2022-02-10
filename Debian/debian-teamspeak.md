# Install Teamspeak on Debian
*Last tested on Debian 11*

[Go to Teamspeaks Download Page](https://www.teamspeak.com/en/downloads/#server)

Note: click on clipboard to copy link

### As root: 

- `apt update && apt upgrade`
- `apt install wget bzip2`
- `cd /opt`
- `wget <address of package copied above>`
- `tar xvf teamspeak3-server_linux_amd64-3.13.6.tar.bz2`
- `mv teamspeak3-server_linux_amd64 teamspeak`
- `chown user:user /opt/teamspeak`

### As user:
- `cd /opt/teamspeak`
- `touch .ts3server_license_accepted`
- `crontab -e`

##### Add the following to the editor:
```
@reboot cd /opt/teamspeak && ./ts3server_startscript.sh restart
```

##### Allow these ports:
- `sudo ufw allow 9987`
- `sudo ufw allow 30033`
- `sudo ufw allow 1011`