import User from "../models/User.js";

// Middleware to check if user is authenticated

// export const protect = async (req, res, next) => {
//     const { userId } = req.auth()
//     if (!userId) {
//         res.json({ success: false, message: "not authenticated" })
//     }
//     else {
//         const user = await User.findById(userId)
//         req.user = user;
//         next()
//     }
// }

export const protect = async (req, res, next) => {
    try {
        // 1. Clerk se userId nikaalna
        const auth = req.auth(); 
        const userId = auth.userId;

        if (!userId) {
            // 'return' lagana zaroori hai taaki aage ka code na chale
            return res.status(401).json({ success: false, message: "Not authenticated, please login again." });
        }

        // 2. Database mein user check karna
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ success: false, message: "User not found in database. Check your webhooks." });
        }

        // 3. Request object mein user save karna
        req.user = user;
        
        // 4. Agle step (Controller) par jaana
        next();

    } catch (error) {
        console.error("Middleware Error:", error.message);
        res.status(403).json({ success: false, message: "Auth Error: " + error.message });
    }
}
