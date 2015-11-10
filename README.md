# Introduction

## Installation

1. [Install Docker](http://docs.docker.com/engine/installation/mac/), and all of the accompanying tools. As this was built on Mac OSX, these instructions are for recreating this project on this platform.

2. Once everything is installed on your machine, you will need to make this a [Node.js](https://nodejs.org/en/) environment, which you can do by first creating a new `docker-machine`. Docker comes with a `default` machine, but let's make a `dev` one, to understand the process. To do this, use the following command: `docker-machine create --driver virtualbox dev` 