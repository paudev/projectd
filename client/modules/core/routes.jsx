import React from 'react';
import {mount} from 'react-mounter';

import MainLayout from './containers/mainLayout';
import Dashboard from '../dashboard/containers/dashboard';

export default function (injectDeps, {FlowRouter}) {
  const MainLayoutCtx = injectDeps(MainLayout);

  FlowRouter.route('/', {
    name: 'app',
    action() {
      if (Meteor.userId()) {
        mount(MainLayoutCtx, {
            content: () => (<Dashboard />)
          });
      } else {
        FlowRouter.go('/login');
      }
    }
  });
}
