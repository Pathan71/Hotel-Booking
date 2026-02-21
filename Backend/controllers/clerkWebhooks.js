import User from "../models/User.js";
import { Webhook } from 'svix';

const clerkWebhooks = async (req, res) => {
    try {
        // Create a Svix instance with clerk webhook secret.
        const whook = new Webhook(process.env.CLERK_WEBHOOK_SECRET)

        // Getting Headers
        const headers = {
            "svix-id": req.headers["svix-id"],
            "svix-timestamp": req.headers["svix-timestamp"],
            "svix-signature": req.headers["svix-signature"]
        }

        // Verifying Headers
        await whook.verify(JSON.stringify(req.body), headers)

        // Getting Data from request body
        const { data, type } = req.body


        // Swtich Case for different Events
        switch (type) {
            case "user.created": {
                const userData = {
                    _id: data.id,
                    username: data.first_name + " " + data.last_name,
                    email: data.email_addresses[0].email_address,
                    image: data.image_url
                }
                await User.create(userData);
                break;
            }

            case "user.updated": {
                const userData = {
                    _id: data.id,
                    username: data.first_name + " " + data.last.name,
                    email: data.email_address[0].email_address,
                    image: data.image_url
                }
                await User.findByIdAndUpdate(data.id, userData);
                // await User.findByIdAndUpdate(data.id, userData, { upsert: true });
                break;
            }

            case "user.deleted": {
                await User.findByIdAndDelete(data.id);
                break;
            }

            default:
                break;
        }
        res.json({ success: true, message: "Webhook Recieved" })
    }
    catch (err) {
        console.log(err.message)
        res.json({ success: false, message: err.message })
    }
}

export default clerkWebhooks;