import ManageWorkshop from '../components/ManageWorkshop.jsx';
import {useDeps, composeWithTracker, composeAll} from 'mantra-core';

export const composer = ({context, workshopId}, onData) => {
  const {Meteor, Collections} = context();
  
  const workshopSub = Meteor.subscribe('workshops.single', workshopId);
  if(workshopSub.ready()) {
      const workshop = Collections.Workshops.findOne({_id:workshopId});
      const scheduleSub = Meteor.subscribe('schedules.workshop', workshopId);
      if(scheduleSub.ready()) {
        const schedules = Collections.Schedules.find({workshopId}).fetch();
        console.log(schedules);
        onData(null, {workshop, schedules});
      }
  }

};

export const depsMapper = (context, actions) => ({
  context: () => context,
  toggleSwitch: actions.workshops.toggleSwitch,
  addSchedule: actions.workshops.addSchedule
});

export default composeAll(
  composeWithTracker(composer),
  useDeps(depsMapper)
)(ManageWorkshop);
