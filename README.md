# Introduction

## Installation

1. [Install Docker](http://docs.docker.com/engine/installation/mac/), and all of the accompanying tools. As this was built on Mac OSX, these instructions are for recreating this project on that platform.

2. Once everything is installed on your machine, you will need to make this a [Node.js](https://nodejs.org/en/) environment, which you can do by first creating a new `$ docker-machine`. Docker comes with a `default` machine, but let's make a `dev` one, to understand the process. To do this, use the following command: `$ docker-machine create --driver virtualbox dev`.

3. Once you have done this you can run your new machine with the following command: `$ docker-machine env dev`. To configure the shell, you must then run this command: `$ eval "$(docker-machine env dev)"`. Once you are this far, if you run the `$ docker-machine ls` command, to show what machines you have, and what machine is active.

4. Similarly, running the `$ docker ps` command will show you the images you have. At this stage you shouldn't have any images, just two containers. To create a Node.js image, we need to pull node from the [Docker Hub](https://hub.docker.com/): Use the command `$ docker pull node` to install all the things you need, more information can be found [here](https://hub.docker.com/_/node/).

5. Now you need to navigate to the [Github repository](https://github.com/JohnPett/Face-the-Internet) in your terminal. If you haven't cloned this repository yet, do so first. 