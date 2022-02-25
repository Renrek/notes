# Basic React - Express Recipe
_Edited on - 2/20/2022_


#### Create app and install dependencies

`npx create-react-app name-of-app`
`cd name-of-app`
```shell
npm install redux react-redux redux-saga react-router-dom redux-logger
```

#### Create app directories and core files
```shell
mkdir src/app src/theme src/components src/hooks src/redux src/redux/reducers src/redux/sagas src/components/Home
```
```shell
mv App* ../src/app
```
```shell
touch src/redux/reducers/_root.reducer.js src/redux/sagas/_root.saga.js src/redux/store.js src/theme/theme.js src/components/Home.jsx
```

**File: src/index.js**
```js
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux/store';

import App from './app/App';
import reportWebVitals from './reportWebVitals';


ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
```

**File: src/redux/sagas/_root.saga.js**
```js
import { all } from 'redux-saga/effects';
// import exampleSaga from './example.saga';

export default function* rootSaga(){
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

**File: src/app/App.jsx**
```js
import React from 'react';
import { Routes, Route} from "react-router-dom";

import Home from '../components/Home/Home';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </>
  );
}

export default App;
```

**File src/components/Home/Home.jsx**
```js
import React from 'react';
import { Link }  from 'react-router-dom';

const Home = () => {
    return (
        <>
            <nav>
                <Link to="/">Home</Link>
            </nav>
        </>
    );
}

export default Home;
```

**File adjustments**
Note: contemplating on leaving them....
- File: src/index.css - Delete file

- File: src/app/App.css - Delete file';


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
