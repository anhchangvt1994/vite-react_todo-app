## First start

This project is a collection of two mini-projects include `SignIn / SignUp` and `Todo List`.

For more information about this project.

- You can read detail about advanced structure of Vite + React + TS project in this [repository](https://github.com/anhchangvt1994/vite-project--template-react-ts).
- You can read detail about router, suspense and some common utilities in this [repository](https://github.com/anhchangvt1994/vite-project--template-react-ts__react-router).

## Table of contents

1. [Install](#install)
2. [Tech stacks](#tech-stacks)

<h2 id="install">Install</h2>

##### Expect Node 18.x or higher

Clone source:

```bash
git clone https://github.com/anhchangvt1994/vite-react_todo-app.git
```

Install:

```bash
cd vite-react_todo-app
```

If use npm

```bash
npm install
```

If use yarn 1.x

```bash
yarn install
```

Install mockup-db:

```bash
cd mockup-db
```

If use npm

```bash
npm install
```

If use yarn 1.x

```bash
yarn install
```

Run preview:

```bash
cd mockup-db
npm run start
```

```bash
npm run build
npm run preview
```

<h2 id="tech-stacks">Tech stacks used in this project</h2>

- **react-router**: is used to manage the routing capabilities between pages.
- **react suspense**: is used to display a loader for asynchronous operations that require loading information, helping to enhance the user experience. In this application, suspense will be primarily used in the process of loading the `/pages` that are set up for lazy loading in the react-router definition and the `auto-login` process.
- **react context**: is used to manage the state in the ReactJS application. Specifically in this project, `react context` is used to manage the `todo list` and `toast list` information.
- **redux-toolkit (RTK)**: is used to manage the global state, making it easier to share state between components. (Obviously, RTK can completely replace react context, but I don't want to forget about react context).
- **redux-toolkit-query (RTK-query)**: is used to manage the API request process, including the request, cache, and cache invalidation.
- **react-hook-form**: is used to manage the interaction and handling of forms in the React application, making the form elements more consistent in terms of data handling and data types, which helps improve the performance of coding and form execution in the application.
- **yup**: is used to provide the definition for form validation, including valid value types, valid value formats, and error messages for each form element.
- **react portal**: is used to build sub-root components adjacent to the root component. React portal can support the construction of components that are separate from the root component in terms of display, which can make the display of sub-components easier as they are not affected by the CSS properties of the parent components.
- **styled-components** and **tailwind (daisy-UI)**: are used to build the layout.
