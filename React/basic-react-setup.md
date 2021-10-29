# React and Express installed together
_current project 10/29/21_

#### Create React App
```shell
npx create-react-app name-of-app
cd name-of-app
npm install redux
npm install redux-saga
npm install react-router-dom
```
#### Frontend directories
```shell
cd src
mkdir app components hooks redux redux/reducers redux/sagas
mv App* ../src/app
cd ..
touch src/redux/reducers/_root.reducer.js
touch src/redux/sagas/_root.saga.js
touch src/redux/store.js
```

_root.saga.js
```js
import { all } from 'redux-saga/effects';
// import exampleSaga from './example.saga';

export function* rootSaga(){
    yield all([
        // exampleSaga(),
    ]);
}
```

_root.reducer.js
```js
import { combineReducers } from "redux";
// import exampleObject from './exampleObject.reducer';

const rootReducer = combineReducers({
    // exampleObject,
});

export default rootReducer;
```

/src/redux/store.js
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
#### file adjustment

- src/index.js App import file path correction
import App from './app/App';

- src/app/App.js remove import logo fromj './logo.svg';

-rename app.js to app.jsx
#### Install Express
```shell
npm install express
npm install nodemon --save-dev
npm install dotenv
npm install axios
```

#### Create Server file structure
```shell
mkdir server
mkdir server/modules server/routes
touch server/server.js 
code .
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

### Step 3 : 

##### Starting server & client

```shell
npm run server
npm run client
```

