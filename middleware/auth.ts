import { getToken } from "next-auth/jwt";
import { NextApiResponse } from "next";

export default async (req: any, res: NextApiResponse, next: () => void) => {
    const token = await getToken({
        req,
        secret: process.env.JWT_SECRET as string,
        secureCookie: process.env.NODE_ENV === "production",
    });
    if (token) {
        req.user = token.sub;
        next();
    } else {
        res.status(401).json({ message: "Not signed in :" });
    }
    /*
    res.end();
    */
};
