import MainLayout from '../components/MainLayout.jsx';
import {useDeps, composeWithTracker, composeAll} from 'mantra-core';

export const composer = ({context, app}, onData) => {
  const {Meteor, Collections} = context();
  console.log(Meteor.userId());
    if(!Meteor.userId()) {
        FlowRouter.redirect('/login');
    }
    onData(null, {});
};

export const depsMapper = (context, actions) => ({
  context: () => context
});

export default composeAll(
  composeWithTracker(composer),
  useDeps(depsMapper)
)(MainLayout);
