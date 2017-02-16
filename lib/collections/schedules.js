import {Mongo} from 'meteor/mongo';
import { Class } from 'meteor/jagi:astronomy';

const Schedule = new Mongo.Collection('schedules');

const ScheduleData = Class.create({
    name:'Schedule Data',
    fields: {
        scheduleDate: {
            type: Date,
            optional:false
        },
        timeline: {
            type: [Object],
            optional:true
        }
    }
});



const Schedules = Class.create({
  name: 'Schedule',
  collection:Schedule,
  fields: {
      _id: {
          type: String,
          optional:false
      },
      workshopId: {
          type:String,
          optional:false
      },
      attendees: {
          type: [String],
          optional:true
      },
      maxSlot: {
          type: Number,
          optional:false
      },
      regularPrice: {
          type: Number,
          optional:true
      },
      discountedPrice:{
          type:Number,
          optional:true
      },
      scheduleData: {
          type: [ScheduleData],
          optional:true
      }
  }
}); 




export default Schedules;
