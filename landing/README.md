# Library Landing Page
Landing Page: https://vivid-delta.vercel.app/

Next.js App which show example use case and documentation
https://nextjs.org/

# Tech stack
framework: next.js react.js
style: styled-component
test: jest cypress
lint: eslint prettier
deploy: zeit

# Setup
Install NVM (node version manager)
Install Node +10
Install yarn
git clone git@github.com:qmfkdldks/vivid-editor.git
yarn install // install latest vivid-editor from npm and all related packages
yarn dev

# Lint
We recommend you to use yarn lint before pushing new feature branch to remote git server

# CI/CD
1. Create new issue or ticket describing the goal and tecnical detail
2. Create new feature branch from master and start adding relevant commits in local git
3. When new feature is complete, push new branch to remote git.
4. Create new pull request from github site
5. Zeit automatically builds and deploy new feature branch app (preview app). You should test newly added feature or style
6. Merge pull request then master branch will be deployed in production
