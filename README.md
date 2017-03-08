#Steam Controller GUI

[![Greenkeeper badge](https://badges.greenkeeper.io/TheSeg/SteamController-GUI.svg)](https://greenkeeper.io/)

[![Stories in Ready](https://badge.waffle.io/theseg/steamcontroller-gui.png?label=ready&title=Ready)](https://waffle.io/theseg/steamcontroller-gui)
[![Build Status](https://travis-ci.org/TheSeg/SteamController-GUI.png?branch=develop)](https://travis-ci.org/TheSeg/SteamController-GUI)
[![Dependency Status](https://gemnasium.com/TheSeg/SteamController-GUI.png)](https://gemnasium.com/TheSeg/SteamController-GUI)
[![Bitdeli Badge](https://d2weczhvl823v0.cloudfront.net/TheSeg/steamcontroller-gui/trend.png)](https://bitdeli.com/free "Bitdeli Badge")
[![Built with Grunt](https://cdn.gruntjs.com/builtwith.png)](http://gruntjs.com/)


A GUI for creating Steam Controller configurations. This project is **NOT** affiliated with Valve Software.

## Running Steam Controller GUI locally
This is not required as the [Steam Controller GUI website](http://theseg.github.io/SteamController-GUI) will serve most of your needs. But if you wish to develop locally or want to see how this all works, you're more than welcome to do so!

First, clone a copy of this repository to your local machine.

From there you'll need to setup with Gem Bundler, NPM, and Bower.
```bash
bundle install
npm install
bower install
```

With your local setup ready, you can now run files via a local [Jekyll](http://jekyllrb.com) server using Grunt tasks already included into the package:

```bash
grunt server
```

The defaults will run the website on http://localhost:4000/. This can be modified for your preferences based on Connect settings in `gruntfile.js`.
