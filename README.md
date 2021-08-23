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

The project is application extension from the course ["Kurs React - W Praktyce"](https://eduweb.pl/programowanie-i-www/reactjs/react-w-praktyce) (en."React Course - in Practice") by [Adam Romanski](https://helloroman.pl/). I continued the course up to tag 0.15.0 (more about tagging [here](https://github.com/pawelrusak/react-note-app/tree/develop#tagging)). My main motivation for taking up the course was it's very smart UI design and interesting idea for application, which I thought showed a great potential for introducing new features (types of functionality) and technologies. However, at the end of tne course only some of the designed types of functionality worked.

## The course code changes

I followed the instructions of the author of the course up to the 0.15.0 tag with some exceptions such as the use of Firebase and Storybook 6, which I marked using special convention for commit messages - more about commit messages [here](https://github.com/pawelrusak/react-note-app/tree/develop#commit-messages). Later on, however, I modified almost all of the source code presented during the course and it was before I started implementing new types of functionality. Major changes include:

- writing tests for the entire application using the [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/) - which I tried to do before making any changes to the source code. That in return, gave me more confidence and helped protect myself from bugs during later modifications.
- writing the stories for each component by using the [Storybook 6](https://storybook.js.org/docs/riot/get-started/introduction) - The course included StoryBook related content, but it used the deprecated API of Storybook 5, so I had to write it from scratch.
- the use of various Firebase services - because the author of the course used his own back-end implementation
- the use of [Functional Components](https://reactjs.org/docs/components-and-props.html#function-and-class-components) along with the [Hooks](https://reactjs.org/docs/hooks-intro.html) instead of the Class Components used during the course. The course did not introduce the Hooks.
- migration from JavaScript to [TypeScript](https://www.typescriptlang.org/) - Like the tests mentioned before, this also helps avoid potential bugs, and even find existing bugs in the course source code.
- migration from [Redux](https://react-redux.js.org/introduction/getting-started) to [Redux Toolkit](https://redux-toolkit.js.org/introduction/getting-started) - which allowed me to reduce the code boilerplate and simplify the application.
- replaced the [HOC](https://reactjs.org/docs/higher-order-components.html) from the course by writing the custom Hooks

and more...

You can preview the changes I have made by comparing the code from the [latest commit](https://github.com/pawelrusak/react-note-app/tree/develop) (branch develop) up to the [0.15.0 tag](https://github.com/pawelrusak/react-note-app/tree/v0.15.0) - which is the tag that ends up the course - or with the [original source code](https://github.com/eduwebpl/kurs-react-w-praktyce).

### Commit messages

I follow by the [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) specification in my commit messages, which are structured as follows:

```
<type>(scope): <description>

[optional body]

[optional footer(s)]
```

However in my case I used the word "my" in `scope` only when I did something on my own during the course, like connecting Firebase API or creating stories of StoryBook 6, because the course didn't cover that. I used this solution up to the Tag 0.15.0. All the following commits even if they didn't have a "my" in the "scope" were written by me, too.

### Tagging

I have tried using tags in the MAJOR.MINOR.PATCH convention, suggested in ["Semantic Versioning"](https://semver.org/), guided by the changes from the user's perspective. For example, I increased the "MINOR" version when adding new user functionality, like possibility to create new notes, or implementing a counter for a specific type of items.

### Used technologies

In the project I used the following libraries and tools:

- [React 17](https://reactjs.org/blog/2020/10/20/react-v17.html),
- React Hooks (migration from Class Component),
- [React Router](https://reactrouter.com/)
- Redux Toolkit (migration from Redux)
- [Styled Components](https://styled-components.com/docs/basics#getting-started)
- Typescript (migration from JavaScript)
- [Formik](https://formik.org/) with [Yup](https://github.com/jquense/yup#yup)
- [ESLint](https://eslint.org/docs/user-guide/getting-started) and [Prettier](https://prettier.io/docs/en/index.html)
- [Husky](https://typicode.github.io/husky/#/) 6 with [lint-staged](https://github.com/okonet/lint-staged#-lint-staged----)
- [Firebase Authentication](https://firebase.google.com/docs/auth) and [Cloud Firestore](https://firebase.google.com/docs/firestore)
- [Storybook 6](https://storybook.js.org/)

and more...

## Features

Up to the [version 0.15.0](https://github.com/pawelrusak/react-note-app/tree/v0.15.0) of the application, the following functions have been implemented:

- ability to create, browse and delete only twitter types notes,
- detail page for notes, tweets and articles,
- the changing color of the page depending on the currently displayed note type
- The form panel for creating new notes, that can be closed and opened, changing the form fields depending on the type of notes you are viewing,
- the login page with sign-in form
- the ability to log in for the already registered user (new accounts must be manually entered into the database)
- the registration page with the sign-up form (not connected to the api so as to register a user)

After [version 0.15.0](https://github.com/pawelrusak/react-note-app/tree/develop) the following features have been implemented (or are in progress):

- [x] ability to create, view and delete items, also for basic notes and articles,
- [ ] ability to filter by characters of the item content, also using URLs for better navigation (notes, tweets, articles),
- [x] the item counter (notes, tweets, articles),
- [x] documents titles for pages
- [x] form validation for login and registration, with the error handling from the server (e.g. email is busy), taking care at the same time of UX (clear error messages, blocking the submit button when the form contains errors, basic accessibility)
- [x] ability to register new accounts through the form on the registration page,
- [x] maintaining session after logging-in
- [ ] form validation when creating new items (notes, twitts, articles) with error handling from the server. With[UX](https://pl.wikipedia.org/wiki/User_experience) in mind,
- [ ] version for mobile (Responsive Web Design)

\* if the box is not checked, it means the work is in progress

## License

Licensed under the MIT License. See [LICENSE](./LICENSE) for more information.
