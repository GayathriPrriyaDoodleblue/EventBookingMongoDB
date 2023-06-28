import { Request, Response } from 'express';
import * as service from '../services/userService';

const saveUser = async (req: Request, res: Response) => {
  try {
    const result = await service.createUser(req);
    res.status(200).send(result);
  } catch (e) {
    res.status(500).send(e);
  }
};

const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const token = await service.loginService(email, password);

    res.status(200).json({ token });
  } catch (error) {
    res.status(500).send(error);
  }

};


const saveEvent = async (req: Request, res: Response) => {
  try {
    const result = await service.createEvent(req);
    res.status(200).send(result);
  } catch (e) {
    res.status(500).send(e);
  }
};


const bookEvent = async (req: any, res: any) => {
  try {
    const {eventId, bookingDate,bookingSlot } = req.body;
    const id = (<any>req).user.id;
    const book = await service.bookingEvents(id, eventId, bookingDate,bookingSlot);
    res.status(200).send(book);
  } catch (error) {
    console.log("error---->", error);
    res.status(500).send(error);
  }  
};

const getEventsById = async (req: Request, res: Response) => {
  try {
    const { id } = (<any>req).user;
    const result = await service.fetchEventsById(id);
    res.status(200).send(result);
  } catch (error) {
    console.log("error---->", error);
    res.status(500).send(error);
  }
};


const deleteBooking = async (req: Request, res: Response) => {
  try {
    const result = await service.deleteBookingService(req);
    res.status(200).send(result);
  } catch (error) {
    res.status(500).send(error);
  }
};


const eventsAroundMe = async (req: Request, res: Response) => {
  try {
    const result = await service.eventsAroundMeService(req);
    res.status(200).send(result);
  } catch (error) {
    console.log("error---->", error);
    res.status(500).send(error);
  }
};

export {
  saveUser,
  login,
  saveEvent,
  bookEvent,
  getEventsById,
  deleteBooking,
  eventsAroundMe
};