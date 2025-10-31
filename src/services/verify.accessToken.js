import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

export async function isUser() {
  const cookiesStore = await cookies();
  const token = cookiesStore.get("accessToken")?.value;

  try {
    const user = jwt.verify(token, process.env.ACCESS_SECRET);
    return { success: true, user };
  } catch (error) {
    console.log("jwt verification faild in client");
    return {
      success: false,
      message: "jwt verification faild in client"
    };
  }
}
