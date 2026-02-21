import mongoose from 'mongoose'

const bookingSchema = new mongoose.Schema({
    user: { type: String, ref: 'user', required: true },
    room: { type: String, ref: 'room', required: true },
    hote: { type: String, ref: 'hotel', requied: true },
    checkInDate: { type: Date, requied: true },
    checkOutDate: { type: Date, required: true },
    totalPrice: { type: Number, requied: true },
    guests: { type: Number, requied: true },
    status: { type: String, enum: ['pending', 'confirmed', 'cancelled'], default: 'pending' },
    paymentMethod: { type: String, requied: true, default: 'Pay At Hote' },
    isPaid: { type: Boolean, default: false }

}, { timestamps: true })

const Booking = mongoose.model('booking', bookingSchema)

export default Booking; 