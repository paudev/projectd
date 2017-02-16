import React from 'react';
import {mount} from 'react-mounter';

import Login from './containers/login';
import LoginLayout from './components/LoginLayout.jsx'

export default function (injectDeps, {FlowRouter}) {
  const LoginLayoutCtx = injectDeps(LoginLayout);

  FlowRouter.route('/login', {
    name: 'Login',
    action() {
      mount(LoginLayoutCtx, {
        content: () => (<Login />)
      });
    }
  });

  FlowRouter.route('/logout', {
    name: 'app.logout',
    action() {
      Meteor.logout(() => {
        FlowRouter.go('/login');
      });
    }
  });

}
