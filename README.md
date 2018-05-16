# README

### Getting Started

1. This project needs a global install of `foreman` to run. The project says (not)[https://github.com/ddollar/foreman] to use it as a part of the gem file
```bash
  gem install foreman
```

1. Install `gem` dependencies
```bash
bundle install
```

1. Install [yarn](https://yarnpkg.com/lang/en/docs/install/#mac-stable) if you don't already have it
```bash
brew install yarn
```

1. Install `node_modules`
```bash
 cd client && yarn install
```

1. Run foreman on port 3000.
```bash
foreman start -p 3000
```
