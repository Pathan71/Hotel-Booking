import express from 'express'
import { protect } from '../middleware/authMiddleware.js';
import { registerHotel } from '../controllers/hotelController.js';
// import { ClerkExpressRequireAuth } from '@clerk/clerk-express';

const hotelRouter = express.Router();

hotelRouter.post('/', protect, registerHotel);
// hotelRouter.post("/", ClerkExpressRequireAuth(), protect, registerHotel);

export default hotelRouter;