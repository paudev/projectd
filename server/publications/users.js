import { Meteor } from 'meteor/meteor';
import { Users } from '/lib/collections';

export default function () {

  Meteor.publish('users.all', function () {
    const options = {
      sort: {createdAt: -1}
    };

    return Users.find({}, options);
  });

}
