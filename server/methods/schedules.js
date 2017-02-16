import { Schedules } from '/lib/collections';

export default function () {
     Meteor.methods({
    'schedules.add'(data) {  
        Schedules.insert(data);
    }
  });
}