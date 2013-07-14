greenlight
==========

A data-centric web platform built on top of mongodb.

# Source layout

-> src - Source directory
--> greenlight - Meteor source for the website
---> client - client side
---> server - server side
---> public - public dependencies
--> third-party - third party libraries / dependencies
-> docs - documentation

# Getting Started

To run the project, you'll need to have mongodb installed and you'll need to run meteorite / meteor.  You'll also need node / npm installed.

## Install Meteorite

Instructions for installing meteorite are available from https://github.com/oortcloud/meteorite.

Short version, do this -

``` sh
npm install -g meteorite
```

## Install Meteor

Instructions for installing meteor are available from https://github.com/meteor/meteor

Long story short, do this -

``` sh
curl https://install.meteor.com | /bin/sh
```

## Update the meteorite dependencies

``` sh
mrt update
```

## Run the Meteor server

In the src/greenlight directory, run the command "meteor".  This will launch the server listening at http://localhost:3000