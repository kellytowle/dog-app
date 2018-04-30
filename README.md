This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app); the
boilerplate readme file is located [here](https://github.com/kellytowle/dog-app/tree/master/_boilerplate).

Commands for testing / viewing locally can be found at the [bottom of this file](#commands).

## Homework Assignment
1. [Explain your reasoning for including any third party projects.](#assignment-1)

1. [Explain any build steps](#assignment-2)

1. [Describe the developer experience you envision for others building in this project](#assignment-3)

1. [Implement a pattern for unit testing](#assignment-4)

## Assignment 1
>Explain your reasoning for including any third party projects.

The core of this project is [Create React App](https://github.com/facebookincubator/create-react-app),
 which automatically provides:
* React
* Jest
* NPM scripts for running/testing/building

In addition to Create React App, I have explicitly brought in the
following libraries/modules:
* [react-test-renderer](https://www.npmjs.com/package/react-test-renderer) -
 Used as a tool for rendering custom React components either to JSON or
 as a mock DOM for unit testing; were this a "real" project, I would
likely opt for [Enzyme](http://airbnb.io/enzyme/) for much of this
functionality instead, as that seems to be more of a de facto standard.
* [prop-types](https://www.npmjs.com/package/prop-types) - Used as a
soft-validation of component `props` and `state`. This used to be part
of the React core, but has since been removed and created as a unique
module.

### Rationale
Generally speaking, my default position is to avoid bringing in 3rd party
modules if possible.  Each module that I've brought in serves a specific
 function, and each of them provides a great deal of value compared to
 the effort it would take to replicate their functionality myself.

A good example of _not_ bringing modules unnecessarily is the absence of
**Bootstrap** or similar UI framework within this repository, as simple
styling can efficiently be done by hand for such a small project.

**However**, should the assignment have called out the need for something
like a carousel module for viewing photos, I absolutely would have included
Bootstrap in this project (a first-pass on a carousel UI isn't terribly
difficult, but the time spent on making it bullet-proof is not time well
spent when Bootstrap has already done that work).

## Assignment 2
>Explain any build steps


## [Commands]
### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br>


### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!