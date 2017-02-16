import Workshops from '../components/Workshops.jsx';
import {useDeps, composeWithTracker, composeAll} from 'mantra-core';

export const composer = ({context}, onData) => {
  const {Meteor, Collections} = context();

  const workshopSub = Meteor.subscribe('workshops.all');
  if(workshopSub.ready()){
      const workshops = Collections.Workshops.find({}).fetch();

      onData(null, {workshops});
  }

};

export const depsMapper = (context, actions) => ({
  context: () => context
});

export default composeAll(
  composeWithTracker(composer),
  useDeps(depsMapper)
)(Workshops);
