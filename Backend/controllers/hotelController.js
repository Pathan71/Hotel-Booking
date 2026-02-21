import Hotel from "../models/Hotel.js";
import User from "../models/User.js";

export const registerHotel = async (req, res) => {
    try {
        const { name, address, contact, city } = req.body;
        const owner = req.user._id
        console.log(req.body)

        if (!name || !address || !contact || !city) {
            return res.json({ success: false, message: "All fields required" });
        }

        // Check if User Already Registered
        const hotel = await Hotel.findOne({ owner })
        if (hotel) {
            return res.json({ success: false, message: "Hotel Already Registered" })
        }
        await Hotel.create({ name, address, contact, city, owner });

        await User.findByIdAndUpdate(owner, { role: "hotelOwner" })
        res.json({ success: true, message: "Hotel Regestered Successfully" })
    }
    catch (err) {
        res.json({ success: false, message: err.message })
    }
}