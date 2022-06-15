import List from 'app/components/List';
import React from 'react';
import { RouteComponentProps } from 'react-router';

export namespace App {
  export interface Props extends RouteComponentProps<void> {}
}

export const App = () => {
  return <div><List/></div>;
};
