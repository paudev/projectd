import React from 'react';
import {mount} from 'react-mounter';

import MainLayout from '/client/modules/core/containers/mainLayout';

export default function (injectDeps, {FlowRouter}) {
  const MainLayoutCtx = injectDeps(MainLayout);

}
