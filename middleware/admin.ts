import { getToken } from "next-auth/jwt";
import { NextApiResponse } from "next";
import db from "@/utils/db";
import User from "@/models/User";

export default async (req: any, res: NextApiResponse, next: () => void) => {
    const token = await getToken({
        req,
        secret: process.env.JWT_SECRET as string,
        secureCookie: process.env.NODE_ENV === "production",
    });
    await db.connectDb();
    const user = await User.findById(token?.sub);
    await db.disconnectDb();
    if (user.role === "admin") {
        next();
    } else {
        res.status(401).json({ message: "Access denied. Admin resources" })
    }
    /*
    res.end();
    */
};
