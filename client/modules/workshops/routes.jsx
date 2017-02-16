import React from 'react';
import {mount} from 'react-mounter';

import MainLayout from '/client/modules/core/components/MainLayout.jsx';
import RequireAuth from '../containers/RequireAuth';
import Workshops from './containers/workshops';

export default function (injectDeps, {FlowRouter}) {
  const MainLayoutCtx = injectDeps(MainLayout);
  const WorkshopsWithAuth = RequireAuth(Workshops);

  FlowRouter.route('/workshops', {
    name: 'workshops',
    action() {
      mount(MainLayoutCtx, {
        content: () => (<WorkshopsWithAuth />)
      });
    }
  });
}
