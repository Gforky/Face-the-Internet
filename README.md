##Face the Internet

### Background
This project was originally conceived between [Florian Hacker](http://cargocollective.com/florianhacker) and [John Pett](http://johnpett.com) as an entry to the [Google and Barbican DevArt](https://devart.withgoogle.com/) contest. This project has also been contributed to by [Ben Harvey](https://github.com/gomako) and [Edu Wass](https://github.com/eduwass) for their lean programming skills!

Here is some imagery from the previous incarnations of this project, outlining the original concept of both online and real-world manifestations.

![Face Test](https://github.com/JohnPett/Face-the-Internet/blob/master/docs/face-test.png)

![Early Output](https://github.com/JohnPett/Face-the-Internet/blob/master/docs/head-shot.jpg)

![Exhibition Proposal](https://github.com/JohnPett/Face-the-Internet/blob/master/docs/exhibition.png)

### Introduction
This project sits somewhere between sculpture, technology, art, motion graphic design and interactivity. An experiment, as much as a learning exercise, to combine the latest technologies for application development with thoughts on contemporary art, computer vision and user interaction.

## Installation
Before you start you will need the following installed on your machine. [Python](https://www.python.org/) & `:/pkg-config` need installing with Brew.

### Detailed Install

#### OpenCV
1. [OpenCV](http://opencv.org/) needs to be installed on Mac OSX through a package manager. For this we have used [Brew](http://brew.sh/), but there are other options available. You can find install instructions for Brew [here](http://brew.sh/).

2. To install [OpenCV](http://opencv.org/), once you have [Brew](http://brew.sh/), follow these commands: `$ brew tap homebrew/science`, followed by `$ brew install opencv`.

3. Once this is installed, you will need the Node bindings to allow for interfacing with Javascript. There are a few options online, bu this project uses [this](https://www.npmjs.com/package/opencv) example. To install the bindings, run `$ npm install opencv --save` from the root of the project directory. For more information on this, please see [Peter Braden's Github repository](https://github.com/peterbraden/node-opencv).


#### Express + Websockets
To take advantage of real-time face recognition and giving instant feedback to the user, this project uses websockets. [Express.io](http://express-io.org/) provide the solution to client and server interactions, which you can install as an `npm-module`, you can find further information [here](https://www.npmjs.com/package/express.io).


#### React
[React](https://facebook.github.io/react/) is a relatively new tool to help create interfaces in JavaScript. In addition it cares very little about the rest of the of your stack, making it perfect for a project like this.


#### Three
[THREE](http://threejs.org/)

[THREE Decal Geometry](https://www.npmjs.com/package/three-decal-geometry)


#### Flynn
Flynn is the cluster PaaS that will take care of all the devops for us, we just have to push out app to it.


##### Setup
Fire up a DigitalOcean droplet with Ubuntu 14.04 x64


##### Digital Ocean
Bash run [this script](https://gist.github.com/eduwass/c8c15b73329a0e9699c4)

When it finishes, remember the last 10 lines of output contain some important info:

1. Copy the `$ flynn cluster add ...` command
2. Copy the dashboard URL and login token 


##### Push to Flynn
From your dev machine, go to a folder where you store the face-the-internet repo:

1. Nnstall the Flynn CLI if you don't have it yet, by using the following command:
`$ L=/usr/local/bin/flynn && curl -sSL -A "uname -sp" https://dl.flynn.io/cli | zcat >$L && chmod +x $L`

2. Next, run the command: `flynn cluster add ...` (the exact command is outputted by [the setup script](https://gist.github.com/eduwass/c8c15b73329a0e9699c4) in the setup steps). This will associate your local dev machine with your VPS Flynn cluster.
 
3. Make sure you have accessed the Flynn dashboard and accepted the certificate.

4. Now from inside the `face-the-internet` repo you can `$ flynn create APP_NAME`and then `$ git push flynn master` to send it to Flynn.