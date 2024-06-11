/* eslint-disable no-unused-vars */
import mongoose from "mongoose"
import { ObjectId } from "mongodb"

const couponSchema = new mongoose.Schema(
    {
        coupon: {
            type: String,
            trim: true,
            unique: true,
            uppercase: true,
            required: true,
            minLength: 4,
            maxLength: 10,
        },
        startDate: {
            type: String,
            required: true,
        },
        endDate: {
            type: String,
            required: true,
        },
        discount: {
            type: Number,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

const Coupon = mongoose.models.Coupon || mongoose.model("Coupon", couponSchema);

export default Coupon;