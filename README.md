# imgUploader.io

* This is a social image-sharing site developed using **MEAN** technologies.
* This app is designed to run in multile ways.

## Overview

![index](/img/index.png)

![images](/img/images.png)

## Running this app

This app is designed to be run in different ways:

1. As a standalone app running on your machine.


## I. As a standalone app running on your machine

1. run `git clone https://github.com/AhmNouira/imgUploader.io` to clone the GitHub repository.
2. `cd imgUploader.od` cd to **imgUploader** folder.
3. install [node.js](https://nodejs.org/en/download/) or run `sudo apt-get install nodejs`.
4. run `node -v && npm -v` to check if **nodejs** and **npm** are installed and prints their versions.
5. install the app dependices by running `npm install`.
7. install [MongoDB](https://www.mongodb.com/) database `sudo apt-get install mongodb`.
8. run `mongo` and see if your database is installed.
9. to run the server `npm start`.

![start_server](/img/start_server.png)

#### About data in the database ?
* open your Terminal and following commands
```javascript

mongo 			// open mongoDB shell

show dbs 			// display your databases 

use imgUploaderDB		// select the application database 

db.printCollectionStats() 	// print the stats of the db collections

db.images.find().pretty()    	// **display the images collections data**

db.comments.find().pretty()	// **display the comments collections data**

``` 

 
