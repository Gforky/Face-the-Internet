#Face the Internet

### Background

This project was originally conceived between [Florian Hacker](http://cargocollective.com/florianhacker) and [John Pett](http://johnpett.com) as an entry to the [Google and Barbican DevArt](https://devart.withgoogle.com/) contest. This project has also been contributed to by [Ben Harvey](https://github.com/gomako) and [Edu Wass](https://github.com/eduwass) for their lean programming skills!

### Introduction

This project sits somewhere between sculpture, technology, art, graphic design and interactivity. An experiment, as much as a learning exercise, to combine the latest technologies for application development with thoughts on contemporary art and user interaction.

## Installation

### Quick Start

1. Navigate to the repository root in terminal. Must be cloned in 'Documents' on Mac OSX.
2. Run: `$ docker-machine env dev`
3. Run: `$ eval "$(docker-machine env dev)"`
4. Run: `docker build -t nodeapp .`

### Useful

[Cheat sheet](https://github.com/wsargent/docker-cheat-sheet).

Remove image:
`$ docker rmi **image_ID**`

Stop all running images:
`$ docker stop $(docker ps -a -q)`

Remove all running images:
`$ docker rm $(docker ps -a -q)`

### Quick Install

1. Install [Docker](http://docs.docker.com/engine/installation/mac/).

2. Install [Node.js](https://nodejs.org/en/) for Docker. More information can be found [here](https://hub.docker.com/_/node/).

3. Clone Docker Image: `$ docker pull johnrobertpett/face-the-internet`

4. Clone project code to your 'Documents' folder from: `$ git clone https://github.com/JohnPett/Face-the-Internet.git`

5. From the root of the project code repository folder/'Documents' folder: `$ npm install`

6. Run: `$ docker run --rm -it -p 3000:3000 -v $PWD:/app nodeapp forever index.js`

7. In your browser, navigate to: `http://192.168.99.100:3000/`


### Detailed Install

#### Docker

With the nature of development, staging, and local runtime enviroments it is essential to have a wrapper for Node.js so we can have a very specific setup that is not hindered by the host machine. OpenCV and Node,js, while quite widely documented, are very temperamental to updates and versions. It is therefore essential to use something like [Docker](http://docs.docker.com/engine/installation/mac/).

1. [Install Docker](http://docs.docker.com/engine/installation/mac/), and all of the accompanying tools. As this was built on Mac OSX, these instructions are for recreating on that platform. If you want to just run the existing public image of this application, skip to step 8. The following steps give an outline of how to use Docker in general.

2. Create a new `$ docker-machine`. To do this, use the following command: `$ docker-machine create --driver virtualbox dev`, replacing `dev` with your desired name.

3. Once you have done this you can run your new machine with the following command: `$ docker-machine env dev`. To configure the shell, you must then run this command: `$ eval "$(docker-machine env dev)"`. If you run the `$ docker-machine ls` command, to show what machines you have, and which one is active.

4. Similarly, running the `$ docker ps` command will show your images. At this stage you shouldn't have any images, just two containers. To create a [Node.js](https://nodejs.org/en/) image, we need to pull node from the [Docker Hub](https://hub.docker.com/): Use the command `$ docker pull node` to install all the things you need, more information can be found [here](https://hub.docker.com/_/node/).

5. Now to build the application image, we must then run: `$ docker build -t nodeapp .` which tells docker to build an application image with the tag `nodeapp` and the location of the related `Dockerfile` which is at the root `.` of the project. To confirm, run the command `$ docker images` to check. Any other images you have made while testing or setting up can now be removed using `$ docker rmi **image_name**`.

6. To run the project, you can use the command `$ docker run -v $PWD:/app nodeapp node index.js`, this is the same as running `node server.js` or similar, for those coming from working in that kind of enviroment. The major differences are that we associate the application with the Docker volume and the associated image, then run what is normal for [Node.js](https://nodejs.org/en/) development.

7. A useful `npm module` to use is [forever.js](https://github.com/foreverjs/forever), which you can add to your `Dockerfile` to run the file that starts your server, for example. To run the file use this line `RUN npm install forever -g` in your `Dockerfile`. To run the image, now you can use `$ docker run -v $PWD:/app nodeapp forever index.js`

8. To `push` and `pull` from the [Docker Hub](https://hub.docker.com/), you will need to `login`. This command will allow you to log in to your account `$ docker login` and then you will be prompted to enter your credentials.

9. To `push` for the first time, you will need to reference the tag with the repository and repository, the online [documentation](https://docs.docker.com/mac/step_six/) gives the example of `$ docker tag 7d9495d03763 maryatdocker/docker-whale:latest`, where `7d9495d03763` is the `IMAGE ID`, and `latest` refers to the tag you are going to apply to this repository. Once you have done this, `docker push maryatdocker/docker-whale` using the example above. Once pushed, you can log in to [Docker Hub](https://hub.docker.com/) and see the changes.

11. To `pull` an image, once logged in, simply follow git naming conventions like so `$ docker push maryatdocker/docker-whale`.

12. When you wish to view the project through your web browser, you will need to bind the port of the docker machine with the port of your local machine, to do this run `docker run --rm -it -p 3000:3000 -v $PWD:/app nodeapp forever index.js`, this binds port 3000 exposed within your vm and allows you to view the web version here: `http://192.168.99.100:3000/`

#### OpenCV

1. [OpenCV](http://opencv.org/) needs to be installed on Mac OSX through a package manager. For this we have used [Brew](http://brew.sh/), but there are other options available. You can find install instructions for Brew [here](http://brew.sh/).

2. To install [OpenCV](http://opencv.org/), once you have [Brew](http://brew.sh/), follow these commands: `$ brew tap homebrew/science`, followed by `$ brew install opencv`.

3. Once this is installed, you will need the Node bindings to allow for interfacing with Javascript. There are a few options online, bu this project uses [this](https://www.npmjs.com/package/opencv) example. To install the bindings, run `$ npm install opencv --save` from the root of the project directory. For more information on this, please see [Peter Braden's Github repository](https://github.com/peterbraden/node-opencv).

#### Express + Websockets