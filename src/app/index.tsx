import React from 'react';
import { Route, Switch } from 'react-router';
import { hot } from 'react-hot-loader';
import LeaderBoard from 'app/components/leaderboard';
export const App = hot(module)(() => (
  <Switch>
    <Route path="/" component={LeaderBoard} />
  </Switch>
));
