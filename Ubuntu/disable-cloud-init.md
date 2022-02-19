# Manage cloud-init in Ubuntu

Choose between Disabling or Removal

## Option 1 - Disable
```shell
sudo touch /etc/cloud/cloud-init.disabled
```

## Option 2 - Remove
```shell
sudo apt-get purge cloud-init
sudo rm -rf /etc/cloud && sudo rm -rf /var/lib/cloud
sudo systemctl reboot
```

Note: `sudo dpkg-reconfigure cloud-init`