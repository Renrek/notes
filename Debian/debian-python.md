<!-- https://computingforgeeks.com/how-to-install-python-on-debian-linux/ -->
```shell 
apt install build-essential zlib1g-dev libncurses5-dev libgdbm-dev libnss3-dev libssl-dev libreadline-dev libffi-dev libsqlite3-dev wget libbz2-dev
```

```shell
wget https://www.python.org/ftp/python/3.10.2/Python-3.10.2.tgz
```

```shell
tar -xf Python*.tgz
```

```shell
cd Python-3.10.2
```

```shell
./configure --enable-optimizations
```
<!-- checks number of procs / cores -->
```shell
nproc
```

<!-- uses # of cores -->
```shell
make -j 4
```
<!-- installs in another dir to have mliple instals -->
```shell
make altinstall
```

<!-- may take a while -->