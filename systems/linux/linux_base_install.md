
apt install ssh

SET ADDRESS

nano /etc/network/interfaces

iface ens18 inet static
        address 172.20.1.104
        broadcast 172.20.255.255
        netmask 255.255.0.0
        gateway 172.20.0.1
        dns-nameserver 8.8.8.8
        dns-nameserver 8.8.4.4



SSH INSTALL

su brad
mkdir /home/brad/.ssh && chmod 700 /home/brad/.ssh
touch /home/brad/.ssh/authorized_keys && chmod 600 /home/brad/.ssh/authorized_keys
cd /home/brad/.ssh
ssh-keygen -t rsa -b 4096 -C "brad@{hostname}"
{hostname}_rsa
cat brad_rsa.pub >> authorized_keys

UFW INSTALL

apt install ufw
ufw default deny incoming && ufw default allow outgoing
ufw allow 22
ufw enable && ufw status

SSHD SETUP

nano /etc/ssh/sshd_config

PermitRootLogin no
PubkeyAuthentication yes
PasswordAuthentication no
PermitEmptyPasswords no
UsePAM no





SUDO SETUP

apt install sudo
usermod -aG sudo brad

VM GUEST AGENT

apt install qemu-guest-agent

systemctl reboot
