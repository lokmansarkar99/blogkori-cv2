import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

const allowedOrigin = "https://ic-blog-app-ve3r.vercel.app"; // frontend vercel url

function cors(response) {
  response.headers.set("Access-Control-Allow-Origin", allowedOrigin);
  response.headers.set("Access-Control-Allow-Credentials", "true");
  response.headers.set("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  response.headers.set(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization"
  );
  return response;
}

export async function OPTIONS() {
  return cors(new NextResponse(null, { status: 200 }));
}

export async function GET(request) {
  try {
    const sessionCookie = request.cookies.get("accessToken")?.value;
    console.log({ sessionCookie }, "session");

    if (!sessionCookie) {
      return cors(
        NextResponse.json({ error: "No token found" }, { status: 401 })
      );
    }

    const auth = jwt.verify(sessionCookie, process.env.ACCESS_SECRET);

    return cors(NextResponse.json(auth));
  } catch (error) {
    return cors(NextResponse.json({ error: "Invalid token" }, { status: 401 }));
  }
}

export async function POST() {
  const cookieJar = await cookies();
  cookieJar.getAll().forEach((cookie) => {
    cookieJar.delete(cookie.name);
  });

  return cors(NextResponse.json({ success: true }));
}
