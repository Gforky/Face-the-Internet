#Face the Internet

### Background

This project was originally conceived between [Florian Hacker](http://cargocollective.com/florianhacker) and [John Pett](http://johnpett.com) as an entry to the [Google and Barbican DevArt](https://devart.withgoogle.com/) contest. This project has also been contributed to by [Ben Harvey](https://github.com/gomako) and [Edu Wass](https://github.com/eduwass) for their lean programming skills!

### Introduction

This project sits somewhere between sculpture, technology, art, motion graphic design and interactivity. An experiment, as much as a learning exercise, to combine the latest technologies for application development with thoughts on contemporary art, computer vision and user interaction.

## Installation

### Quick Start

1. Navigate to 'Documents' on Mac OSX from your Terminal window.

2. Clone project code repository from [Github](https://github.com/JohnPett/Face-the-Internet) in to 'Documents'.

3. Install [Docker](http://docs.docker.com/engine/installation/mac/).

4. Install [Node.js](https://hub.docker.com/_/node/) for Docker.

5. From Terminal run: `$ docker-machine env default`
 
6. From Terminal run: `$ eval "$(docker-machine env default)"`

7. From Terminal run: `$ docker build -t nodeapp .`

8. From Terminal run: `$ docker run --rm -it -p 3000:3000 -v $PWD:/app nodeapp forever index.js`

9. From the root of the project code 'Documents/nodeapp', run `$ gulp`, this will give you a development version of the front-end on [http://localhost:4000/](http://localhost:4000/).

10. To deploy your code to view on the `docker-machine`, you must run `$ gulp deploy`  to see the site on the `docker-machine` [http://192.168.99.100:3000/](http://192.168.99.100:3000/).

### Useful

[Cheat sheet](https://github.com/wsargent/docker-cheat-sheet).

Remove image:
`$ docker rmi **image_ID**`

Stop all running images:
`$ docker stop $(docker ps -a -q)`

Remove all running images:
`$ docker rm $(docker ps -a -q)`

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

12. When you wish to view the project through your web browser, you will need to bind the port of the docker machine with the port of your local machine, to do this run `docker run --rm -it -p 3000:3000 -v $PWD:/app nodeapp forever index.js`, this binds port 3000 exposed within your vm and allows you to view the web version here: [http://192.168.99.100:3000/](http://192.168.99.100:3000/)

#### OpenCV

1. [OpenCV](http://opencv.org/) needs to be installed on Mac OSX through a package manager. For this we have used [Brew](http://brew.sh/), but there are other options available. You can find install instructions for Brew [here](http://brew.sh/).

2. To install [OpenCV](http://opencv.org/), once you have [Brew](http://brew.sh/), follow these commands: `$ brew tap homebrew/science`, followed by `$ brew install opencv`.

3. Once this is installed, you will need the Node bindings to allow for interfacing with Javascript. There are a few options online, bu this project uses [this](https://www.npmjs.com/package/opencv) example. To install the bindings, run `$ npm install opencv --save` from the root of the project directory. For more information on this, please see [Peter Braden's Github repository](https://github.com/peterbraden/node-opencv).

#### Express + Websockets

Some notes to come...

#### React

Some notes to come...

#### Flynn

Flynn is the cluster PaaS that will take care of all the devops for us, we just have to push out app to it.

##### If Flynn is already setup:

In this case I already set up a DigitalOcean droplet @ 178.62.82.175,
so you would just have to get an SSH key to access it and set up Flynn in your dev machine.

1. To install the CLI itself, run the following command:
`L=/usr/local/bin/flynn && curl -sSL -A "uname -sp" https://dl.flynn.io/cli | zcat >$L && chmod +x $L`
2. Next, run the command: `flynn cluster add -p 2Jox82m4rr6SItXGqcl8ikyvNIyjxVVHygBPGlI4vkQ= default site.178.62.82.175.xip.io d4aeb3bbe52ae1a8dc80fb8637b1954f`. This will associate your local dev machine with your VPS' Flynn cluster!
2. Now acces the dashboard at http://dashboard.site.178.62.82.175.xip.io and your login token is --ask me lol--
3. Accept the certificate
4. Now from inside the face-the-internet repo you can `flynn create APP_NAME`and then `git push flynn master` to send it to Flynn

Coming soon... pushing Docker images

##### If Flynn is not setup yet:

Fire up a DigitalOcean droplet with Ubuntu 14.04 x64 and access its console.

**Setup DigitalOcean droplet**

1. Install Flynn command-line interface:
`L=/usr/local/bin/flynn && curl -sSL -A "uname -sp" https://dl.flynn.io/cli | zcat >$L && chmod +x $L`
1. Download and run the Flynn install script:
`sudo bash < <(curl -fsSL https://dl.flynn.io/install-flynn)`
1. Run the following command to get the discovery URL for your one-node cluster. If you want to have multiple nodes of Flynn, please see their documentation
`sudo flynn-host init --init-discovery`
1. Run the following two commands to get your one-node cluster going. Make sure the second command returns running process status
`sudo start flynn-host
`sudo status flynn-host
1. Set up your cluster via the next command. Make sure to replace the CLUSTERDOMAIN value with whatever the domain will be for your web server. If you don't have a domain yet, you can use the following formula to get a domain name: site.IPADDRESS.xip.io. An example of this would be 10.0.0.1.xip.io. Also, make sure you repalce the --discovery URL with the URL that was generated earlier.
`sudo \
    CLUSTER_DOMAIN=site.[Droplet IP].xip.io \
    flynn-host bootstrap \
    --discovery https://discovery.flynn.io/clusters/53e8402e-029.8f-4861-95ba-d5b5a91b5902`
1. If it's saying it can't find the cluster, then you should powercycle flynn-host like so:
`stop flynn-host && start flynn-host`
The above command should say "Flynn bootstrapping complete." if everything finished successfully. It should return a command to run that will look something like this:
`flynn cluster add -p REktHVsDrKFed7ACeKJCt9xF3TrMd96d1+N3Nr5BArY= default site.104.131.189.57.xip.io fdf9cdda89785ef655e7e787daec8be2`
this means it's time to install the local Flynn client now on our dev machine! Also, make sure you take note of the dashboard URL and login token listed below. We'll be needing this URL and password for Part 3.


#### Architecture

`.nodeapp/app` - React components and front-end development code.

`.nodeapp/public` - Generated code for production, available on [http://192.168.99.100:3000/](http://192.168.99.100:3000/).