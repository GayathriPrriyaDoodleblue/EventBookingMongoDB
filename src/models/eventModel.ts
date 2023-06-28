import mongoose, { Schema, Document } from 'mongoose';

interface Event extends Document {
    name: string;
    startTime: Date;
    endTime: Date;
    location: {
      type: string;
      coordinates: number[];
    };
  }

  const EventSchema: Schema = new Schema({
    name: {
      type: String,
      required: true,
    },
    startTime: {
      type: Date,
      required: true,
    },
    endTime: {
      type: Date,
      required: true,
    },
    location: {
      type: {
        type: String,
        enum: ['Point'],
        required: true,
      },
      coordinates: {
        type: [Number],
        required: true,
      },
    },
  });
  
  EventSchema.index({ location: '2dsphere' });
  
  const Event = mongoose.model<Event>('Event', EventSchema);
  
  export default Event;
  