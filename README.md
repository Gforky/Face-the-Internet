![B-Reel](https://raw.githubusercontent.com/B-Reel-Barcelona/boilerplate/master/extras/breel.png?token=AAevfCrazIjTNTT-oxsdw5bFygx83w_Lks5VXZbRwA%3D%3D)

# Boilerplate 2

## Quick start

### Setup your editor

The `.editorconfig` file define and maintain consistent coding styles between different editors and IDEs. Download and install a plugin for you prefered editor:

[Sublime Text](https://github.com/sindresorhus/editorconfig-sublime) | [Webstorm](https://www.jetbrains.com/webstorm/help/configuring-code-style.html#d638326e186) | [Atom](https://atom.io/packages/editorconfig)

### Requirements

- Install [Node.js](http://nodejs.org/download/) (required)
- Install [Gulp](http://gulpjs.com/) (required)

	```sh
	$ sudo npm install -g gulp
	```
1. Create your own project

	```sh
	$ mkdir my_new_project
	$ cd my_new_project
	$ git init .
	```
2. Fetch the boilerplate content

	```sh
	$ git remote add boilerplate https://github.com/B-Reel-Barcelona/boilerplate.git
	$ git fetch boilerplate
	$ git checkout -b master boilerplate/master
	$ git remotes remove boilerplate
	```
3. Fetch dependencies and start coding!

	```sh
	$ npm install # maybe with sudo
	$ npm start
	```
4. Open a browser and navigate to [http://localhost:3000/]()

## Compile the project

```sh
$ cd my_new_project
$ node --stack-size=32000 ./node_modules/gulp/bin/gulp compile
```

## What's included?
### Main folder structure

```sh
boilerplate/
	extras/
		docs/						# application documentation
		deploy/						# scripts for deployment
	node_modules/					# node modules & browserify modules
		framework/ 	    			# B-Reel JS BCN Framework git module
	src/
		app/
			core/
				Application.js		# setup all the stuff together
				Global.js			# you can put global vars here, like a singleton class.
				Model.js			# contains the config, can be used to store common data
				Router.js			# basic router for your app
			views/
				_layout.ejs			# is the container for your views
				Layout.ejs			# basic template for your app
				Layout.js			# basic logic for common ui elements
				Views.js			# you can use it as a common place to reference all the views
			app.js 		    		# entry point for your application
		assets/						# app assets
		css/						# compiled css files
		en/							# english specific resources
		es/							# spanish specific resources
		icons/						# apple icons
		javascript/					# concatenated javascript libraries
			vendor/					# other javascript libraries
			vendor.js				# concatenated javascript libraries
		scss/						# uncompiled scss files
	.git
	.gitignore
	.gitmodules						# reference to framework repository
	.jshintrc						# jshint configuration
	server.js						# express.js server app
	gulpfile.js						# automated tasks (compilation, copy convert, etc)
	package.json					# manifest file / server libs
	paths.js						# contains important paths of our app
	README.md						# this file
```
## Tech

kind|name|url
---|---|---
static|**harp**|[http://harpjs.com/]()
template|**ejs**|[http://www.embeddedjs.com/]()
css|**SASS**|[http://sass-lang.com/]()
javascript|**Browserify**|[http://browserify.org/]()
javascript|**Backbone**|[http://backbonejs.org/]()
javascript|**Marionette**|[http://marionettejs.com/]()
docs|**JSDoc**|[https://github.com/jsdoc3/jsdoc]()
test|**Mocha**|[http://visionmedia.github.io/mocha/]()
server|**Node.js**|[http://nodejs.org/]()

## Automatization
- [**npm**](https://www.npmjs.org/) Used to install the latest node libs ( Back-end )
- [**gulp**](http://gulpjs.com/) Automate tasks the easy way

## Resources
- [Awesome JAVASCRIPT](https://github.com/sorrycc/awesome-javascript)
- [Awesome NODE](https://github.com/sindresorhus/awesome-nodejs)

## Automatization  (outdated)

#### Update Copies  (outdated)

1. Go to file in [Google Drive](https://docs.google.com/a/b-reel.com/spreadsheets/d/xxxxxx).
2. Download the first tab xxxx
3. Place them on `<project-path>`.
4. Execute the following:

	```sh
	$ gulp copies # to update the regular copies.
	$ gulp copies_inspiration # to update the inspiration copies.
	```
5. The files will be placed at `<project-path>/client/data/copy.json` and `<project-path>/client/data/inspiration.json`.