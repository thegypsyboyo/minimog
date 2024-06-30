/* eslint-disable object-shorthand */
/* eslint-disable camelcase */
/* eslint-disable consistent-return */
import nc from "next-connect"
import User from "@/models/User"
import db from "@/utils/db"
import auth from "@/middleware/auth"
import bcrypt from "bcrypt";
import { NextApiRequest, NextApiResponse } from "next";

interface UserProps {
    email: string;
    name: string;
    role: string;
    image: string;
    _id: string;
}

interface NextApiRequestType extends NextApiRequest {
    user: UserProps;
}

const handler = nc().use(auth);

handler.put(async (req: NextApiRequestType, res: NextApiResponse) => {
    try {
        await db.connectDb();
        const { current_password, password, name, image } = req.body;

        const user = await User.findById(req.user);
        const crypted_password = await bcrypt.hash(password, 12);
        if (!user.password) {
            await user.updateOne({
                password: crypted_password,
                image: image,
                name: name,
            });
            return res.status(200).json({
                message: "We noticed that you are using a social login so we added a password for you to login with in the future.",
                user: { name, image, email: user.email }
            });
        }
        const isMatch = await bcrypt.compare(current_password, user.password);

        if (!isMatch) {
            return res.status(400).json({
                message: "Current password is wrong!"
            });
        }

        await user.updateOne({
            password: crypted_password,
            image: image,
            name: name,
        }); 
        res.json({
            message: "User has been updated successfully.",
            user: { name, image, password }
        })
        await db.disconnectDb();
    } catch (error: any) {
        return res.status(500).json({
            message: error.message
        })
    }
})

export default handler;