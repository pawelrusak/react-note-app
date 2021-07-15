<p align="center"><img src="https://raw.githubusercontent.com/pawelrusak/react-note-app/851af0930676810310cac0c0e39832b03580d972/logo.svg" height="150" alt="FAV Note."><p>
  
# FavNote. - React app to help you master your notes

FavNote. is the application that enables you to conveniently browse, create, remove and filter several content types like notes, favorites twitts or interesting articles and get back to the them later whenever you want.

## Getting started

**Obsolete! Will be updated soon!**

Build using [NPM](https://www.npmjs.com/get-npm) scripts. The following scripts are available:

- `start` - starts the development server,
- `build` - bundles the app into static files for production,
- `test` - starts the test runner,
- `eject` - removes this CRA tool and copies build dependencies, configuration files
  and scripts into the app directory. **If you do this, you can’t go back!**,
- `storybook` - start the component explorer,
- `build-storybook` - bundles the component explorer,

This project was bootstrapped with [Create React App](https://create-react-app.dev/).

## About the project

The project is application extension from the course ["Kurs React - W Praktyce"](https://eduweb.pl/programowanie-i-www/reactjs/react-w-praktyce) (en."React Course - in Practice") by [Adam Romanski](https://helloroman.pl/). I continued the course up to tag 0.15.0 (more about tagging [here](https://github.com/)). My main motivation for taking up the course was it's very smart UI design and interesting idea for application, which I thought showed a great potential for introducing new features (types of functionality) and technologies. However, at the end of tne course only some of the designed types of functionality worked.

## The course code changes

I followed the instructions of the author of the course up to the 0.15.0 tag with some exceptions such as the use of Firebase and Storybook 6, which I marked using special convention for commit messages / I used to use this technique and I still do/ - more about commit messages [here](https://github.com/).Later on, however, I modified almost all of the source code presented during the course and it was before I started implementing new types of functionality. Major changes include:

- writing tests for the entire application using the [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/) - which I tried to do before making any changes to the source code. That in return, gave me more confidence and helped protect myself from bugs during later modifications.
- writing the stories for each component by using the [Storybook 6](https://storybook.js.org/docs/riot/get-started/introduction) - The course included StoryBook related content, but it used the deprecated API of Storybook 5, so I had to write it from scratch.
- the use of various Firebase services - because the author of the course used his own back-end implementation
- the use of [Functional Components](https://reactjs.org/docs/components-and-props.html#function-and-class-components) along with the [Hooks](https://reactjs.org/docs/hooks-intro.html) instead of the Class Components used during the course. The course did not introduce the Hooks.
- migration from JavaScript to [TypeScript](https://www.typescriptlang.org/) - Like the tests mentioned before, this also helps avoid potential bugs, and even find existing bugs in the course source code.
- migration from [Redux](https://react-redux.js.org/introduction/getting-started) to [Redux Toolkit](https://redux-toolkit.js.org/introduction/getting-started) - which allowed me to reduce the code boilerplate and simplify the application.
- replaced the [HOC](https://reactjs.org/docs/higher-order-components.html) from the course by writing the custom Hooks

and more...

You can preview the changes I have made by comparing the code from the [latest commit](https://github.com/pawelrusak/react-note-app/tree/develop) (branch develop) up to the [0.15.0 tag](https://github.com/pawelrusak/react-note-app/tree/v0.15.0) - which is the tag that ends up the course - or with the [original source code](https://github.com/eduwebpl/kurs-react-w-praktyce).

## License

Licensed under the MIT License. See [LICENSE](./LICENSE) for more information.
