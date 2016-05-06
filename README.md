# Introduction
(This project was started from the go-starter-kit because I'm lazy when it comes to scaffolding projects)

Using React, redux and golang (echo for API) and a bunch of other stuff this project aims to serve as a fast UI to store information about build versions and when you ship/links to builds and documentation.

## Dependencies

* [golang](http://golang.org/)
* [node.js](https://nodejs.org/) with [npm](https://www.npmjs.com/), only to build the application bundle at compile time
* [GNU make](https://www.gnu.org/software/make/)
* [fswatch](https://github.com/emcrisostomo/fswatch/)
* [go-bindata](https://github.com/jteeuwen/go-bindata/)
* [srlt](https://github.com/olebedev/srlt)

## Stuff used

### Frontend
  - React
  - Redux
  - Redux-Thunk
  - Material-UI
  - React-Hemlet (because it's nice and simple :))

### Backend
  - Echo v1 (will move to v2 soon)
  - BoltDB (nice+simple embedded db)
  - Duktape (was in there but has been removed because server side rendering is only good in PROD after your bugs are fixed )

## Getting it set up

Clone the repo:
...
Install JavaScript dependencies:
```
$ npm i
```
Install Golang dependencies via revision locking tool - [srlt](https://github.com/olebedev/srlt). Make sure that you have srlt installed, environment variable `GO15VENDOREXPERIMENT=1` and _Golang_ >= 1.5.0. (preferably >= 1.6.0)
```
$ srlt restore
```
This command will install dependencies into `./vendor/` folder located in root.

Then install `go-bindata` directly: `go install github.com/jteeuwen/go-bindata`

## Let's do some dev!

Start dev server:

```
$ make serve
```

that's it. Open [http://localhost:5001/](http://localhost:5001/)(if you use default port) at your browser. Now you ready to start coding your awesome project.

## Let's ship it!

Install dependencies and type `NODE_ENV=production make build`. This rule is producing webpack build and regular golang build after that. Result you can find at `$GOPATH/bin`. Note that the binary will be named **as the current project directory**.

