https://www.teamspeak.com/en/downloads/#server

click on clipboard to copy link

As root: 

apt update && apt upgrade
apt install wget bzip2
cd /opt
wget <address of package>
tar xvf teamspeak3-server_linux_amd64-3.13.6.tar.bz2
sudo mv teamspeak3-server_linux_amd64 teamspeak
chown user:user /opt/teamspeak




touch .ts3server_license_accepted

crontab -e
@reboot cd /opt/teamspeak && ./ts3server_startscript.sh restart

ufw allow 9987
ufw allow 30033