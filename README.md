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

A simple, but very functional application that allows the creation of various types of notes, secure storage, and easy management. Additionally, the application features an elegant user interface that ensures a high-quality user experience.

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

## Acknowledgments

The following list contains acknowledgments for individuals and organizations who had a significant impact on the project:

- Adam Romański - for the project idea and permission to publicly use it in my repository, as well as for allowing the use of their application design.

## License

Licensed under the MIT License. See [LICENSE](./LICENSE) for more information.
