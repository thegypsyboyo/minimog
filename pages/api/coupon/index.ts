/* eslint-disable consistent-return */
import nc from "next-connect"
import Coupon from "@/models/Coupon"
import db from "@/utils/db"
// import auth from "@/middleware/auth"
import { NextApiRequest, NextApiResponse } from "next";

const handler = nc();

handler.post(async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        db.connectDb();
        const { coupon, startDate, endDate, discount } = req.body;
        const test = await Coupon.findOne({ coupon });
        if (test) {
            return res.status(400).json({
                message: "This Coupon name already exists, try with a different name"
            });
        }
        await new Coupon({
            coupon,
            startDate,
            endDate,
            discount
        }).save()

        await db.disconnectDb();
        return res.status(200).json({
            message: "Coupon created successfully !",
            coupons: await Coupon.find({}),
        })
    } catch (error: any) {
        return res.status(500).json({
            message: error.message
        })
    }
})

export default handler