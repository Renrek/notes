# Docker Installation
*Version: Debian 13 - Trixie

This installs Docker Engine and Docker Compose from Docker's official APT repository on a minimal Debian netinstall system.

## Prerequisites

Update the system and install the packages needed to add Docker's repository.

```shell
sudo apt update
sudo apt upgrade
sudo apt install ca-certificates curl
```

## Add Docker Repository

```shell
sudo install -m 0755 -d /etc/apt/keyrings
sudo curl -fsSL https://download.docker.com/linux/debian/gpg -o /etc/apt/keyrings/docker.asc
sudo chmod a+r /etc/apt/keyrings/docker.asc
```

```shell
echo \
	"deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.asc] https://download.docker.com/linux/debian \
	$(. /etc/os-release && echo \"$VERSION_CODENAME\") stable" | \
	sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
sudo apt update
```

## Install Docker Engine and Compose

```shell
sudo apt install docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin
sudo systemctl enable --now docker
```

Verify that Docker Engine and Docker Compose are available:

```shell
sudo docker run hello-world
docker compose version
```

## Run Docker Without Sudo

Add the current user to the `docker` group, then sign out and back in for the new group membership to take effect.

```shell
sudo usermod -aG docker $USER
```

After signing back in, verify access:

```shell
docker run hello-world
```

Membership in the `docker` group grants root-level access to the system. Use it only for trusted users.
