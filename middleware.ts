/* eslint-disable import/prefer-default-export */
import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export default async function Middleware(req: { nextUrl: { pathname: any; origin: any; }; }) {
    const { pathname, origin } = req.nextUrl;

    const session = await getToken({
        req,
        secret: process.env.JWT_SECRET,
        secureCookie: process.env.NODE_ENV === "production",
    });

    // console.log("SEssion:", session)
    if (pathname === "/checkout") {
        if (!session) return NextResponse.redirect(`${origin}`);
    }
    if (pathname.startsWith("/order")) {
        if (!session) return NextResponse.redirect(`${origin}`);
    }
    if (pathname.startsWith("/profile")) {
        if (!session) return NextResponse.redirect(`${origin}`);
    }
    if (pathname.startsWith("/admin")) {
        if (!session) return NextResponse.redirect(`${origin}`);
        if (session.role !== "user") return NextResponse.redirect(`${origin}`);
    }
}
