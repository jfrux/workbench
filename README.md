
# [Workbench](https://opc.ai/workbench)
<!-- [![Travis](https://img.shields.io/travis/openpilot-community/workbench.svg?style=flat-square&label=Travis+CI)](https://travis-ci.org/openpilot-community/workbench)
[![CircleCI](https://img.shields.io/circleci/project/openpilot-community/workbench/desktop.svg?style=flat-square&label=CircleCI)](https://circleci.com/gh/openpilot-community/workbench)
![AppVeyor Build status](https://ci.appveyor.com/api/projects/status/ow6duui01jcsag3l?svg=true) -->
[![license](https://img.shields.io/github/license/openpilot-community/workbench.svg)](https://github.com/openpilot-community/workbench/blob/master/LICENSE)


Workbench is a desktop application to help you manage your Comma EON(s) as well as assisting with installing Openpilot.
It also has a goal of providing easier porting of new vehicles.

> It's in its infancy so it doesn't actually fulfill that mission above quite yet but it's getting better by the day.

## Usage

Download the latest version from the links below.
- [Windows](https://github.com/openpilot-community/workbench/releases/latest)
- [Mac OS](https://github.com/openpilot-community/workbench/releases/latest)
- [Ubuntu / Debian](https://github.com/openpilot-community/workbench/releases/latest)

### Usage
> IMPORTANT: Workbench manages your EON over SSH.  You must enable SSH in your Settings on EON.

# Features

- [x] Connects to EON via SSH (automatically, installs key for you)
- [x] Displays Thermal
- [x] Displays Health
- [x] Displays GPS Location Info
- [x] Installs a basic API to EON for more accurate data fetching. (see `workbench_api` directory)
- [x] Can scan network for EON and find it quickly
- [x] Retrieves fingerprint and places it in a textbox.

## Todos Pipeline

- [ ] Check if Panda is flashed
- [ ] Output if Vehicle Detected by Fingerprint
- [ ] A general "health" check view to make it easier to know if things are okay.

## Ideas / Concepts

- [ ] Add addl tools as we see fit...
- [ ] Install a fork of Openpilot from a git url
- [ ] Reinstall Comma Openpilot Release2
- [ ] Backup videos
- [ ] Review videos
- [ ] Monitor uploads

## Contributing

If you have React / Electron experience, I'd love to merge PRs asap!

## Bug Reports / Feature Requests

Feel free to create issues for feature requests and/or bugs.

## License
MIT