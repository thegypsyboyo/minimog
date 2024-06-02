/* eslint-disable no-shadow */
/* eslint-disable no-unused-vars */
/* eslint-disable consistent-return */
/* eslint-disable camelcase */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-use-before-define */
/* eslint-disable no-await-in-loop */
import nc from "next-connect";
import cloudinary from "cloudinary";
// import bodyParser from "body-parser";
import fs from "fs";
import fileUpload from "express-fileupload";
import { imgMiddleware } from "../../../middleware/imgMiddleware";

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_KEY,
    api_secret: process.env.CLOUDINARY_SECRET,
});
const handler = nc()
    .use(
        fileUpload({
            useTempFiles: true,
        })
    )
    .use(imgMiddleware);
export const config = {
    api: {
        bodyParser: false,
    },
};

handler.post(async (req, res) => {
    try {
        const { path, fileType } = req.body;
        const files = Object.values(req.files).flat();
        const uploadedFiles = [];

        console.log(`Received files: ${files.length}, Path: ${path}, FileType: ${fileType}`);

        for (const file of files) {
            console.log(`Uploading file: ${file.name}, Type: ${file.mimetype}, Temp Path: ${file.tempFilePath}`);
            const uploadedFile = await uploadToCloudinaryHandler(file, path, fileType);
            uploadedFiles.push(uploadedFile);
            removeTmp(file.tempFilePath);
        }

        res.json(uploadedFiles);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: error.message });
    }
});


handler.delete(async (req, res) => {
    const image_id = req.body.public_id;
    cloudinary.v2.uploader.destroy(image_id, (err, res) => {
        if (err) return res.status(400).json({ success: false, err });
        res.json({ success: true });
    });
});

const uploadToCloudinaryHandler = async (file, path, fileType) => new Promise((resolve, reject) => {
    const resourceType = file.mimetype.startsWith('video/') ? 'video' : 'image';
    console.log(`Uploading to Cloudinary: File: ${file.name}, ResourceType: ${resourceType}, Path: ${path}`);

    cloudinary.v2.uploader.upload(
        file.tempFilePath,
        {
            folder: path,
            resource_type: resourceType,
        },
        (err, result) => {
            if (err) {
                removeTmp(file.tempFilePath);
                console.log(err);
                return err.status(400).json({ message: "Upload failed." });
            }
            console.log(`Uploaded file: ${result.secure_url}, ResourceType: ${result.resource_type}`);
            resolve({
                url: result.secure_url,
                public_id: result.public_id,
                resource_type: result.resource_type,
            });
        }
    );
});

const removeTmp = (path) => {
    fs.unlink(path, (err) => {
        if (err) throw err;
    });
};

export default handler;
