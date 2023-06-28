import Info from '../models/infoModel';
import Event from '../models/eventModel';
import EventBooking from '../models/bookingModel';
import {generateToken} from "../middleware/authentication";

const createUser = (req: any) => {
    try {
        const users = new Info(req.body);
        return users.save();
    } catch (e) {
        return e;
    }
};

const loginService = async (email: any, password: any) => {
  try {
    const user = await Info.findOne({ email, password });
    if (!user) {
      return { message: 'Invalid email or password' };
    }
    const token = generateToken(user._id, user.email, user.role);
    return {userId: user._id, email: user.email, token};
  } catch (error) {
    throw new Error('Authentication failed');
  }
};


const createEvent = (req: any) => {
    try {
        const users = new Event(req.body);
        return users.save();
    } catch (e) {
        return e;
    }
};

const bookingEvents = async (userId: any, eventId: any, bookingDate: any, bookingSlot: any) => {
  try {
    const event = await Event.findById(eventId);
    const user = await Info.findById(userId);

    if (!event || !user) {
      return {message:'Event or User not found'};
    }

    const existingBooking = await EventBooking.findOne({
      userId: user._id,
      bookingSlot: { $eq: bookingSlot },
    }).exec();

    if (existingBooking) {
      return { message:'User has already booked an event at the same date and time'};
    }

    const book = new EventBooking({
      userId: user._id,
      eventId: event._id,
      bookingSlot:bookingSlot,
      bookingDate:Date.now(),
    });

    await book.save();

    return book;
  } catch (error) {
    throw error;
  }
};

  
  const fetchEventsById = async (userId:any) => {
    try {
      const user = await Info.findById(userId);
      console.log("user", user);
      
  
      if (!user) {
        throw new Error('User not found');
      }
  
      const events = await EventBooking.find({ userId }).sort({ bookingSlot: -1 });
      console.log("events", events);
  
      return events;
    } catch (error) {
      throw new Error('Internal Server Error');
    }
  };

  const deleteBookingService = async (req: any) => {
    try {
      const { id } = req.params;
  
      const booking = await EventBooking.findById(id);
  
      if (!booking) {
        return 'Booking not found';
      }
  
      const currentTime = new Date();
      const startTime = new Date(booking.bookingSlot);
      const timeDifference = startTime.getTime() - currentTime.getTime();
      const hoursDifference = Math.ceil(timeDifference / (1000 * 60 * 60));

      console.log(hoursDifference < 8,"hoursDifference < 8");
      
  
      if (hoursDifference < 8) {
        return 'Cannot cancel event less than 8 hours before start time';
      }

      const deletedInfo = await EventBooking.findByIdAndUpdate(id, { isDeleted: true });
  
      return deletedInfo;
    
    } catch (error) {
      return { error };
    }
  };


  const eventsAroundMeService = async (req: any) => {
    try {
      const { latitude, longitude } = req.query;
  
      const userLongitude = parseFloat(longitude as string);
      const userLatitude = parseFloat(latitude as string);
  
      const maxDistance = 30000;
  
      const events = await Event.find({
        location: {
          $near: {
            $geometry: {
              type: 'Point',
              coordinates: [userLatitude, userLongitude],
            },
            $maxDistance: maxDistance,
          },
        },
      });
  
      return events;
    } catch (error) {
      throw new Error('Internal Server Error');
    }
  };

export {
    createUser,
    loginService,
    createEvent,
    bookingEvents,
    fetchEventsById,
    deleteBookingService,
    eventsAroundMeService
};