

# Workbench for Openpilot
Workbench is a desktop application to help you manage openpilot driving agent running on a compatible Android device.
It also has a goal of providing easier porting of new vehicles.

<!-- ![](https://opc.ai/assets/workbench-readme-splash.png)
[![Travis](https://img.shields.io/travis/openpilot-community/workbench.svg?style=flat-square&label=Travis+CI)](https://travis-ci.org/openpilot-community/workbench)
[![CircleCI](https://img.shields.io/circleci/project/openpilot-community/workbench/desktop.svg?style=flat-square&label=CircleCI)](https://circleci.com/gh/openpilot-community/workbench)
![AppVeyor Build status](https://ci.appveyor.com/api/projects/status/ow6duui01jcsag3l?svg=true)
[![Build status](https://ci.appveyor.com/api/projects/status/ow6duui01jcsag3l?svg=true)](https://ci.appveyor.com/project/jfrux/workbench) -->

[![license](https://img.shields.io/github/license/openpilot-community/workbench.svg)](https://github.com/openpilot-community/workbench/blob/master/LICENSE)

*For Support with Workbench, connect with me on the [Workbench Discord Channel](https://discord.gg/EvqPbw).*

## Getting Started

### [Download Workbench](https://github.com/jfrux/workbench/releases)

> IMPORTANT: Workbench manages your EON over SSH.  You must enable SSH in your Settings on EON.

## Features

- [x] Scans your network for your EON so you don't need to find the IP.
- [x] Connects to EON via SSH (and automatically, installs SSH key for you)
- [x] Dumps you into an SSH shell connection to your EON with one click.
- [x] Has tabs for all of the various ZMQ messages sent in real-time over wifi from EON.
- [x] Automatic task scripts for EON configuration / maintenance.
- [x] Reinstall Comma Openpilot Release2

## Upcoming Concepts / Features

- [ ] Built-in Openpilot / EON IDE (code editor)
- [ ] Real-time tuning
- [ ] Backup videos
- [ ] Review videos
- [ ] Monitor uploads

## For Workbench Developers

1. Install necessary development dependencies:
  * Windows
    - Install `windows-build-tools`
    `npm install -g windows-build-tools`
  * macOS
    - Install xcode build tools: 
      `xcode-select --install`
    - Install Homebrew if you don't have it. 
      `/usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"`
    - Install `nvm` or nodenv or some sort of nodejs version manager.
    - Now install zmq
      `brew install zmq`
  * Linux(You can see [here](https://en.wikipedia.org/wiki/List_of_Linux_distributions) what your Linux is based on.)
    - RPM-based
        + `GraphicsMagick`
        + `libicns-utils`
        + `xz` (Installed by default on some distributions.)
    - Debian-based
        + `graphicsmagick`
        + `icnsutils`
        + `xz-utils`
2. [Fork](https://help.github.com/articles/fork-a-repo/) this repository to your own GitHub account and then [clone](https://help.github.com/articles/cloning-a-repository/) it to your local device
3. Change to the newly cloned directory `cd workbench`
4. Install a version of nodejs with `nvm` or your node version manager.
   `nvm install 8.14.0` is the version I recommend.
   `nvm use 8.14.0`
5. Install python 2.7.15 with `pyenv` or `asdf `.
   `pyenv install 2.7.15` and set the current directory with `pyenv local 2.7.15`
6. Move to the cloned directory and install the dependencies: 
  `npm run setup`
7. Build the code and watch for changes:
  `npm run dev`
8. Checkout a new branch for your feature... something like `feature/what-is-it` or `bugfix/the-fix-for-something`
9. Push your change up to your own GitHub fork and create a New Pull Request to request your new feature / bugfix branch  be upstreamed into the master for inclusion in the next release.

To make sure that your code works in the finished application, you can generate the binaries like this:

```bash
npm run package
```

After that, you will see the binary in the `./releases` folder!

#### Known issues that can happen during development

##### Error related to `node-pty-prebuilt`

If after building during development you get an alert dialog related to `node-pty` issues,
make sure its build process is working correctly by running `yarn run package`.

##### Error with `codesign` on macOS when running `npm run dist`

If you have issues in the `codesign` step when running `npm run package` on macOS, you can temporarily disable code signing locally by setting
`export CSC_IDENTITY_AUTO_DISCOVERY=false` for the current terminal session.

## Bug Reports / Feature Requests

Feel free to create issues for feature requests and/or bugs.

## License
MIT

#### To run on Arch Linux

1. Download latest appimage
2. open terminal and cd /home/user/Downloads
3. chmod +x Workbenchxxx.appimage
4. ./Workbenchxxx
5. It will ask if you want to integrate the appimage into system, select no
