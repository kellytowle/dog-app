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
* NPM scripts for running/testing/building (minified/prod)

In addition to Create React App, I have explicitly brought in the
following libraries/modules:
* [react-test-renderer](https://www.npmjs.com/package/react-test-renderer) -
 Used as a tool for rendering custom React components either to JSON or
 as a mock DOM for unit testing. **Note:** were this a "real" project, I
 would likely refactor in favor of using [Enzyme](http://airbnb.io/enzyme/)
 for much of this functionality instead, as that seems to be more of a de
 facto standard within the React community, with more answers and detailed
 documentation available online.
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

After cloning this repository you will need to ensure that you have NPM
and Node.js installed locally, and then run `npm i` in the root directory
of the cloned repository

## Commands
### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br>

Additionally, I have checked in a run configuration for use in JetBrains
IDEs (WebStorm, PhpStorm, IntelliJ, etc.) located [here](https://github.com/kellytowle/dog-app/tree/master/.idea/runConfigurations/Jest.xml)

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for
the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

## Assignment 3
>Describe the developer experience you envision for others building in
this project

* **Be mindful of where state is maintained** - you'll notice that the
top-level `<BreedApp />` and screen-level `<DogBreed />` components both
maintain `state` properties, however the `<BreedsList />` component does
not.  This was deliberately done, because:
    * the list of dog breeds does not change after the initial list has
    been fetched & rendered
    * `<DogBreed />` **only** maintains state for the sake of being able
    to declaratively cycle through _all_ photos of a breed before seeing
    repeated photos (i.e. it needs to know the current photo index for the
    currently-selected breed); if the photo selection were to be _random_,
    this component could/should be made stateless like `<BreedsList />`.

* **Do not share state properties across multiple components** - While both
`<BreedApp />` & `<DogBreed />` maintain some state properties, they are
mutually exclusive from one another and explicitly scoped to that module.
For example, the `<BreedApp />` component really has no need to keep track
of all the photo urls that have been fetched for all the different breeds,
and similarly the `<DogBreed />` has no use for the original JSON list
of breeds that was fetched to populate the `<BreedList />` component.

* As mentioned in [Assignment 1](#assignment-1), ideally any additional
modules should be carefully considered (cost vs. benefit) before being
added to the project.

* **Testing as much as is possible/reasonable** - While working on the
tests for this project I noticed some differing opinions about the
validity of testing a component's `state`; the most convincing criticism
I encountered was someone pointing out that the internal mechanisms
of components are implementation details, and as such should **not** be
tested since a later refactor could break several test assertions.
While I could argue this point either way, I would say that I'm in favor
of testing component `state`, since it:
    * increases test coverage, leaving less opportunity for surprises in
    production
    * ensures that tests and backward compatibilty stay on developer's
    minds, as they must be kept up to date over time lest they break
    after a refactor

## Assignment 4
>Implement a pattern for unit testing

While not fully completed, there are tests created for both the `<BreedApp />`
and `<BreedsList />` components.

The primary focus of the tests, both present and continued, should focus on:

* **Component props** - testing the affects, if any, that different `props`
values have on the rendered component
* **Component type** - testing whether the component is a functional component
or manages state
* **Component interfaces** - testing areas where a parent's `state` property
becomes a child component's `prop` value
* **State** - testing where, when, and to what effect that `state` properties
are set (either internally or external to the module being tested)
* **DOM structure** - While perhaps not _imperative_, testing the presumed
DOM structure via unit tests allows for catching any UI bugs without the
overhead of slower and more verbose technologies (i.e. Selenium-based
automation), however the presence of these tests should **not** be taken
as license to avoid automated UI integration testing altogether.