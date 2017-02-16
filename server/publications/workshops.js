import { Meteor } from 'meteor/meteor';
import { Workshops } from '/lib/collections';

export default function () {

  Meteor.publish('workshops.all', function () {
    const options = {
      sort: {createdAt: -1}
    };

    return Workshops.find({}, options);
  });

  Meteor.publish('workshops.single', function (workshopId) {
    return Workshops.find({_id:workshopId});
  });

}
