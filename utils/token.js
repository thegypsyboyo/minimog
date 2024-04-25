import jwt from "jsonwebtoken"

export const createActivationToken = (payload) => jwt.sign(payload, process.env.ACTIVATION_TOKEN_SECRET, {
    expiresIn: "2d",
})
export const createResetToken = (payload) => jwt.sign(payload, process.env.RESET_TOKEN_SECRET, {
    expiresIn: "4h",
})