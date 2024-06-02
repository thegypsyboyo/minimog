/* eslint-disable consistent-return */
/* eslint-disable no-unused-vars */
/* eslint-disable camelcase */
import nc from "next-connect"
import User from "@/models/User"
import db from "@/utils/db"
import auth from "@/middleware/auth"
import { NextApiRequest, NextApiResponse } from "next";

const handler = nc().use(auth);

interface NextApiRequestProps extends NextApiRequest {
    user?: any
}

handler.put(async (req: NextApiRequestProps, res: NextApiResponse) => {

    try {
        await db.connectDb();
        const { product_id, style } = req.body;
        const user = await User.findById(req.user);
        const exist = user.wishlist.find(
            (x: any) => x.product === product_id && x.style === style
        );
        if (exist) {
            return res
                .status(400)
                .json({ message: "Product already exists in your wishlist." });
        }
        await user.updateOne({
            $push: {
                wishlist: {
                    product: product_id,
                    style,
                },
            },
        });

        await db.disconnectDb();

        return res.status(200).json({
            message: "Product successfully added to your wishlist."
        })

    } catch (error: any) {
        return res.status(500).json({
            message: error.message
        })
    }

})

export default handler;