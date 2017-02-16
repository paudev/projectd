import 'react-mdl/extra/material.css';
import 'react-mdl/extra/material.js';

import {createApp} from 'mantra-core';
import initContext from './configs/context';

// modules
import coreModule from './modules/core';
import workshopsModule from './modules/workshops';
import loginModule from './modules/login';
import dashboardModule from './modules/dashboard';
import usersModule from './modules/users';
import transactionModule from './modules/transactions';

// init context
const context = initContext();

// create app
const app = createApp(context);
app.loadModule(coreModule);
app.loadModule(workshopsModule);
app.loadModule(loginModule);
app.loadModule(dashboardModule);
app.loadModule(usersModule);
app.loadModule(transactionModule);
app.init();
