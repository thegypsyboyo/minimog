/* eslint-disable consistent-return */
import nc from "next-connect"
import auth from "@/middleware/auth"
// import admin from "@/middleware/admin"
// import Category from "@/models/Category"
import db from "@/utils/db"
import slugify from "slugify"
import { NextApiRequest, NextApiResponse } from "next"
import SubCategory from "@/models/SubCategory"

const handler = nc()
    .use(auth)
// .use(admin)
handler.post(async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const { name, parent } = req.body;
        db.connectDb();
        const test = await SubCategory.findOne({ name });
        if (test) {
            return res
                .status(400)
                .json({ message: "SubCategory already exist, Try a different name" });
        }
        await new SubCategory({ name, parent, slug: slugify(name) }).save();

        db.disconnectDb();
        res.json({
            message: `SubCategory ${name} has been created successfully.`,
            subCategories: await SubCategory.find({}).sort({ updatedAt: -1 }),
        });
    } catch (error: any) {
        db.disconnectDb();
        res.status(500).json({ message: error.message });
    }
});

handler.put(async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const { id, name, parent } = req.body;
        await db.connectDb();
        await SubCategory.findByIdAndUpdate(id, { name, parent, slug: slugify(name) });
        await db.disconnectDb();
        return res.status(200).json({
            message: "SubCategory has been updated successfully!",
            subCategories: await SubCategory.find({}).sort({ createdAt: -1 }),
        });
    } catch (error: any) {
        res.status(500).json({ message: error.message })
    }
});

handler.delete(async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const { id } = req.body;
        await db.connectDb();
        await SubCategory.findByIdAndDelete(id);
        await db.disconnectDb();
        return res.json({
            message: "SubCategory has been deleted successfully",
            subCategories: await SubCategory.find({}).sort({ updatedAt: -1 }),
        });
    } catch (error: any) {
        res.status(500).json({ message: error.message })
    }
});

handler.get(async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const { category } = req.query;
        console.log(category);
        if (!category) {
            return res.json([]);
        }
        db.connectDb();
        const results = await SubCategory.find({ parent: category }).select("name");
        console.log(results);
        db.disconnectDb();
        return res.json(results);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
});

export default handler