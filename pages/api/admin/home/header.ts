/* eslint-disable consistent-return */
import nc from "next-connect"
import auth from "@/middleware/auth"
import Header from "@/models/home/Header"
import db from "@/utils/db"
import slugify from "slugify"
import { NextApiRequest, NextApiResponse } from "next"
// import admin from "@/middleware/admin"

const handler = nc()
    .use(auth)
// .use(admin);
// handler.use(async (req: NextApiRequest, res: NextApiResponse, next) => {
//     await db.connectDb();
//     next();
// });

handler.get(async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const header = await Header.findOne().lean();
        res.status(200).json(header);
    } catch (error: any) {
        res.status(500).json({ success: false, error: error.message });
    }
});

handler.post(async (req: NextApiRequest, res: NextApiResponse) => {
    try {

        const { images, alt, video, title, description } = req.body;
        if (!images && !video) {
            return res.status(400).json({ message: "At least one of image or video is required" });
        }
        await db.connectDb();

        // console.log("Image:", images)
        // console.log("Video:", video)

        const test = await Header.findOne({ title });
        if (test) {
            return res.status(400).json({ message: "Header by that name already exits😔" });
        }
        const slug = slugify(title.en, { lower: true }); // Generate slug for English title


        await new Header({ title, slug, video, alt, images, description }).save();
        db.disconnectDb();

        return res.status(200).json({
            message: `Header ${title.en} was successfully created😎`
        })
    } catch (error: any) {
        await db.disconnectDb();
        res.status(500).json({ message: error.message });
    }
});

handler.put(async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const { id, title, description, images, video } = req.body;
        await db.connectDb();
        const slug = slugify(title.en, { lower: true }); // Generate slug for English title
        await Header.findByIdAndUpdate(id, { title, slug, description, images, video });
        await db.disconnectDb();
        // console.log("The ID is:", id)
        return res.status(200).json({
            message: "Header has been updated successfully!",
            headers: await Header.find({}).sort({ createdAt: -1 }),
        });
    } catch (error: any) {
        res.status(500).json({ message: error.message })
    }
});

handler.delete(async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const { id } = req.body;
        await db.connectDb();
        await Header.findByIdAndDelete(id);
        await db.disconnectDb();
        return res.json({
            message: "Header has been deleted successfully",
            headers: await Header.find({}).sort({ updatedAt: -1 }),
        });
    } catch (error: any) {
        res.status(500).json({ message: error.message })
    }
})

export default handler;