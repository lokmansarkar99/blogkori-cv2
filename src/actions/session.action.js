"use server";

import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function setAuthCookie(data) {
  const cookieStore = await cookies();
  const isProduction = process.env.NODE_ENV === "production";

  const token = jwt.sign(data, process.env.ACCESS_SECRET, {
    expiresIn: "1d"
  });

  // set the cookie
  cookieStore.set({
    name: "accessToken",
    value: token,
    httpOnly: true,
    path: "/",
    secure: isProduction,
    maxAge: 60 * 60 * 24, //  Also changed to 24 hours
    sameSite: isProduction ? "none" : "lax"
  });

  return { success: true };
}

export async function setEmailToken(data) {
  const cookieStore = await cookies();
  const isProduction = process.env.NODE_ENV === "production";

  //  CHANGED THIS LINE - Use EMAIL_SECRET
  const token = jwt.sign(data, process.env.EMAIL_SECRET, {
    expiresIn: "15m"
  });

  // set the cookie
  cookieStore.set({
    name: "emailToken",
    value: token,
    httpOnly: true,
    path: "/",
    secure: isProduction,
    maxAge: 60 * 15,
    sameSite: isProduction ? "none" : "lax"
  });

  return { success: true };
}

export async function deleteAuthToken() {
  const cookieJar = await cookies();

  //  Better approach - only delete specific cookies
  cookieJar.delete("accessToken");
  cookieJar.delete("emailToken");

  redirect("/login");
}
