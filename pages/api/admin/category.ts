/* eslint-disable consistent-return */
import nc from "next-connect"
import auth from "@/middleware/auth"
// import admin from "@/middleware/admin"
import Category from "@/models/Category"
import db from "@/utils/db"
import slugify from "slugify"
import { NextApiRequest, NextApiResponse } from "next"

const handler = nc()
    .use(auth)
// .use(admin)
handler.post(async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const { name } = req.body;
        await db.connectDb();
        const test = await Category.findOne({ name });
        if (test) {
            return res.status(400).json({ message: "Category already exists, try a different name" });
        }
        await new Category({ name, slug: slugify(name) }).save();
        db.disconnectDb();
        res.json({
            message: `Category ${name} has been created successfully.`,
            categories: await Category.find({}).sort({ updatedAt: -1 }),
        });
    } catch (error: any) {
        await db.disconnectDb();
        res.status(500).json({ message: error.message });
    }
})

handler.put(async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const { id, name } = req.body;
        await db.connectDb();
        await Category.findByIdAndUpdate(id, { name, slug: slugify(name) });
        await db.disconnectDb();
        return res.status(200).json({
            message: "Category has been updated successfully!",
            categories: await Category.find({}).sort({ createdAt: -1 }),
        });
    } catch (error: any) {
        res.status(500).json({ message: error.message })
    }
});

handler.delete(async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const { id } = req.body;
        await db.connectDb();
        await Category.findByIdAndDelete(id);
        await db.disconnectDb();
        return res.json({
            message: "Category has been deleted successfully",
            categories: await Category.find({}).sort({ updatedAt: -1 }),
        });
    } catch (error: any) {
        res.status(500).json({ message: error.message })
    }
})

export default handler