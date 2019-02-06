

# Workbench for Openpilot
Workbench is a desktop application to help you manage your Comma EON(s) as well as assisting with installing Openpilot.
It also has a goal of providing easier porting of new vehicles.

<!-- ![](https://opc.ai/assets/workbench-readme-splash.png)
[![Travis](https://img.shields.io/travis/openpilot-community/workbench.svg?style=flat-square&label=Travis+CI)](https://travis-ci.org/openpilot-community/workbench)
[![CircleCI](https://img.shields.io/circleci/project/openpilot-community/workbench/desktop.svg?style=flat-square&label=CircleCI)](https://circleci.com/gh/openpilot-community/workbench)
![AppVeyor Build status](https://ci.appveyor.com/api/projects/status/ow6duui01jcsag3l?svg=true)
[![Build status](https://ci.appveyor.com/api/projects/status/ow6duui01jcsag3l?svg=true)](https://ci.appveyor.com/project/jfrux/workbench) -->

[![license](https://img.shields.io/github/license/openpilot-community/workbench.svg)](https://github.com/openpilot-community/workbench/blob/master/LICENSE)

### Help fuel development!

Think you can spare $1/month to support the open source efforts of Workbench and The Openpilot Community?<br />
We receive **zero funding** from any commercial entity and all our code is MIT licensed so every little contribution helps...<br />
Consider becoming a Patreon supporter and help us support you!

<a href="https://www.patreon.com/bePatron?u=9861134" ><img src="https://c5.patreon.com/external/logo/become_a_patron_button.png" width="120" /></a>

The Openpilot Community nor any of its contributors are funded by Comma.ai, Inc. or any other commercial entity.
Your support is all we have.  Growing expenses with opc.ai, cloud hosting, and costs running great services for the community is not free.
If you have a few bucks, please consider [becoming a patreon](https://patreon.com/openpilotcommunity) for the Openpilot Community and support further uptime and dev time.  Finances will be out in the open on the patreon page for everyone to see.

https://patreon.com/openpilotcommunity

## Getting Started

### [Download Workbench](https://opc.ai/workbench)

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

Regardless of the platform you are working on, you will need to have Yarn installed. If you have never installed Yarn before, you can find out how at: https://yarnpkg.com/en/docs/install.

1. Install necessary packages:
  * Windows
    - Be sure to run  `yarn global add windows-build-tools` to install `windows-build-tools`.
  * macOS
    - Once you have installed Yarn, you can skip this section!
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
3. Install the dependencies: `yarn`
4. Build the code and watch for changes: `yarn run dev`
5. Note: You may have to run `yarn run package` once before to get the node-pty binaries in place.
6. Checkout a new branch for your feature... something like `feature/what-is-it` or `bugfix/the-fix-for-something`
7. Push your change up to GitHub and create a Pull Request to merge your new feature / bugfix branch into the master branch.

To make sure that your code works in the finished application, you can generate the binaries like this:

```bash
yarn run package
```

After that, you will see the binary in the `./releases` folder!

#### Known issues that can happen during development

##### Error related to `node-pty-prebuilt`

If after building during development you get an alert dialog related to `node-pty` issues,
make sure its build process is working correctly by running `yarn run package`.

##### Error with `codesign` on macOS when running `yarn run dist`

If you have issues in the `codesign` step when running `yarn run package` on macOS, you can temporarily disable code signing locally by setting
`export CSC_IDENTITY_AUTO_DISCOVERY=false` for the current terminal session.

## Bug Reports / Feature Requests

Feel free to create issues for feature requests and/or bugs.

## License
MIT
