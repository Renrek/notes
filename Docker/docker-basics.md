# Docker Basics
_Last tested 10-24-21_



For the sake of this repository, I created a simple Express.js server to host a static webpage. 
#### Requirements
- [Docker Desktop](https://www.docker.com/products/docker-desktop)
- [Express Setup](https://github.com/Renrek/notes/blob/main/Express/express-basic-web-server.md)
- [Static Content](https://github.com/Renrek/notes/blob/main/HTML)

#### Create DockerFile

Create the Docker File in the root of the project file, the same level as the package.json

```shell
touch Dockerfile
```

```Dockerfile
FROM node
WORKDIR /srv
COPY . .
RUN npm i
CMD [ "npm", "run", "start"]
```

#### Build Container

```shell
docker build -t express-basic .
```

#### Security Check
```shell
docker scan express-basic
```

```shell
docker run -dp 8080:5000 express-basic
```

#### View content hosted within container
[http://localhost:8080](http://localhost:8080)