# User Auth using Passport
 
A great deal of this was repurposed code from my Prime experiance. I have reverse engineered and studied the parts to understand how they interact. I have altered some things to better suit my mental model along with other technologies that I use.

#### Minimum requirements for user table

```SQL
--Written for and tested on MariaDB
CREATE TABLE user (
	id INT NOT NULL AUTO_INCREMENT,
    username VARCHAR (80) UNIQUE NOT NULL,
    password VARCHAR (1000) NOT NULL,
    created_on TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_on TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY(id)
);
```

```shell
npm i passport passport-local cookie-session bcryptjs
mkdir src/strategies
cd server/modules
touch encryption.js strategy.js
```

**File: server/modules/encryption.js**

```js
/******** Password Encryption ********/
const bcrypt = require('bcryptjs');
const SALT_ROUNDS = 10;

const encryptPassword = (password) => {
    const salt = bcrypt.genSaltSync(SALT_ROUNDS);
    return bcrypt.hashSync(password, salt);
}

const comparePassword = (submittedPassword, storedPassword) => {
    return bcrypt.compareSync(submittedPassword, storedPassword);
}

module.exports = {
    encryptPassword,
    comparePassword,
};
```

**File server/modules/strategy.js**

```js
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const encryption = require('./encryption');
const pool = require('./pool');

passport.serializeUser((user, done) => {
    done(null, user.id);
});
  
passport.deserializeUser((id, done) => {
    pool.query('SELECT * FROM user WHERE id = ?', [ id ])
        .then((result) => {
            const user = result[0];
            if (user) {
                delete user.password; // remove password so it doesn't get sent
                done(null, user);
            } else {
                done(null, null); // 401 status code
            }
        })
        .catch((error) => {
            console.log('Passport deserializing error:', error); 
            done(error, null); // 500 status code
        }
    );
});
  
passport.use(
    'local',
    new LocalStrategy((username, password, done) => {
    pool.query('SELECT * FROM user WHERE username = ?', [ username ])
        .then((result) => {
            const user = result[0];
            if (user && encryption.comparePassword(password, user.password)) {
                // Found match
                done(null, user);
            } else {
                // No match found
                done(null, null); // 401 status code
            }
        })
        .catch((error) => {
            console.log('Error with passport:', error);
            done(error, null); // 500 status code
        });
    })
);
  
module.exports = passport;
```

**File: server/modules/authentication.js**

```js
const rejectUnauthenticated = (req, res, next) => {
    // Verify Authentication
    if (req.isAuthenticated()) {
      next();
    } else {
      res.sendStatus(403);
    }
  };
  
  module.exports = rejectUnauthenticated;
  
```

**File: server/modules/session.js**

```js
const cookieSession = require('cookie-session');

// 7 days = 1000ms * 60 seconds * 60 minutes * 24 hours * 7 days
const maxAge = 1000 * 60 * 60 * 24 * 7;

const serverSessionSecret = () => {
  if (
    !process.env.SERVER_SESSION_SECRET ||
    process.env.SERVER_SESSION_SECRET.length < 8 
  ) {
    console.log('*****SET SERVER_SESSION_SECRET IN ENV!****');
  }

  return process.env.SERVER_SESSION_SECRET;
};

module.exports = cookieSession({
  secret: serverSessionSecret() || 'secret',
  key: 'user',
  resave: 'false',
  saveUninitialized: false,
  maxAge, 
  secure: false,
});
```
server\routes\user.router.js
```js
const express = require('express');
const rejectUnauthenticated = require('../modules/rejectUnauthenticated');
const encryption = require('../modules/encryption');
const pool = require('../modules/pool');
const strategy = require('../modules/strategy');

const router = express.Router();

router.get('/', rejectUnauthenticated, (req, res) => {
    res.send(req.user); // Data was gathered by Passport
});

router.post('/register', (req, res) => {
    const username = req.body.username;
    const password = encryption.encryptPassword(req.body.password);

    const statement = `INSERT INTO user (username, password)
        VALUES ( ?, ? )`;

    pool.query(statement, [username, password])
        .then(() => res.sendStatus(201))
        .catch((err) => {
            console.log('User registration failed: ', err);
            res.sendStatus(500);
        });
});

router.post('/login', strategy.authenticate('local'), (req, res) => {
    res.sendStatus(200);
});

router.post('/logout', (req, res) => {
    req.logout(); // Passport
    res.sendStatus(200);
});

module.exports = router;
```

add to server.js
```js
/** ---------- SYSTEM ---------- **/
const session = require('./modules/session');
const passport = require('./modules/strategy');

const userRouter = require('./routes/user.router');

/** ---------- MIDDLEWARE ---------- **/
app.use(session);

app.use(passport.initialize());
app.use(passport.session());

/** ---------- EXPRESS ROUTES ---------- **/
app.use('/api/user', userRouter);
```

src\redux\sagas\registration.saga.js
```js
import { put, takeLatest } from 'redux-saga';
import axios from 'axios';

function* registerUser(action) {
    // Register a new user, and welcome them by automatically logging them in.
    try {
        yield axios.post( '/api/user/register', action.payload );
        yield put({ type: 'LOGIN', payload: action.payload });
    } catch (error) {
        console.log('Error - registration saga:', error);
    }
}

function* registrationSaga() {
    yield takeLatest('REGISTER', registerUser);
}

export default registrationSaga;
```

src\redux\sagas\user.saga.js

```js
import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* fetchUser() {
  try {
    const config = {
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true,
    };
    const response = yield axios.get('/api/user', config);
    yield put({ type: 'SET_USER', payload: response.data });
  } catch (error) {
    console.log('User get request failed', error);
  }
}

function* userSaga() {
  yield takeLatest('FETCH_USER', fetchUser);
}

export default userSaga;
```

src\redux\sagas\login.saga.js

```js
import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* loginUser(action) {
    try {
        const config = {
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true,
        };
        yield axios.post('/api/user/login', action.payload, config);
        yield put({ type: 'FETCH_USER' });
    } catch (error) {
        console.log('Error with user login:', error);
    }
}

function* logoutUser(action) {
    try {
        const config = {
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true,
        };
    yield axios.post('/api/user/logout', config);
    yield put({ type: 'UNSET_USER' });
  } catch (error) {
        console.log('Error with user logout:', error);
  }
}

function* loginSaga() {
    yield takeLatest('LOGIN', loginUser);
    yield takeLatest('LOGOUT', logoutUser);
}

export default loginSaga;
```

src\redux\reducers\user.reducer.js
```js
const userReducer = (state = {}, action) => {
    switch (action.type) {
      case 'SET_USER':
        return action.payload;
      case 'UNSET_USER':
        return {};
      default:
        return state;
    }
  };
  
  // user will be on the redux state at:
  // state.user
  export default userReducer;
  
```

src\components\ProtectedRoute\ProtectedRoute.jsx

```js
import React from 'react';
import { Route } from 'react-router-dom';
import { useSelector } from 'react-redux';

import Home from '../../pages';
export default ({ component, children, ...props }) => {

  const user = useSelector((store) => store.user);

  // Handle the different ways to pass a component
  const ProtectedComponent = component || (() => children);

  // Check if user is signed in and direct them Home if not.
  return (
    <Route {...props} >
        { user.id ? <ProtectedComponent /> : <Home /> }
    </Route>
  );

}
```