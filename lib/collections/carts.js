import { Mongo } from 'meteor/mongo';
import { Class } from 'meteor/jagi:astronomy';

const Cart = new Mongo.Collection('carts');

const Carts = Class.create({
  name: 'Cart',
  collection:Cart,
  fields: {
      userId: {
          type:String,
          optional:false
      },
      workshopId: {
          type:String,
          optional:false
      },
      scheduleId: {
          type:String,
          optional:false
      }
  }
});

export default Carts;