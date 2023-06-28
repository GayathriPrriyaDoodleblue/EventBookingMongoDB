import mongoose, { Schema, Document } from 'mongoose';

export interface EventBooking extends Document {
  bookingSlot: string | number | Date;
  startTime: string | number | Date;
  userId:string;
  eventId: string;
  bookingDate: Date;
}

const eventBookingSchema: Schema = new Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Info',
    required: true,
  },
  eventId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Event',
    required: true,
  },
  bookingSlot: {
    type: Date,
  },
  bookingDate: {
    type: Date,
    default: Date.now
  },
  isDeleted:{
    type:Boolean,
    default: false
  }
});

const EventBooking = mongoose.model<EventBooking>('EventBooking', eventBookingSchema);

export default EventBooking;
