# Basic React - Express Recipe
_Edited on - 10/29/21_


#### Create app and install dependencies

`npx create-react-app name-of-app`
`cd name-of-app`
```shell
npm install redux react-redux redux-saga react-router-dom redux-logger
```

#### Create app directories and core files
```shell
mkdir src/app src/components src/hooks src/redux src/redux/reducers src/redux/sagas
```
```shell
mv App* ../src/app
```
```shell
touch src/redux/reducers/_root.reducer.js src/redux/sagas/_root.saga.js src/redux/store.js
```

**File: src/redux/sagas/_root.saga.js**
```js
import { all } from 'redux-saga/effects';
// import exampleSaga from './example.saga';

export function* rootSaga(){
    yield all([
        // exampleSaga(),
    ]);
}
```

**File: src/redux/reducers/_root.reducer.js**
```js
import { combineReducers } from "redux";
// import exampleObject from './exampleObject.reducer';

const rootReducer = combineReducers({
    // exampleObject,
});

export default rootReducer;
```

**File: src/redux/store.js**
```js
import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import logger from 'redux-logger';
import rootReducer from './reducers/_root.reducer';
import rootSaga from './sagas/_root.saga';

const sagaMiddleware = createSagaMiddleware();

// logger is only included while in development
const middlewareList = process.env.NODE_ENV === 'development' ?
  [sagaMiddleware, logger] :
  [sagaMiddleware];

const store = createStore(
  rootReducer,
  applyMiddleware(...middlewareList),
);

sagaMiddleware.run(rootSaga);

export default store;
```
**File adjustments**

- File: src/index.css - Delete file
- File: src/index.js - Remove css import;
- File: src/index.js - Alter line - import App from './app/App';
- File: src/app/App.css - Delete file';
- File: src/app/App.js - Remove css import;
- File: src/app/App.js - Delete line - import logo from './logo.svg';
- File: src/app/App.js - Change extension - src/app/App.jsx

#### Install Express
```shell
npm install express dotenv axios
```
```shell
npm install nodemon --save-dev
```

#### Create Server file structure
```shell
mkdir server server/modules server/routes server/constants
touch server/server.js
```
##### Add Boiler plate server code server/server.js
```js
/** ---------- SYSTEM ---------- **/
require('dotenv').config();
const express = require('express');
const app = express();
const SITE_URL = process.env.SITE_URL || ' http://localhost';
const PORT = process.env.PORT || 5000;

/** ---------- MIDDLEWARE ---------- **/
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static('build'));

/** ---------- EXPRESS ROUTES ---------- **/

/** ---------- START SERVER ---------- **/
app.listen(PORT, () => {
    console.log(`Server is Active - ${SITE_URL}:${PORT}`);
});

```


##### Add to package.json
```json
"proxy": "http://localhost:8081",
"scripts": {
    "start": "node server/server.js",
    "build": "react-scripts build",
    "client": "react-scripts start",
    "server": "nodemon  --watch server server/server.js",
    "test": "react-scripts test --env=jsdom",
    "eject": "react-scripts eject"
  },
```
