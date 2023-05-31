- Follow the [installation](https://github.com/BioCla/Discord-MusicBot/blob/feature/DJSv14/djs-bot/README.md) procedure for the bot
- Make sure you have [Docker](https://www.docker.com/) (and [CMake](https://cmake.org/)) installed on your machine
  - If you are planning on running the bot through docker on windows, then you'll have to use WSL and set up the appropriate docker configurations for that [(click here)](https://docs.docker.com/desktop/windows/wsl/)
- Open a terminal session in in the root directory of the project
- Run `make help` to see the list of available commands
  - If you don't have or can't install makefile utilities then run `./dc.sh help`


### DB

Setup the ports in a docker-compose.override.yml file in the docker directory. The file should look like this:

```yml
version: '3'

services:
  postgres-db:
    ports:
      - xxxx:xxxx
```

Make a `.env` in the same directory as the docker-compose.override.yml file. The file should look like this:

```env
POSTGRES_DB=base
POSTGRES_USER=root
POSTGRES_PASSWORD=root
```
