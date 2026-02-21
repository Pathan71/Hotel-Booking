import User from "../models/User.js";

// Middleware to check if user is authenticated

export const protect = async (req, res, next) => {
    const { userId } = req.auth()
    if (!userId) {
        res.json({ success: false, message: "not authenticated" })
    }
    else {
        const user = await User.findById(userId)
        req.user = user;
        next()
    }
}

// export const protect = async (req, res, next) => {
//     const { userId } = req.auth()

//     if (!userId) {
//         return res.json({ success: false, message: "Not authenticated" })
//     }

//     const user = await User.findById(userId)

//     if (!user) {
//         return res.json({ success: false, message: "User not found in DB" })
//     }

//     req.user = user
//     next()
// }