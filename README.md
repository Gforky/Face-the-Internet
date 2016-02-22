##Face the Internet

### Background
This project was originally conceived between [Florian Hacker](http://cargocollective.com/florianhacker) and [John Pett](http://johnpett.com) as an entry to the [Google and Barbican DevArt](https://devart.withgoogle.com/) contest. This project has also been contributed to by [Ben Harvey](https://github.com/gomako) and [Edu Wass](https://github.com/eduwass).
Here is some imagery from the previous incarnations of this project, outlining the original concept of both online and real-world.

![Face Test](https://github.com/JohnPett/Face-the-Internet/blob/master/docs/face-test.png)

![Early Output](https://github.com/JohnPett/Face-the-Internet/blob/master/docs/head-shot.jpg)

![Exhibition Proposal](https://github.com/JohnPett/Face-the-Internet/blob/master/docs/exhibition.png)

### Introduction
This project sits somewhere between sculpture, technology, art, motion graphic design and interactivity. An experiment, as much as a learning exercise, to combine the latest technologies for application development with thoughts on contemporary art, computer vision and user interaction.

## Installation
Before you start you will need the following installed on your machine. [Python](https://www.python.org/) & `:/pkg-config` need installing with Brew. If you are using the [compose repository](https://github.com/eduwass/face-the-internet-docker-compose), Docker will install these dependencies for you also.

### Quick Install (Client)
1. Clone [this](https://github.com/JohnPett/Face-the-Internet) repository in to the desired location on your local machine.
2. From inside the repository, run `$ npm install` to get project dependencies.
3. Once the dependencies have installed, running `$ npm start` will initiate the server and application and run a development version of the application on `http://localhost:3000/`.


### Quick Install (API)
1. This project has a separate Docker container for the API calls for image slices. There are install notes for this [here](https://github.com/eduwass/face-the-internet-worker).
2. To compose the server and client together in to a multi-container Docker setup, there is a further repository and installation notes [here](https://github.com/eduwass/face-the-internet-docker-compose).

### Detailed Install

##### OpenCV
1. [OpenCV](http://opencv.org/) needs to be installed on Mac OSX through a package manager. For this we have used [Brew](http://brew.sh/), but there are other options available. You can find install instructions for Brew [here](http://brew.sh/).
2. To install [OpenCV](http://opencv.org/), once you have [Brew](http://brew.sh/), follow these commands: `$ brew tap homebrew/science`, followed by `$ brew install opencv`.
3. Once this is installed, you will need the Node bindings to allow for interfacing with Javascript. There are a few options online, bu this project uses [this](https://www.npmjs.com/package/opencv) example. To install the bindings, run `$ npm install opencv --save` from the root of the project directory. For more information on this, please see [Peter Braden's Github repository](https://github.com/peterbraden/node-opencv).

##### Express + Websockets
To take advantage of real-time face recognition and giving instant feedback to the user, this project uses websockets. [Express.io](http://express-io.org/) provide the solution to client and server interactions, which you can install as an `npm-module`, you can find further information [here](https://www.npmjs.com/package/express.io).

##### React
[React](https://facebook.github.io/react/) is a relatively new tool to help create interfaces in JavaScript. In addition it cares very little about the rest of the of your stack, making it perfect for a project like this.

#####The MIT License (MIT)

Copyright (c) 2016 John Pett

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.