import { Meteor } from 'meteor/meteor';
import { Schedules } from '/lib/collections';

export default function () {

  Meteor.publish('schedules.workshop', function (workshopId) {
    return Schedules.find({workshopId});
  });

}
