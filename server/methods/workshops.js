import { Workshops } from '/lib/collections';

export default function () {
     Meteor.methods({
    'workshops.toggle'(_id, type, checked) {  
        Workshops.update({_id}, {$set: {[type]:checked} });
    }
  });
}