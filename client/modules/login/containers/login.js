import Login from '../components/Login.jsx';
import {useDeps, composeWithTracker, composeAll} from 'mantra-core';

export const composer = ({context}, onData) => {
  const {Meteor, Collections} = context();
  if(Meteor.userId()) {
      FlowRouter.redirect('/');
  }
  onData(null, {});
};

export const depsMapper = (context, actions) => ({
  context: () => context,
  login: actions.login.login
});

export default composeAll(
  composeWithTracker(composer),
  useDeps(depsMapper)
)(Login);
