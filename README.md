#Face the Internet

### Background
This project was originally conceived between [Florian Hacker](http://cargocollective.com/florianhacker) and [John Pett](http://johnpett.com) as an entry to the [Google and Barbican DevArt](https://devart.withgoogle.com/) contest. This project has also been contributed to by [Ben Harvey](https://github.com/gomako) and [Edu Wass](https://github.com/eduwass) for their lean programming skills!

### Introduction


## Installation

1. [Install Docker](http://docs.docker.com/engine/installation/mac/), and all of the accompanying tools. As this was built on Mac OSX, these instructions are for recreating on that platform.

2. Create a new `$ docker-machine`. To do this, use the following command: `$ docker-machine create --driver virtualbox dev`, replacing `dev` with your desired name.

3. Once you have done this you can run your new machine with the following command: `$ docker-machine env dev`. To configure the shell, you must then run this command: `$ eval "$(docker-machine env dev)"`. If you run the `$ docker-machine ls` command, to show what machines you have, and which one is active.

4. Similarly, running the `$ docker ps` command will show your images. At this stage you shouldn't have any images, just two containers. To create a [Node.js](https://nodejs.org/en/) image, we need to pull node from the [Docker Hub](https://hub.docker.com/): Use the command `$ docker pull node` to install all the things you need, more information can be found [here](https://hub.docker.com/_/node/).

5. Now you need to navigate to the [Github repository](https://github.com/JohnPett/Face-the-Internet) in your terminal. If you haven't cloned [this](https://github.com/JohnPett/Face-the-Internet) repository yet, do so first. When in the root of the project, use the command `$ docker run -v $PWD:/app`, noticing that in your corresponding `Dockerfile` you have exposed the volume `-v` to docker. Further explanation of the `Docker` file and setup of this step can be found [here](https://hub.docker.com/_/node/).

6. Now to build the application image, we must then run: `$ docker build -t nodeapp .` which tells docker to build an application image with the tag `nodeapp` and the location of the related `Dockerfile` which is at the root `.` of the project. To confirm, run the command `$ docker images` to check. Any other images you have made while testing or setting up can now be removed using `$ docker rmi **image_name**`.

7. To run the project once as a test, you can use the command `$ docker run -v $PWD:/app nodeapp node index.js`, this is the same as running `node server.js` or similar, for those coming from working in that kind of enviroment. The major differences are that we associate the application with the Docker volume and the associated image, then run what is normal for [Node.js](https://nodejs.org/en/) development.

8. Running this each time is not ideal, so a usefull `npm module` to use is [forever.js](https://github.com/foreverjs/forever), which you can add to your `Dockerfile` to run the file that starts your server, for example. To run the file use this line `RUN npm install forever -g` in your `Dockerfile`.