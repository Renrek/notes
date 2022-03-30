## Rough Draft
# Steam CMD


#### Add non-free to main repo
```shell
deb http://ftp.us.debian.org/debian/ bullseye main non-free
```

#### Install necessary packages
```shell
sudo dpkg --add-architecture i386
sudo apt update
sudo apt install libsdl2-2.0-0:i386
sudo apt-get install steamcmd
sudo apt install ca-certificates

cd /opt
sudo ln -s /usr/games/steamcmd steamcmd
```
https://developer.valvesoftware.com/wiki/Dedicated_Servers_List

?? sudo apt-get install lib32gcc1

