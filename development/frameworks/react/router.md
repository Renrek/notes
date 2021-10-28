While in the project directory run following command.

npm install react-router-dom


Add following to App page. 

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

        <Router>
          <Switch>
            <Route exact path="/" component={ Main }/>
            <Route path="/about" component={ About }/>
          </Switch>
        </Router>