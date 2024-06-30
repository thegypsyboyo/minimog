/* eslint-disable object-shorthand */
/* eslint-disable camelcase */
/* eslint-disable consistent-return */
import nc from "next-connect"
import User from "@/models/User"
import db from "@/utils/db"
import auth from "@/middleware/auth"
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
        const { paymentMethod } = req.body;

        const user = await User.findById(req.user);

        await user.updateOne(
            {
                defaultPaymentMethod: paymentMethod,
            },
            { returnOriginal: false }
        );

        await db.disconnectDb();
        return res.json({
            message: `Your default payment is ${paymentMethod}`,
            paymentMethod: user.defaultPaymentMethod
        });

    } catch (error: any) {
        return res.status(500).json({
            message: error.message
        })
    }
})

export default handler;