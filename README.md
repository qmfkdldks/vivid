# Vivid-Editor

> Animated text editor for building living text content

[![NPM](https://img.shields.io/npm/v/vivid-editor.svg)](https://www.npmjs.com/package/vivid-editor)

![Vivid Editor](https://i.imgur.com/AO0RQLO.gif)

Have you ever imagined a book that has words moving around and expressing their meaning visually through animation?
Here we present a new text editor solution where end-users can write and read animated text contents.

This package is backed by [slate.js](https://github.com/ianstormtaylor/slate)

# Install

```bash
npm install --save vivid-editor
or
yarn add vivid-editor
```

# Quick Start

```jsx
import React from "react";
import { Editor } from "vivid-editor";

const App = () => {
  const onChange = React.useCallback((value) => {
    // When text content changes it will get called.
    // Save the value to Local Storage.
    const content = JSON.stringify(value);
    console.log(content);

    localStorage.setItem("content", content);
  }, []);

  return (
    <div>
      <Editor onChange={onChange} />
    </div>
  );
};
```

# Documentation

Check out the documentation. Upcoming...

# Changelog

## 1.1.0

- Add customizable theme feature
- Add onChange props that reacts to the content change
- Button and color style updates

# Contribution

We actively welcome pull requests.
Especially we need more innovative text animations!

## Main Package

```bash
git clone git@github.com:qmfkdldks/vivid-editor.git
cd vivid-editor
git checkout -b new-feature
yarn install
yarn start // This line will start watching any changes and update the package locally
-- Add new feature using your favorite code editor --
yarn test // This will run lint also. If you find any error, please fix test and lint issue before you create new pull request in github.io
git add .
git commit -m "A brief commit message with no dot"
git push origin new-feature // Later you create new pull request in github. (May be you should do git rebase before opening new pull request)
```

## Development App (Next.js)

Open new console (tab) to run development app.
Dev app imports local vivid-editor package. So when you change main src, you will see the change in the next app.

```bash
cd dev
yarn install
yarn dev // This line will start local next app which imports vivid-editor package
```

## Landing Page & Documentation (Next.js)

This page is for documentation and demos. It uses public vivid-editor package.

```bash
cd landing
yarn install
yarn dev
```

# Folder structure convention

### Animation

When you create new text animation
Every component should have following files

```
new-component
├── index.js(x) // export a text animation component
├── story.jsx // at least one story
└── __tests__ // test folder
    └── index.js // should test different props
```

### Component

When you create new component
Every component should have following files

```
new-component
├── component.jsx
├── index.js(x)
├── story.jsx
└── __tests__ // test folder
    ├── component.js // should test the component
    └── index.js // should test external communication or data logic
```

component.jsx
shouldn't interact with api or external sources directly. Always get callbacks as props. This makes super easy to test the component

index.js:
here we preprocess necessary data and inject data as props to the component. Here we disconnect dependency between external data source with the vidual component

style.js:
export all styled object generated from styled-component. `component.jsx` imports styled objects. This way we no longer will have direct tag use in `component.jsx`

story.jsx:
component specific storybook implementation. You should add different stories for the component to simulate different situations. Highly recommended to use [addons](https://storybook.js.org/addons/)

# Lint

We recommend you to use `yarn lint` before pushing new feature branch to remote git server

## License

MIT
