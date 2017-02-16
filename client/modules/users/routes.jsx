import React from 'react';
import {mount} from 'react-mounter';

import MainLayout from '/client/modules/core/components/MainLayout.jsx';
import RequireAuth from '../containers/RequireAuth';
import Users from './containers/users';

export default function (injectDeps, {FlowRouter}) {
  const MainLayoutCtx = injectDeps(MainLayout);
  const UsersWithAuth = RequireAuth(Users);
  FlowRouter.route('/users', {
    name: 'users',
    action() {
      mount(MainLayoutCtx, {
        content: () => (<UsersWithAuth />)
      });
    }
  });
}
