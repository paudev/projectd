import {Mongo} from 'meteor/mongo';
import { Class } from 'meteor/jagi:astronomy';

const Workshop = new Mongo.Collection('workshops');

const Workshops = Class.create({
    name: 'Workshops',
    collection: Workshop,
    fields: {
        title: {
            type:String,
            optional:false
        },
        instructor: {
            type:[String],
            optional:true
        },
        numberOfView: {
            type:Number,
            optional:true
        },
        isActive: {
            type: Boolean,
            optional:true,
            default:false
        },
        isFeatured: {
            type:Boolean,
            optional:true,
            default:false
        },
        isPicked: {
            type:Boolean,
            optional:true,
            default:false
        },
        description: {
            type: String,
            optional:true
        }

    }
});

export default Workshops;
