# Deploy React - Express App on Debian
*Tested on Debian 11 - 2/26/22*

Make sure to do the [Debian Base Configuration](https://github.com/renrek/notes/blob/main/Debian/debian-base-configuration.md) first.

Make sure express.js is configured for port 5000 and static is set to './build'.

Port 80 does not open for not root users, so we wil do port forwarding.

### Install NodeJs

This process gets the latest node installed on the server - [NodeSource Info](https://github.com/nodesource/distributions).

1. `su -`
1. `cd ~`
1. `apt install curl`
1. `curl -sL https://deb.nodesource.com/setup_16.x -o nodesource_setup.sh`
1. `chmod +x nodesource_setup.sh`
1. `./nodesource_setup.sh`
1. `apt install nodejs`
1. `mkdir /srv/www /srv/www/express`
1. `exit`

### Transfer files from repo

Use any method you like scp, ftp, but only move public, server, src, package.json, and package-lock.json to /srv/www/express.

1. `sudo npm install`
1. `sudo npm run build`
1. `sudo mv build server/`
1. `sudo chown www-data:www-data -R /srv/www`


### Setting up express.js as a service

Verify Nodejs location with the command: `which node`

Create a service file: `sudo nano /lib/systemd/system/express.service`

```ini
[Unit]
Description=Express
Documentation= React Web-app
After=network.target

[Service]
Type=simple

# user and group starting the app 
# DO NOT USE ROOT!
User=www-data
Group=www-data

# set the working directory to have consistent relative paths
WorkingDirectory=/srv/www/express/server

# start the server file (file is relative to WorkingDirectory here)
ExecStart=/usr/bin/node server.js

# if process crashes, always try to restart
Restart=always

# let 500ms between the crash and the restart
RestartSec=500ms

# Setup logging
StandardOutput=syslog
StandardError=syslog
SyslogIdentifier=express

# Add Environment Variables here
Environment=NODE_ENV=production

[Install]
WantedBy=multi-user.target
```

1. `ufw allow 5000`
1. `sudo systemctl daemon-reload` Note: use this command anytime you edit service.
1. `sudo systemctl enable express`
1. `sudo systemctl start express`

View Status: 
`sudo systemctl status express` or `sudo journalctl -u express.service`

You should be able to preview the site by going to http://hostNameOrIP:5000

### Forward requests to port 80 to 5000

Should work without opening port 80, but open it anyway: `sudo ufw allow 80`

Alter the default forward policy: `sudo nano /etc/default/ufw`

```text
DEFAULT_FORWARD_POLICY="ACCEPT"
```

Insert forwarding rule: `sudo nano /etc/ufw/before.rules`
```
#   ufw-before-forward
#

*nat
:PREROUTING ACCEPT [0:0]
-A PREROUTING -p tcp --dport 80 -j REDIRECT --to-port 5000
COMMIT

# Don't delete these required lines, otherwise there will be errors
*filter
```

1. `sudo ufw disable`
1. `sudo ufw enable`
1. `sudo ufw status`

Lastly enjoy your site naturally.