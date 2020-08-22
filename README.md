# vivid

> animated text editor for building alive text content

[![NPM](https://img.shields.io/npm/v/vivid-editor.svg)](https://www.npmjs.com/package/vivid-editor)

[GIF which shows the editor]

Have you ever imagined a book that has words moving around and expressing their meaning visually via animation?

Here we present a new text editor solution where end-users can write and read animated text contents.
This package is backed by [slate.js](https://github.com/ianstormtaylor/slate)

## Install

```bash
npm install --save vivid-editor
or
yarn add vivid-editor
```

## Quick Start

```jsx
import React, { Component } from 'react'

import VividEditor from 'vivid'
import 'vivid/dist/index.css'

class Example extends Component {
  render() {
    return <VividEditor />
  }
}
```

# Documentation

Check out the documentation

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

## License

MIT © [qmfkdldks](https://github.com/qmfkdldks)
