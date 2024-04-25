/* eslint-disable no-underscore-dangle */
/* eslint-disable consistent-return */


import nc from 'next-connect'
// import bcrypt from "bcrypt"
import db from "../../../utils/db"


// import { validateEmail } from '../../../utils/validation';
import resetEmailTemplate from '../../../components/emails/resetEmailTemplate'

import User from "../../../models/User"
import { createResetToken } from '../../../utils/token';
import { sendEmail } from '../../../utils/sendEmails';

const handler = nc();

handler.post(async (req, res) => {
    try {
        // Connect to DB first...
        await db.connectDb();
        const { email } = req.body
        // Test the api from postman.
        // res.send(email)

        // now check if the email exists in the DB
        const user = await User.findOne({ email })
        if (!user) {
            return res.status(400).json({ message: "This email does not exist in our database" })
        }
        const userId = createResetToken({
            id: user._id.toString(),
        });
        const url = `${process.env.BASE_URL}/auth/reset/${userId}`

        sendEmail(email, url, "", "Reset Your Password", resetEmailTemplate)

        // Now disconnect DB and give a proper message
        await db.disconnectDb();
        res.status(200).json({
            message: "An activation link has been sent to your inbox. Please check your emails to reset your password."
        })

    } catch (error) {
        res.status(500).json({ message: error.message })
    }
});

export default handler