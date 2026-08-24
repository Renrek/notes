
Bare install first.



### SSHD configuration
```shell
apt install ssh
nano /etc/ssh/sshd_config
```
## SSH Setup and Configuration
Note that the pub file will need to be transferred to the machine being configured.

### User Access
```shell
su <username>
mkdir /home/<username>/.ssh && chmod 700 /home/<username>/.ssh
touch /home/<username>/.ssh/authorized_keys && chmod 600 /home/<username>/.ssh/authorized_keys
cd /home/<username>/.ssh
cat <username>_rsa.pub >> authorized_keys
```

Change these attributes:
```vim
PermitRootLogin no
PubkeyAuthentication yes
PasswordAuthentication no
PermitEmptyPasswords no
UsePAM no
```

## Firewall Setup - UFW
UFW - Uncomplicated Firewall is a front end for iptables.
```shell
apt install ufw
ufw default deny incoming && ufw default allow outgoing
ufw allow 22
sudo ufw allow from 172.22.0.0/16 to any port 3306 proto tcp
ufw enable && ufw status verbose
```

```bash
sudo apt update 
sudo apt install mysql-server
sudo nano /etc/mysql/mysql.conf.d/mysqld.cnf

```

## Change these two lines.
```vim
bind-address            = 0.0.0.0
mysqlx-bind-address     = 0.0.0.0
```

## Virtual Machine Guest Agent
Only necessary if a virtual machine. It allows the host server access.

```Shell
sudo apt install qemu-guest-agent
```