# Mount NFS Shares on Debian Client

## Install NFS Client

```bash
sudo apt update
sudo apt install nfs-common
```

## Create Mount Points

```bash
sudo mkdir -p /nfs/general
```

## Mount NFS Shares

```bash
sudo mount host_ip:/var/nfs/general /nfs/general
```

Verify the mounts:

```bash
df -h
du -sh /nfs/general
```

## Configure Auto-Mount at Boot

Add the following entries to /etc/fstab:

```
host_ip:/var/nfs/general    /nfs/general   nfs auto,nofail,noatime,nolock,intr,tcp,actimeo=1800 0 0
```

## Unmount Shares

```bash
cd ~
sudo umount /nfs/general

df -h
```