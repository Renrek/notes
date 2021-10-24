# Debian Base Configuration
When installing debian I use the net install iso and install just the operating system. I intentionally manually install everything that I will use to ensure only what is needed is on the system.

## Sudo Setup

```Shell
su -
apt install sudo
usermod -aG sudo <username>
```

## Setup Static Address
```shell
nano /etc/network/interfaces
```

Change file to match snippet:
```vim
iface ens18 inet static
        address 172.22.1.104
        broadcast 172.22.255.255
        netmask 255.255.0.0
        gateway 172.22.0.1
        dns-nameserver 8.8.8.8
        dns-nameserver 8.8.4.4

```

## Firewall Setup - UFW
UFW - Uncomplicated Firewall is a front end for iptables.
```shell
apt install ufw
ufw default deny incoming && ufw default allow outgoing
ufw allow 22
ufw enable && ufw status
```

## SSH Setup and Configuration
Note that the pub file will need to be transferred to the machine being configured.

### SSHD configuration
```shell
apt install ssh
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

## Virtual Machine Guest Agent
Only necessary if a virtual machine. It allows the host server access.

```Shell
apt install qemu-guest-agent
```


## Reboot
Do this for good measure.
```shell
systemctl reboot
```


