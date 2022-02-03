# Ubuntu on Raspberry Pi
*Tested on Raspberry Pi 4*
## Requirements

- [Raspberry Pi Imager](https://www.raspberrypi.com/software/)
- [Latest Raspberry Pi Ubuntu Image](https://ubuntu.com/raspberry-pi)

## Image SD Card

1. Select "Use custom" at the bottom of the list.
1. Select the SD card from the storage list.
1. Select Write.
1. Remove SD card once prompted.
1. Insert card into an unpowered Raspberry Pi

## Configure OS

#### Initial Boot

`sudo nano /etc/netplan/50-cloud-init.yaml`

```yaml
# This file is generated from information provided by the datasource.  Changes
# to it will not persist across an instance reboot.  To disable cloud-init's
# network configuration capabilities, write a file
# /etc/cloud/cloud.cfg.d/99-disable-network-config.cfg with the following:
# network: {config: disabled}
network:
    ethernets:
        eth0:
            dhcp4: true
            optional: true
    wifis:
        wlan0:
            dhcp4: false
            optional: true
            addresses: [192.168.1.2/24]
            gateway4: 192.168.1.1
            nameservers:
                addresses: [8.8.8.8,8.8.4.4]
            access-points:
                "SpecialName":
                    password: "mySuperSecretPassword"
    version: 2
```

`sudo netplan apply`

`sudo apt update` Note: may take a couple of attempts
`sudo apt upgrade` Will likly be a huge update.

`sudo adduser username`
`usermod -aG sudo username`
`su username`
`cd ~`
`mkdir .ssh`
`cd .ssh`

## SSH Setup and Configuration
Note that the pub file will need to be transferred to the machine being configured.

### SSHD configuration
```shell
nano /etc/ssh/sshd_config
```

Change these attributes:
```vim
PermitRootLogin no
PubkeyAuthentication yes
PasswordAuthentication no
PermitEmptyPasswords no
UsePAM no
```

### User Access
```shell
su <username>
mkdir /home/<username>/.ssh && chmod 700 /home/<username>/.ssh
touch /home/<username>/.ssh/authorized_keys && chmod 600 /home/<username>/.ssh/authorized_keys
cd /home/<username>/.ssh
cat <username>_rsa.pub >> authorized_keys
```
`hostnamectl` Show info
`hostnamectl set-hostname thename` Set the hostname
`landscape-sysinfo`
