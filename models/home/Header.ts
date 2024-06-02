/* eslint-disable camelcase */
import mongoose, { model } from 'mongoose';


const HeaderSchema = new mongoose.Schema(
    {

        // title: { type: String, required: true },
        // description: { type: String, required: true },
        title: {
            type: {
                en: { type: String, required: true },
                fr: { type: String, required: true },
            },
            required: true,
        },
        description: {
            type: {
                en: { type: String, required: true },
                fr: { type: String, required: true },
            },
            required: true,
        },
        images: [],
        video: [],
        slug: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
        }
    },
    {
        timestamps: true,
    }
);

const Header = mongoose.models.Header || model('Header', HeaderSchema);

export default Header;