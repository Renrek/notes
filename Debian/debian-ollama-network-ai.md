# Ollama Network AI Server
*Last Version tested on: Debian 13 - Trixie*

Bare metal install on a Dell PowerEdge R410. No GPU is available so inference runs on CPU only. The 64GB of RAM allows larger models to be run despite the lack of GPU acceleration.

Make sure to do the [Debian Base Configuration](debian-base-configuration.md) first.

## Install Dependencies
```shell
sudo apt update
sudo apt install -y curl libcurl4 libstdc++6 libzstd1 ca-certificates procps screen
```

## Install Ollama
```shell
curl -fsSL https://ollama.com/install.sh | sh
```

Check the service is running:
```shell
sudo systemctl status ollama
```

## Allow Network Access
By default Ollama only listens on localhost. To reach it from other machines on the network, override the systemd service to bind on all interfaces.

```shell
sudo systemctl edit ollama
```

Add the following override:
```ini
[Service]
Environment="OLLAMA_HOST=0.0.0.0"
```

```shell
sudo systemctl daemon-reload
sudo systemctl restart ollama
```

## Firewall
```shell
sudo ufw allow 11434
```

## Test
Pull a model and run a quick prompt, choose a size that fits comfortably in 64GB of RAM since inference is CPU only:
```shell
ollama pull llama3.1
ollama run llama3.1 "hello"
```

From another machine on the network:
```shell
curl http://<server-ip>:11434/api/generate -d '{"model": "llama3.1", "prompt": "hello"}'
```

## Basic Local Commands
```shell
ollama list
ollama ps
ollama show llama3.1
ollama rm llama3.1
ollama stop llama3.1
```

Follow the service logs:
```shell
journalctl -u ollama -f
```

## Connect From Another Machine's CLI
The `ollama` CLI is just a client for the API, so it can be installed on another machine and pointed at the server instead of running a local instance.

Install the CLI on the client machine the same way:
```shell
curl -fsSL https://ollama.com/install.sh | sh
```

The install also starts a local `ollama` service. Stop and disable it since it isn't needed on the client:
```shell
sudo systemctl stop ollama
sudo systemctl disable ollama
```

Point the CLI at the server by setting `OLLAMA_HOST` before running commands:
```shell
export OLLAMA_HOST=http://<server-ip>:11434
ollama list
ollama run llama3.1 "hello"
```

Add the export to `~/.bashrc` (or `~/.zshrc`) to make it permanent for that user:
```shell
echo 'export OLLAMA_HOST=http://<server-ip>:11434' >> ~/.bashrc
```
