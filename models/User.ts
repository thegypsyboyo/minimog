import mongoose, { Schema, Document } from "mongoose";

export interface Address {
    firstName?: string;
    lastName?: string;
    phoneNumber?: string;
    address1?: string;
    address2?: string;
    city?: string;
    zipCode?: string;
    state?: string;
    country?: string;
    active?: boolean;
}

export interface UserDocument extends Document {
    name: string;
    email: string;
    password: string;
    role: string;
    image: string;
    emailVerified: boolean;
    defaultPaymentMethod: string;
    address: Address[];
}

const addressSchema = new Schema<Address>(
    {
        firstName: String,
        lastName: String,
        phoneNumber: String,
        address1: String,
        address2: String,
        city: String,
        zipCode: String,
        state: String,
        country: String,
        active: {
            type: Boolean,
            default: false,
        },
    },
    { _id: false } // Exclude _id from subdocument
);

const userSchema = new Schema<UserDocument>(
    {
        name: {
            type: String,
            required: [true, "Please enter your full name."],
        },
        email: {
            type: String,
            required: [true, "Please enter your email address"],
            trim: true,
            unique: true,
        },
        password: {
            type: String,
            required: [true, "Please enter a password"],
        },
        role: {
            type: String,
            default: "user",
        },
        image: {
            type: String,
            default:
                "https://res.cloudinary.com/dmhcnhtng/image/upload/v1664642478/992490_b0iqzq.png",
        },
        emailVerified: {
            type: Boolean,
            default: false,
        },
        defaultPaymentMethod: {
            type: String,
            default: "",
        },
        address: [addressSchema],
    },
    {
        timestamps: true,
    }
);

const User = mongoose.models.User || mongoose.model<UserDocument>("User", userSchema);

export default User;
