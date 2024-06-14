# Introduction

You can custom behavior for json-server by using javascript

#### step 1

```shell
npm install json-server --save
npm install nodemon --save-dev
```

#### step 2

- Create **main.js** file for custom json-server behavior.
- Create **db.json** for store json data.

#### step 3

Setup run script for package.json

```json
{
  "scripts": {
    "dev": "nodemon main.js",
    "start": "node main.js"
  }
}
```

#### step 4

install vscode extension: rest client
