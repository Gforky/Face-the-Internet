# Introduction

## Installation

1. [Install Docker](http://docs.docker.com/engine/installation/mac/), and all of the accompanying tools. As this was built on Mac OSX, these instructions are for recreating this project on that platform.

2. Once everything is installed on your machine, you will need to make this a [Node.js](https://nodejs.org/en/) environment, which you can do by first creating a new `$ docker-machine`. Docker comes with a `default` machine, but let's make a `dev` one, to understand the process. To do this, use the following command: `$ docker-machine create --driver virtualbox dev`.

3. Once you have done this you can run your new machine with the following command: `$ docker-machine env dev`. To configure the shell, you must then run this command: `$ eval "$(docker-machine env dev)"`. Once you are this far, if you run the `$ docker-machine ls` command, to show what machines you have, and what machine is active.

4. Similarly, running the `$ docker ps` command will show you the images you have. At this stage you shouldn't have any images, just two containers. To create a [Node.js](https://nodejs.org/en/) image, we need to pull node from the [Docker Hub](https://hub.docker.com/): Use the command `$ docker pull node` to install all the things you need, more information can be found [here](https://hub.docker.com/_/node/).

5. Now you need to navigate to the [Github repository](https://github.com/JohnPett/Face-the-Internet) in your terminal. If you haven't cloned [this](https://github.com/JohnPett/Face-the-Internet) repository yet, do so first. When in the root of the project, use the command `$ docker run -v $PWD:/app`, noticing that in your corresponding `Dockerfile` you have exposed the volume `-v` to docker. Further explanation of the `Docker` file and setup of this step can be found [here](https://hub.docker.com/_/node/).

6. Now to build the application image, we must then run: `$ docker build -t nodeapp .` which tells docker to build an application image with the tag `nodeapp` and the location of the related `Dockerfile` which is at the root `.` of the project. To confirm, run the command `docker images` to check. Any other images you have made while testing or setting up can now be removed using `docker rmi image_name`.

7. 