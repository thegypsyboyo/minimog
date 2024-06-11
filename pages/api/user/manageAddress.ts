/* eslint-disable eqeqeq */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-plusplus */
/* eslint-disable camelcase */
/* eslint-disable consistent-return */
import nc from "next-connect"
import User from "@/models/User"
import db from "@/utils/db"
import auth from "@/middleware/auth"
import { NextApiRequest, NextApiResponse } from "next"

interface NextApiRequestProps extends NextApiRequest {
    user: any;
}

const handler = nc().use(auth)

handler.put(async (req: NextApiRequestProps, res: NextApiResponse) => {
    try {
        db.connectDb();
        const { id } = req.body;
        const user = await User.findById(req.user);
        const user_addresses = user.address;
        const addresses = [];
        for (let i = 0; i < user_addresses.length; i++) {
            let temp_address = {};
            if (user_addresses[i]._id == id) {
                temp_address = { ...user_addresses[i].toObject(), active: true };
                addresses.push(temp_address);
            } else {
                temp_address = { ...user_addresses[i].toObject(), active: false };
                addresses.push(temp_address);
            }
        }
        await user.updateOne(
            {
                address: addresses,
            },
            { new: true }
        );
        db.disconnectDb();
        return res.json({ addresses });
    } catch (error: any) {
        return res.status(500).json({ message: error.message });
    }
});

handler.delete(async (req: NextApiRequestProps, res: NextApiResponse) => {
    try {
        await db.connectDb();
        const { id } = req.body;
        const user: any = await User.findById(req.user);
        await user.updateOne(
            {
                $pull: { address: { _id: id } },
            },
            {
                new: true
            },
        );
        await db.disconnectDb();
        res.json({ addresses: user.address.filter((a: any) => a._id !== id) });
    } catch (error: any) {
        return res.status(500).json({
            message: error.message
        })
    }
})

export default handler;