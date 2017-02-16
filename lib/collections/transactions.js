import { Mongo } from 'meteor/mongo';
import { Class } from 'meteor/jagi:astronomy';

const Transaction = new Mongo.Collection('transactions');

const Transactions = Class.create({
  name: 'Transaction',
  collection:Transaction,
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

export default Transactions;
