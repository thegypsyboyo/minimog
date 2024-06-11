/* eslint-disable object-shorthand */
/* eslint-disable consistent-return */
import nc from "next-connect"
import User from "@/models/User"
import db from "@/utils/db"
import auth from "@/middleware/auth"
import { NextApiRequest, NextApiResponse } from "next";

interface NextApiRequestProps extends NextApiRequest {
    user: any;
}

const handler = nc().use(auth);

handler.post(async (req: NextApiRequestProps, res: NextApiResponse) => {
    try {
        await db.connectDb();
        const { address } = req.body;
        const user: any = User.findById(req.user);

        await user.updateOne({
            $push: {
                address: address,
            },
        });
        await db.disconnectDb();

        return res.json({ addresses: user.address });

    } catch (error: any) {
        return res.status(500).json({
            message: error.message
        })
    }
})


export default handler;