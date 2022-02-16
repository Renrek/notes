# Ubuntu Server Static IP

I rarely if ever use ubuntu server, this is a stub in the case that I look into it further.
```shell
sudo nano /etc/netplan/00-installer-config.yaml
```
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

#### Commands of Note:
```shell
ip link
```