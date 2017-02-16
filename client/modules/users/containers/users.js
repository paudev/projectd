import Users from '../components/Users.jsx';
import {useDeps, composeWithTracker, composeAll} from 'mantra-core';

export const composer = ({context}, onData) => {
  const {Meteor, Collections} = context();

  const userSub = Meteor.subscribe('users.all');
  if(userSub.ready()) {
      const users = Collections.Users.find({}).fetch();
      onData(null, {users});
    }
};

export const depsMapper = (context, actions) => ({
  context: () => context
});

export default composeAll(
  composeWithTracker(composer),
  useDeps(depsMapper)
)(Users);
