# Dockge Setup on Debian
*Last Version tested on: Debian 13 - Trixie*

## Install Docker First

Follow the [Docker Installation](docker-installation.md) guide first.

## Create Stacks Directory
```shell
sudo mkdir -p /srv/stacks /srv/dockge
```

## Install Dockge
```shell
cd /srv/dockge
curl "https://dockge.kuma.pet/compose.yaml?port=80&stacksPath=/srv/stacks" --output /srv/stacks/docker-compose.yaml
```

## Run Dockge
```shell
sudo docker compose up -d
```

## Verify
```shell
sudo docker ps
```

You should see Dockge running on port 80.

## Firewall
```shell
sudo ufw allow 80
```

## Stop Dockge
```shell
cd /srv/dockge
sudo docker compose down
```

## Restart Dockge
```shell
cd /srv/dockge
sudo docker compose up -d
```

Follow the logs:
```shell
sudo docker compose logs dockge
```

## Use Dockge

Open `http://<server-ip>:80` in your browser to access the UI.

You can manage your Docker containers, compose services, and stacks through the Dockge web interface.