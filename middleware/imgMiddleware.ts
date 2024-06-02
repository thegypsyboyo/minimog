/* eslint-disable no-restricted-syntax */
/* eslint-disable consistent-return */
/* eslint-disable import/prefer-default-export */
import fs from "fs"
import { NextApiRequest, NextApiResponse } from "next";

interface MulterRequest extends NextApiRequest {
    files: any;
}
const removeTmp = (path: any) => {
    fs.unlink(path, (err) => {
        if (err) throw err;
    });
};

export const imgMiddleware = async (req: MulterRequest, res: NextApiResponse, next: () => void) => {
    try {
        // if (!req.files) {
        //     return res.status(400).json({ message: "No files were chosen." });
        // }
        if (!req.files || Object.keys(req.files).length === 0) {
            return res.status(400).json({ message: "No files were chosen." });
        }
        const files: any = Object.values(req.files).flat();

        for (const file of files) {
            console.log(`Processing file: ${file.name}, Type: ${file.mimetype}, Size: ${file.size}`);
            if (
                !["image/jpeg", "image/png", "image/webp", "video/mp4", "video/webm"].includes(file.mimetype)
            ) {
                removeTmp(file.tempFilePath);
                return res.status(400).json({
                    message: "File format is incorrect, only JPEG/PNG/WEBP images and MP4/WEBM videos are allowed.",
                });
            }
            if (file.size > 1024 * 1024 * 10) {
                removeTmp(file.tempFilePath);
                return res.status(400).json({
                    message: "File size is too large, maximum 10 MB allowed.",
                });
            }
        }
        next();
    } catch (error: any) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
};