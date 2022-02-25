https://github.com/nodesource/distributions
su -
cd ~
apt install curl
curl -sL https://deb.nodesource.com/setup_12.x -o nodesource_setup.sh
nano nodesource_setup.sh
chmod +x nodesource_setup.sh
./nodesource_setup.sh
sudo apt install nodejs


<!-- need to add filepermissions -->

nano .bashrc
HUB_ADDRESS=
HUE_APPLICATION_KEY=

ufw allow 80
set

which node should get you binary path else nodejs
should be /user/bin/node

cd /lib/systemd/system

sudo nano /lib/systemd/system/react-app.service

```ini
[Unit]
Description=Light remote website
Documentation=http://light-remote.lan.renrek.com
After=network.target

[Service]
Environment=NODE_ENV=production
Environment=HUB_ADDRESS=172.20.0.20
Environment=HUE_APPLICATION_KEY=r2HbBXh5GN-FpyVZGOU0uDR0pv3mjTLUAok3KyI4
Type=simple
User=root
ExecStart=/usr/bin/node /light-remote.lan.renrek.com/server/server.js
Restart=on-failure

[Install]
WantedBy=multi-user.target
```

$ sudo systemctl daemon-reload


```ini
[Unit]
Description=My super nodejs app

[Service]
# set the working directory to have consistent relative paths
WorkingDirectory=/var/www/app

# start the server file (file is relative to WorkingDirectory here)
ExecStart=/usr/bin/node serverCluster.js

# if process crashes, always try to restart
Restart=always

# let 500ms between the crash and the restart
RestartSec=500ms

# send log tot syslog here (it doesn't compete with other log config in the app itself)
StandardOutput=syslog
StandardError=syslog

# nodejs process name in syslog
SyslogIdentifier=nodejs

# user and group starting the app
User=www-data
Group=www-data

# set the environement (dev, prod…)
Environment=NODE_ENV=production


[Install]
# start node at multi user system level (= sysVinit runlevel 3) 
WantedBy=multi-user.target
```