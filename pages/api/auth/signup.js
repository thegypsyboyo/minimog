/* eslint-disable no-underscore-dangle */
/* eslint-disable camelcase */
/* eslint-disable consistent-return */


import nc from 'next-connect'
import bcrypt from "bcrypt"
import db from "../../../utils/db"


import { validateEmail } from '../../../utils/validation';

import User from "../../../models/User"
import { createActivationToken } from '../../../utils/token';
import { sendEmail } from '../../../utils/sendEmails';
import random from "../../../components/emails/random"

const handler = nc();

handler.post(async (req, res) => {
    try {
        // Connect to DB first...
        await db.connectDb();
        const { name, email, password } = req.body

        if (!name || !email || !password) {
            return res.status(400).json({ message: "Please fill in all the fields" })
        }
        if (!validateEmail(email)) {
            return res.status(400).json({ message: "Invalid email." })
        }

        const user = await User.findOne({ email })
        if (user) {
            return res.status(400).json({ message: "This email already exists" })
        }

        if (password.length < 6) {
            return res.status(400).json({ message: "Password must be atleast 6 characters" })
        }

        const cryptedPassword = await bcrypt.hash(password, 12);

        const newUser = new User({ name, email, password: cryptedPassword })
        const addedUser = await newUser.save();

        const activation_token = createActivationToken({
            id: addedUser._id.toString(),
        });

        const url = `${process.env.BASE_URL}/activate/${activation_token}`

        sendEmail(email, url, "", "Activate your account", random)

        // Now disconnect DB and give a proper message
        await db.disconnectDb();
        res.json({
            message: "Registration Successful! Please activate your account email to start"
        })

    } catch (error) {
        res.status(500).json({ message: error.message })
    }
});

export default handler